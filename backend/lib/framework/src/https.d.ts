/// <reference types="express" />
import * as functions from "firebase-functions";
export declare type Request = functions.https.Request;
export declare type Response = functions.Response;
export declare type ExpressHandler = (req: Request, res: Response, next: Function) => void;
/** Decorator keys for https annotations. */
export declare const HTTP_DECORATOR_KEYS: {
    get: string;
    post: string;
    put: string;
    patch: string;
    delete: string;
};
/** Decorator; marks a method as a GET https cloud function. */
export declare function get(data: {
    path: string;
    runHttpAfter?: ExpressHandler[];
}): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
/** Decorator; marks a method as a POST https cloud function. */
export declare function post(data: {
    path: string;
    runHttpAfter?: ExpressHandler[];
}): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
/** Decorator; marks a method as a PUT https cloud function. */
export declare function put(data: {
    path: string;
    runHttpAfter?: ExpressHandler[];
}): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
/** Decorator; marks a method as a PATCH https cloud function. */
export declare function patch(data: {
    path: string;
    runHttpAfter?: ExpressHandler[];
}): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
/** Decorator; marks a method as a DELETE https cloud function. */
export declare function dtDelete(data: {
    path: string;
    runHttpAfter?: ExpressHandler[];
}): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
