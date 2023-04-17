import * as functions from "firebase-functions";
import "core-js/proposals/reflect-metadata";
import * as express from "express";
import {HTTP_DECORATOR_KEYS, ExpressHandler} from "./https"; // TODO: Update name.

/** Decorator; marks a class as an injectable. */
export const Injectable = (): ClassDecorator => {
  return (_) => {};
};

/** Decorator; marks a class as a controller. */
export function Controller(controllerMetadata: {
  path?: string;
  runHttpAfter?: ExpressHandler[];
}) {
  return function controller<T extends {new (...args: any[]): {}}>(
    constructor: T
  ) {
    return class extends constructor {
      getMethods = () => Reflect.ownKeys(constructor.prototype);
      getNameToHandlerMap = () => {
        const methodNames = this.getMethods();
        const methodsMetadata = methodNames
          .map((methodName) => {
            // Supports https marker only. TODO: expand to more.
            const httpsGetMarkerMetadata = (Reflect as any).getMetadata(
              HTTP_DECORATOR_KEYS.get,
              this,
              methodName
            );
            const httpsPostMarkerMetadata = (Reflect as any).getMetadata(
              HTTP_DECORATOR_KEYS.post,
              this,
              methodName
            );
            const httpsPutMarkerMetadata = (Reflect as any).getMetadata(
              HTTP_DECORATOR_KEYS.put,
              this,
              methodName
            );
            const httpsPatchMarkerMetadata = (Reflect as any).getMetadata(
              HTTP_DECORATOR_KEYS.patch,
              this,
              methodName
            );
            const httpsDeleteMarkerMetadata = (Reflect as any).getMetadata(
              HTTP_DECORATOR_KEYS.delete,
              this,
              methodName
            );
            const httpsMarkerMetadata =
              httpsDeleteMarkerMetadata ||
              httpsPostMarkerMetadata ||
              httpsPutMarkerMetadata ||
              httpsPatchMarkerMetadata ||
              httpsGetMarkerMetadata;
            let httpMethod: string | undefined = undefined;
            if (!!httpsDeleteMarkerMetadata) httpMethod = "DELETE";
            else if (httpsPostMarkerMetadata) httpMethod = "POST";
            else if (httpsPutMarkerMetadata) httpMethod = "PUT";
            else if (httpsPatchMarkerMetadata) httpMethod = "PATCH";
            else if (!!httpsGetMarkerMetadata) httpMethod = "GET";
            return {
              definitionName: String(methodName),
              path:
                (httpsMarkerMetadata &&
                  `${sanitizePath(controllerMetadata.path) || ""}${sanitizePath(
                    httpsMarkerMetadata.path
                  )!}`) ||
                undefined,
              httpMethod,
              runHttpAfter: [
                ...(controllerMetadata.runHttpAfter || []),
                ...((httpsMarkerMetadata && httpsMarkerMetadata.runHttpAfter) ||
                  []),
              ],
              hasHttpsMarker: !!httpsMarkerMetadata,
            };
          })
          .filter((methodMetadata) => methodMetadata.hasHttpsMarker);

        const map: Record<string, any> = {};
        for (let i = 0; i < methodsMetadata.length; i++) {
          map[`${methodsMetadata[i].httpMethod}:${methodsMetadata[i].path}`] = {
            funcDef:
              Object.getPrototypeOf(this)[methodsMetadata[i].definitionName],
            path: methodsMetadata[i].path,
            httpMethod: methodsMetadata[i].httpMethod,
            runHttpAfter: methodsMetadata[i].runHttpAfter,
          };
        }
        return map;
      };
    };
  };
}

