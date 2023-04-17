import * as _m0 from "protobufjs/minimal";
import { User } from "./account/user/user";
export declare const protobufPackage = "common";
/**
 * Codified app errors.
 * Next Id: 3
 */
export declare enum ErrorCode {
    INVALID_DATA = 0,
    NOT_FOUND_IN_DB = 1,
    DUPLICATE_PERMISSION_ENTRIES = 2,
    MISSING_PERMISSION = 3,
    UNKNOWN = 4,
    UNRECOGNIZED = -1
}
export declare function errorCodeFromJSON(object: any): ErrorCode;
export declare function errorCodeToJSON(object: ErrorCode): string;
/**
 * Structure for JSON https responses.
 * Next Id: 4
 */
export interface JsonResponse {
    data: any | undefined;
    error: AppError | undefined;
}
/**
 * App Error structure.
 * Next Id: 3
 */
export interface AppError {
    details: any | undefined;
    errorCode: ErrorCode;
}
/**
 * The data stored in JWT auth token.
 * Next Id: 3
 */
export interface AuthData {
    user: User | undefined;
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
export declare const AuthData: {
    encode(message: AuthData, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AuthData;
    fromJSON(object: any): AuthData;
    toJSON(message: AuthData): unknown;
    fromPartial<I extends {
        user?: {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            firstName?: string | undefined;
            lastName?: string | undefined;
            birthMonth?: number | undefined;
            email?: string | undefined;
            roles?: import("./account/user/user").UserRole[] | undefined;
            teamId?: string | undefined;
        } | undefined;
    } & {
        user?: ({
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            firstName?: string | undefined;
            lastName?: string | undefined;
            birthMonth?: number | undefined;
            email?: string | undefined;
            roles?: import("./account/user/user").UserRole[] | undefined;
            teamId?: string | undefined;
        } & {
            id?: string | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
            firstName?: string | undefined;
            lastName?: string | undefined;
            birthMonth?: number | undefined;
            email?: string | undefined;
            roles?: (import("./account/user/user").UserRole[] & import("./account/user/user").UserRole[] & { [K in Exclude<keyof I["user"]["roles"], keyof import("./account/user/user").UserRole[]>]: never; }) | undefined;
            teamId?: string | undefined;
        } & { [K_1 in Exclude<keyof I["user"], keyof User>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "user">]: never; }>(object: I): AuthData;
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
