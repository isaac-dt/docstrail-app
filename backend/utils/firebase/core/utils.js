"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = exports.Token = exports.getExpressInstance = exports.bootstrapModule = exports.DtModule = exports.Controller = exports.Injectable = void 0;
const functions = require("firebase-functions");
require("core-js/proposals/reflect-metadata");
const express = require("express");
const https_1 = require("./https"); // TODO: Update name.
/** Decorator; marks a class as an injectable. */
const Injectable = () => {
    return (_) => { };
};
exports.Injectable = Injectable;
/** Decorator; marks a class as a controller. */
function Controller(controllerMetadata) {
    return function controller(constructor) {
        return class extends constructor {
            constructor() {
                super(...arguments);
                this.getMethods = () => Reflect.ownKeys(constructor.prototype);
                this.getNameToHandlerMap = () => {
                    const methodNames = this.getMethods();
                    const methodsMetadata = methodNames
                        .map((methodName) => {
                        // Supports https marker only. TODO: expand to more.
                        const httpsGetMarkerMetadata = Reflect.getMetadata(https_1.HTTP_DECORATOR_KEYS.get, this, methodName);
                        const httpsPostMarkerMetadata = Reflect.getMetadata(https_1.HTTP_DECORATOR_KEYS.post, this, methodName);
                        const httpsPutMarkerMetadata = Reflect.getMetadata(https_1.HTTP_DECORATOR_KEYS.put, this, methodName);
                        const httpsPatchMarkerMetadata = Reflect.getMetadata(https_1.HTTP_DECORATOR_KEYS.patch, this, methodName);
                        const httpsDeleteMarkerMetadata = Reflect.getMetadata(https_1.HTTP_DECORATOR_KEYS.delete, this, methodName);
                        const httpsMarkerMetadata = httpsDeleteMarkerMetadata ||
                            httpsPostMarkerMetadata ||
                            httpsPutMarkerMetadata ||
                            httpsPatchMarkerMetadata ||
                            httpsGetMarkerMetadata;
                        let httpMethod = undefined;
                        if (!!httpsDeleteMarkerMetadata)
                            httpMethod = "DELETE";
                        else if (httpsPostMarkerMetadata)
                            httpMethod = "POST";
                        else if (httpsPutMarkerMetadata)
                            httpMethod = "PUT";
                        else if (httpsPatchMarkerMetadata)
                            httpMethod = "PATCH";
                        else if (!!httpsGetMarkerMetadata)
                            httpMethod = "GET";
                        return {
                            definitionName: String(methodName),
                            path: (httpsMarkerMetadata &&
                                `${sanitizePath(controllerMetadata.path) || ""}${sanitizePath(httpsMarkerMetadata.path)}`) ||
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
                    const map = {};
                    for (let i = 0; i < methodsMetadata.length; i++) {
                        map[`${methodsMetadata[i].httpMethod}:${methodsMetadata[i].path}`] = {
                            funcDef: Object.getPrototypeOf(this)[methodsMetadata[i].definitionName],
                            path: methodsMetadata[i].path,
                            httpMethod: methodsMetadata[i].httpMethod,
                            runHttpAfter: methodsMetadata[i].runHttpAfter,
                        };
                    }
                    return map;
                };
            }
        };
    };
}
exports.Controller = Controller;
/** Decorator; marks a class as module. */
function DtModule(moduleMetadata) {
    // Sanitize path.
    moduleMetadata.path = !moduleMetadata.path
        ? undefined
        : `${sanitizePath(moduleMetadata.path)}`;
    // Decorate DtModule class.
    return function module(constructor) {
        // Attach relevant context to cloud functions in their respective controllers.
        if (moduleMetadata.imports && moduleMetadata.imports.length) {
            moduleMetadata.controllers = (moduleMetadata.controllers || []).map((controller) => {
                controller["modulePath"] = sanitizePath(moduleMetadata.path) || "";
                return controller;
            });
            for (const mod of moduleMetadata.imports) {
                const modInstance = new mod();
                const modInstanceMetadata = modInstance.getMetadata();
                const path = `${sanitizePath(moduleMetadata.path) || ""}${sanitizePath(modInstanceMetadata.path) || ""}`;
                // Modules furthest from root take precedence (i.e., overwrite).
                const modInstanceControllers = (modInstanceMetadata.controllers || []).map((controller) => {
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
            constructor() {
                super(...arguments);
                this.expressInstance = undefined;
                this.saveExpressInstance = (e) => {
                    this.expressInstance = e;
                };
                this.getExpressInstance = () => this.expressInstance;
                this.getMetadata = () => moduleMetadata;
                this.addFunctionsHandlersToExpress = (app) => {
                    const providerMap = getProvidersWithValues(moduleMetadata.providers);
                    for (const controller of moduleMetadata.controllers || []) {
                        const orderedParamTypesNames = (Reflect.getMetadata("design:paramtypes", controller) || []).map((t) => t.name);
                        const orderedDependecies = orderedParamTypesNames.reduce((prev, curr) => {
                            var _a;
                            if (!providerMap.has(curr))
                                throw `Missing dependency: Controller has undeclared dependency "${curr}".`;
                            return [...prev, (_a = providerMap.get(curr)) === null || _a === void 0 ? void 0 : _a.getValue()];
                        }, []);
                        const context = new controller(...orderedDependecies);
                        for (let [_, details] of Object.entries(context.getNameToHandlerMap())) {
                            const funcDetails = details;
                            const runHttpAfter = [
                                ...(moduleMetadata.runHttpAfter || []),
                                ...(funcDetails.runHttpAfter || []),
                            ];
                            // Assumes all are https for now. TODO: handle more.
                            for (const handler of runHttpAfter) {
                                app[String(funcDetails.httpMethod).toLocaleLowerCase()](`${sanitizePath(controller["modulePath"]) || ""}${funcDetails.path}`, handler);
                            }
                            app[String(funcDetails.httpMethod).toLocaleLowerCase()](`${sanitizePath(controller["modulePath"]) || ""}${funcDetails.path}`, funcDetails.funcDef.bind(context));
                        }
                    }
                };
            }
        };
    };
}
exports.DtModule = DtModule;
function getProvidersWithValues(providers = []) {
    providers = providers.map(provider => {
        if (provider instanceof Provider)
            return provider;
        return new Provider({ provide: provider });
    });
    // Runs DFS to build all dependencies before instantiating root node.
    const providerMap = new Map();
    const isGrayNode = (provider) => providerMap.has(provider.getToken()) &&
        providerMap.get(provider.getToken()) === undefined;
    const isBlackNode = (provider) => providerMap.get(provider.getToken()) !== undefined;
    const traverseDependencyTree = (provider) => {
        var _a;
        if (isBlackNode(provider))
            return provider.getValue();
        providerMap.set(provider.getToken(), undefined);
        if (provider.getValue()) {
            providerMap.set(provider.getToken(), provider);
            return provider.getValue();
        }
        const dependencies = (Reflect.getMetadata("design:paramtypes", provider.getClass()) ||
            []).map((t) => t.name);
        const args = [];
        for (const dependency of dependencies) {
            const dependencyProvider = providers.find((provider) => provider.getToken() === dependency);
            if (!dependencyProvider)
                throw new Error(`Missing dependency: Injectable "${provider.getToken()}" has undeclared dependency "${dependency}".`);
            if (isGrayNode(dependencyProvider))
                throw new Error(`cyclic dependency found: ${provider.getToken()} -> ${dependency} -> (...) -> ${provider.getToken()}.`);
            const providedDependency = (_a = providerMap.get(dependency)) === null || _a === void 0 ? void 0 : _a.getValue();
            const dependencyValue = providedDependency || traverseDependencyTree(dependencyProvider);
            args.push(dependencyValue);
        }
        const providerValue = new (provider.getClass())(...args);
        providerMap.set(provider.getToken(), new Provider({
            provide: provider.getClass(),
            useValue: providerValue,
        }));
        return providerValue;
    };
    for (const provider of providers)
        traverseDependencyTree(provider);
    return providerMap;
}
/** Returns the value to be exported in the cloud function's `index.js` root file as the entry point. */
function bootstrapModule(mod) {
    const app = getExpressInstance(mod);
    mod.addFunctionsHandlersToExpress(app);
    return functions.https.onRequest(app);
}
exports.bootstrapModule = bootstrapModule;
/** Returns the express.js instance used by the main cloud function. */
function getExpressInstance(mod) {
    const app = mod.getExpressInstance() || express();
    mod.saveExpressInstance(app);
    return app;
}
exports.getExpressInstance = getExpressInstance;
/**
 * Used to set Provider singleton values. Example
```
DtModule({providers:[new Provider({token: new Token<Class>(Object)})]})
```
*/
class Token {
    constructor(value) {
        this.value = value;
    }
}
exports.Token = Token;
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
class Provider {
    constructor(entry) {
        this.entry = entry;
    }
    getToken() {
        return this.entry.provide.name;
    }
    getValue() {
        if (this.entry.useValue)
            return this.entry.useValue;
        return undefined;
    }
    getClass() {
        return this.entry.provide;
    }
}
exports.Provider = Provider;
// Helper functions
/** Ensures path starts with a slash if not already. */
function sanitizePath(path) {
    if (path === undefined)
        return undefined;
    return `${path[0] !== "/" ? "/" : ""}${path}`;
}
//# sourceMappingURL=utils.js.map