/** Decorator; marks a class as module. */
export function DtModule(moduleMetadata: {
  path?: string;
  controllers?: any[];
  providers?: any[];
  imports?: any[];
  runHttpAfter?: ExpressHandler[];
}) {
  // Sanitize path.
  moduleMetadata.path = !moduleMetadata.path
    ? undefined
    : `${sanitizePath(moduleMetadata.path)!}`;
  // Decorate DtModule class.
  return function module<T extends {new (...args: any[]): {}}>(constructor: T) {
    // Attach relevant context to cloud functions in their respective controllers.
    if (moduleMetadata.imports && moduleMetadata.imports.length) {
      moduleMetadata.controllers = (moduleMetadata.controllers || []).map(
        (controller: any) => {
          controller["modulePath"] = sanitizePath(moduleMetadata.path) || "";
          return controller;
        }
      );
      for (const mod of moduleMetadata.imports) {
        const modInstance = new mod();
        const modInstanceMetadata = modInstance.getMetadata();
        const path = `${sanitizePath(moduleMetadata.path) || ""}${
          sanitizePath(modInstanceMetadata.path) || ""
        }`;
        // Modules furthest from root take precedence (i.e., overwrite).
        const modInstanceControllers = (
          modInstanceMetadata.controllers || []
        ).map((controller: any) => {
          controller["modulePath"] = path;
          return controller;
        });
        moduleMetadata.controllers = [
          ...(moduleMetadata.controllers || []),
          ...modInstanceControllers,
        ];
        moduleMetadata.providers = [
          ...(moduleMetadata.providers || []),
          ...(modInstanceMetadata.providers || []),
        ];
        // Handlers from Modules closest to root run first.
        moduleMetadata.runHttpAfter = [
          ...(moduleMetadata.runHttpAfter || []),
          ...(modInstanceMetadata.runHttpAfter || []),
        ];
      }
    }
    return class extends constructor {
      expressInstance = undefined;
      saveExpressInstance = (e: any) => {
        this.expressInstance = e;
      };
      getExpressInstance = () => this.expressInstance;
      getMetadata = () => moduleMetadata;
      addFunctionsHandlersToExpress = (app: any) => {
        const providerMap = getProvidersWithValues(moduleMetadata.providers);
        for (const controller of moduleMetadata.controllers || []) {
          const orderedParamTypesNames = (
            (Reflect as any).getMetadata("design:paramtypes", controller) || []
          ).map((t: any) => t.name);
          const orderedDependecies = orderedParamTypesNames.reduce(
            (prev: any, curr: any) => {
              if (!providerMap.has(curr))
                throw `Missing dependency: Controller has undeclared dependency "${curr}".`;
              return [...prev, providerMap.get(curr)?.getValue()];
            },
            []
          );
          const context = new controller(...orderedDependecies);
          for (let [_, details] of Object.entries(
            context.getNameToHandlerMap()
          )) {
            const funcDetails: any = details;
            const runHttpAfter = [
              ...(moduleMetadata.runHttpAfter || []),
              ...(funcDetails.runHttpAfter || []),
            ];
            // Assumes all are https for now. TODO: handle more.
            for (const handler of runHttpAfter) {
              app[String(funcDetails.httpMethod).toLocaleLowerCase()](
                `${sanitizePath(controller["modulePath"]) || ""}${
                  funcDetails.path
                }`,
                handler
              );
            }
            app[String(funcDetails.httpMethod).toLocaleLowerCase()](
              `${sanitizePath(controller["modulePath"]) || ""}${
                funcDetails.path
              }`,
              (funcDetails.funcDef as any).bind(context)
            );
          }
        }
      };
    };
  };
}

function getProvidersWithValues(providers: Provider[] | any[] = []) {
  providers = providers.map(provider => {
    if(provider instanceof Provider) return provider;
    return new Provider({provide: provider});
  })
  // Runs DFS to build all dependencies before instantiating root node.
  const providerMap = new Map<string, Provider | undefined>();
  const isGrayNode = (provider: Provider) =>
    providerMap.has(provider.getToken()) &&
    providerMap.get(provider.getToken()) === undefined;
  const isBlackNode = (provider: Provider) =>
    providerMap.get(provider.getToken()) !== undefined;

  const traverseDependencyTree = (provider: Provider) => {
    if (isBlackNode(provider)) return provider.getValue();
    providerMap.set(provider.getToken(), undefined);
    if (provider.getValue()) {
      providerMap.set(provider.getToken(), provider);
      return provider.getValue();
    }
    const dependencies: any[] = (
      (Reflect as any).getMetadata("design:paramtypes", provider.getClass()) ||
      []
    ).map((t: any) => t.name);
    const args: any[] = [];
    for (const dependency of dependencies) {
      const dependencyProvider = providers.find(
        (provider) => provider.getToken() === dependency
      );
      if (!dependencyProvider)
        throw new Error(
          `Missing dependency: Injectable "${provider.getToken()}" has undeclared dependency "${dependency}".`
        );
      if (isGrayNode(dependencyProvider))
        throw new Error(
          `cyclic dependency found: ${provider.getToken()} -> ${dependency} -> (...) -> ${provider.getToken()}.`
        );
      const providedDependency = providerMap.get(dependency)?.getValue();
      const dependencyValue = providedDependency || traverseDependencyTree(dependencyProvider);
      args.push(dependencyValue);
    }
    const providerValue = new (provider.getClass())(...args);
    providerMap.set(
      provider.getToken(),
      new Provider({
        provide: provider.getClass(),
        useValue: providerValue,
      })
    );
    return providerValue;
  };
  for (const provider of providers) traverseDependencyTree(provider);
  return providerMap;
}

/** Returns the value to be exported in the cloud function's `index.js` root file as the entry point. */
export function bootstrapModule(mod: any) {
  const app = getExpressInstance(mod);
  mod.addFunctionsHandlersToExpress(app);
  return functions.https.onRequest(app);
}

/** Returns the express.js instance used by the main cloud function. */
export function getExpressInstance(mod: any): express.Express {
  const app = mod.getExpressInstance() || express();
  mod.saveExpressInstance(app);
  return app;
}

/** 
 * Used to set Provider singleton values. Example
```
DtModule({providers:[new Provider({token: new Token<Class>(Object)})]})
```
*/
export class Token<T> {
  constructor(public readonly value: T) {}
}

/** 
 * Used in module decorator to provide the selector and an associated singleton. Example
```
DtModule({providers:[new Provider({provide:Class, useValud:Object})]})
```
or
```
DtModule({providers:[new Provider({token: new Token<Class>(Object)})]})
```
 * */
export class Provider {
  constructor(
    private readonly entry: {provide?: any; useValue?: any; token?: any}
  ) {}
  getToken() {
    return this.entry.provide.name;
  }
  getValue() {
    if (this.entry.useValue) return this.entry.useValue;
    return undefined;
  }
  getClass() {
    return this.entry.provide;
  }
}

// Helper functions

/** Ensures path starts with a slash if not already. */
function sanitizePath(path?: string) {
  if (path === undefined) return undefined;
  return `${path[0] !== "/" ? "/" : ""}${path}`;
}
