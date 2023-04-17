import * as functions from "firebase-functions";

export type Request = functions.https.Request;
export type Response = functions.Response;
export type ExpressHandler = (
  req: Request,
  res: Response,
  next: Function
) => void;

/** Decorator keys for https annotations. */
export const HTTP_DECORATOR_KEYS = {
  get: "httpsGetCloudFunction",
  post: "httpsPostCloudFunction",
  put: "httpsPutCloudFunction",
  patch: "httpsPatchCloudFunction",
  delete: "httpsDeleteCloudFunction",
};

/** Decorator; marks a method as a GET https cloud function. */
export function get(data: {path: string; runHttpAfter?: ExpressHandler[]}) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    (Reflect as any).defineMetadata(
      HTTP_DECORATOR_KEYS.get,
      data,
      target,
      propertyKey
    );
  };
}

/** Decorator; marks a method as a POST https cloud function. */
export function post(data: {path: string; runHttpAfter?: ExpressHandler[]}) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    (Reflect as any).defineMetadata(
      HTTP_DECORATOR_KEYS.post,
      data,
      target,
      propertyKey
    );
  };
}

/** Decorator; marks a method as a PUT https cloud function. */
export function put(data: {path: string; runHttpAfter?: ExpressHandler[]}) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    (Reflect as any).defineMetadata(
      HTTP_DECORATOR_KEYS.put,
      data,
      target,
      propertyKey
    );
  };
}

/** Decorator; marks a method as a PATCH https cloud function. */
export function patch(data: {path: string; runHttpAfter?: ExpressHandler[]}) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    (Reflect as any).defineMetadata(
      HTTP_DECORATOR_KEYS.patch,
      data,
      target,
      propertyKey
    );
  };
}

/** Decorator; marks a method as a DELETE https cloud function. */
export function dtDelete(data: {
  path: string;
  runHttpAfter?: ExpressHandler[];
}) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    (Reflect as any).defineMetadata(
      HTTP_DECORATOR_KEYS.delete,
      data,
      target,
      propertyKey
    );
  };
}
