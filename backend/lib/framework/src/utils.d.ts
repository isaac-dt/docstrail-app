import * as functions from "firebase-functions";
import "core-js/proposals/reflect-metadata";
import * as express from "express";
import { ExpressHandler } from "./https";
/** Decorator; marks a class as an injectable. */
export declare const Injectable: () => ClassDecorator;
/** Decorator; marks a class as a controller. */
export declare function Controller(controllerMetadata: {
    path?: string;
    runHttpAfter?: ExpressHandler[];
}): <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {
        getMethods: () => (string | symbol)[];
        getNameToHandlerMap: () => Record<string, any>;
    };
} & T;
/** Decorator; marks a class as module. */
export declare function DtModule(moduleMetadata: {
    path?: string;
    controllers?: any[];
    providers?: any[];
    imports?: any[];
    runHttpAfter?: ExpressHandler[];
}): <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {
        expressInstance: undefined;
        saveExpressInstance: (e: any) => void;
        getExpressInstance: () => undefined;
        getMetadata: () => {
            path?: string | undefined;
            controllers?: any[] | undefined;
            providers?: any[] | undefined;
            imports?: any[] | undefined;
            runHttpAfter?: ExpressHandler[] | undefined;
        };
        addFunctionsHandlersToExpress: (app: any) => void;
    };
} & T;
/** Returns the value to be exported in the cloud function's `index.js` root file as the entry point. */
export declare function bootstrapModule(mod: any): functions.HttpsFunction;
/** Returns the express.js instance used by the main cloud function. */
export declare function getExpressInstance(mod: any): express.Express;
/**
 * Used to set Provider singleton values. Example
```
DtModule({providers:[new Provider({token: new Token<Class>(Object)})]})
```
*/
export declare class Token<T> {
    readonly value: T;
    constructor(value: T);
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
export declare class Provider {
    private readonly entry;
    constructor(entry: {
        provide?: any;
        useValue?: any;
        token?: any;
    });
    getToken(): any;
    getValue(): any;
    getClass(): any;
}
