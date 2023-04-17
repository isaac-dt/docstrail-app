import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "shared";
export declare enum ErrorCode {
    INVALID_FORM = 0,
    UNRECOGNIZED = -1
}
export declare function errorCodeFromJSON(object: any): ErrorCode;
export declare function errorCodeToJSON(object: ErrorCode): string;
export interface JsonResponse {
    data: any | undefined;
    error: AppError | undefined;
}
export interface AppError {
    details: any | undefined;
    errorCode: ErrorCode;
}
export declare const JsonResponse: {
    encode(message: JsonResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): JsonResponse;
    fromJSON(object: any): JsonResponse;
    toJSON(message: JsonResponse): unknown;
    fromPartial<I extends {
        data?: any | undefined;
        error?: {
            details?: any | undefined;
            errorCode?: ErrorCode | undefined;
        } | undefined;
    } & {
        data?: any | undefined;
        error?: ({
            details?: any | undefined;
            errorCode?: ErrorCode | undefined;
        } & {
            details?: any | undefined;
            errorCode?: ErrorCode | undefined;
        } & { [K in Exclude<keyof I["error"], keyof AppError>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof JsonResponse>]: never; }>(object: I): JsonResponse;
};
export declare const AppError: {
    encode(message: AppError, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AppError;
    fromJSON(object: any): AppError;
    toJSON(message: AppError): unknown;
    fromPartial<I extends {
        details?: any | undefined;
        errorCode?: ErrorCode | undefined;
    } & {
        details?: any | undefined;
        errorCode?: ErrorCode | undefined;
    } & { [K in Exclude<keyof I, keyof AppError>]: never; }>(object: I): AppError;
};
declare type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
declare type KeysOfUnion<T> = T extends T ? keyof T : never;
export declare type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
