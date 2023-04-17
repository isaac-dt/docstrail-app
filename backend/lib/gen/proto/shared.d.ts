import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "";
export interface JsonResponse {
    data: any | undefined;
    error: Error | undefined;
}
export interface Error {
    code: string;
    message: string;
}
export declare const JsonResponse: {
    encode(message: JsonResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): JsonResponse;
    fromJSON(object: any): JsonResponse;
    toJSON(message: JsonResponse): unknown;
    fromPartial<I extends {
        data?: any | undefined;
        error?: {
            code?: string | undefined;
            message?: string | undefined;
        } | undefined;
    } & {
        data?: any | undefined;
        error?: ({
            code?: string | undefined;
            message?: string | undefined;
        } & {
            code?: string | undefined;
            message?: string | undefined;
        } & { [K in Exclude<keyof I["error"], keyof Error>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof JsonResponse>]: never; }>(object: I): JsonResponse;
};
export declare const Error: {
    encode(message: Error, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Error;
    fromJSON(object: any): Error;
    toJSON(message: Error): unknown;
    fromPartial<I extends {
        code?: string | undefined;
        message?: string | undefined;
    } & {
        code?: string | undefined;
        message?: string | undefined;
    } & { [K in Exclude<keyof I, keyof Error>]: never; }>(object: I): Error;
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
