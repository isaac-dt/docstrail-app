"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dtDelete = exports.patch = exports.put = exports.post = exports.get = exports.HTTP_DECORATOR_KEYS = void 0;
/** Decorator keys for https annotations. */
exports.HTTP_DECORATOR_KEYS = {
    get: "httpsGetCloudFunction",
    post: "httpsPostCloudFunction",
    put: "httpsPutCloudFunction",
    patch: "httpsPatchCloudFunction",
    delete: "httpsDeleteCloudFunction"
};
/** Decorator; marks a method as a GET https cloud function. */
function get(data) {
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata(exports.HTTP_DECORATOR_KEYS.get, data, target, propertyKey);
    };
}
exports.get = get;
/** Decorator; marks a method as a POST https cloud function. */
function post(data) {
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata(exports.HTTP_DECORATOR_KEYS.post, data, target, propertyKey);
    };
}
exports.post = post;
/** Decorator; marks a method as a PUT https cloud function. */
function put(data) {
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata(exports.HTTP_DECORATOR_KEYS.put, data, target, propertyKey);
    };
}
exports.put = put;
/** Decorator; marks a method as a PATCH https cloud function. */
function patch(data) {
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata(exports.HTTP_DECORATOR_KEYS.patch, data, target, propertyKey);
    };
}
exports.patch = patch;
/** Decorator; marks a method as a DELETE https cloud function. */
function dtDelete(data) {
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata(exports.HTTP_DECORATOR_KEYS.delete, data, target, propertyKey);
    };
}
exports.dtDelete = dtDelete;
//# sourceMappingURL=https.js.map