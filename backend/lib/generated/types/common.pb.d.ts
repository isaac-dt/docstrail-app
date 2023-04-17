export declare const protobufPackage = "common";
/**
 * Codified app errors.
 * Next Id: 3
 */
export declare enum ErrorCode {
    INVALID_DATA = "INVALID_DATA",
    NOT_FOUND_IN_DB = "NOT_FOUND_IN_DB",
    DUPLICATE_ENTRY = "DUPLICATE_ENTRY",
    MISSING_PERMISSION = "MISSING_PERMISSION",
    UNKNOWN = "UNKNOWN",
    UNRECOGNIZED = "UNRECOGNIZED"
}
export declare function errorCodeFromJSON(object: any): ErrorCode;
export declare function errorCodeToJSON(object: ErrorCode): string;
/**
 * Structure for JSON https responses.
 * Next Id: 4
 */
export interface JsonResponse {
    $type: "common.JsonResponse";
    readonly data: any | undefined;
    readonly error: AppError | undefined;
}
/**
 * App Error structure.
 * Next Id: 3
 */
export interface AppError {
    $type: "common.AppError";
    readonly details: any | undefined;
    readonly errorCode: ErrorCode;
}
/**
 * The data stored in JWT auth token.
 * Next Id: 3
 */
export interface AuthData {
    $type: "common.AuthData";
    readonly user: JwtUserData | undefined;
}
export interface JwtUserData {
    $type: "common.JwtUserData";
    readonly id: string;
    readonly email: string;
    readonly fullName: string;
    readonly isEmailVerified: boolean;
}
export declare const JsonResponse: {
    $type: "common.JsonResponse";
    fromJSON(object: any): JsonResponse;
    toJSON(message: JsonResponse): unknown;
    fromPartial<I extends {
        data?: any;
        error?: {
            errorCode?: ErrorCode | undefined;
            details?: any;
        } | undefined;
    } & {
        data?: any;
        error?: ({
            errorCode?: ErrorCode | undefined;
            details?: any;
        } & {
            errorCode?: ErrorCode | undefined;
            details?: any;
        } & { [K in Exclude<keyof I["error"], "errorCode" | "details" | "$type">]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "data" | "error" | "$type">]: never; }>(object: I): JsonResponse;
};
export declare const AppError: {
    $type: "common.AppError";
    fromJSON(object: any): AppError;
    toJSON(message: AppError): unknown;
    fromPartial<I extends {
        errorCode?: ErrorCode | undefined;
        details?: any;
    } & {
        errorCode?: ErrorCode | undefined;
        details?: any;
    } & { [K in Exclude<keyof I, "errorCode" | "details" | "$type">]: never; }>(object: I): AppError;
};
export declare const AuthData: {
    $type: "common.AuthData";
    fromJSON(object: any): AuthData;
    toJSON(message: AuthData): unknown;
    fromPartial<I extends {
        user?: {
            id?: string | undefined;
            email?: string | undefined;
            fullName?: string | undefined;
            isEmailVerified?: boolean | undefined;
        } | undefined;
    } & {
        user?: ({
            id?: string | undefined;
            email?: string | undefined;
            fullName?: string | undefined;
            isEmailVerified?: boolean | undefined;
        } & {
            id?: string | undefined;
            email?: string | undefined;
            fullName?: string | undefined;
            isEmailVerified?: boolean | undefined;
        } & { [K in Exclude<keyof I["user"], "id" | "email" | "$type" | "fullName" | "isEmailVerified">]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "user" | "$type">]: never; }>(object: I): AuthData;
};
export declare const JwtUserData: {
    $type: "common.JwtUserData";
    fromJSON(object: any): JwtUserData;
    toJSON(message: JwtUserData): unknown;
    fromPartial<I extends {
        id?: string | undefined;
        email?: string | undefined;
        fullName?: string | undefined;
        isEmailVerified?: boolean | undefined;
    } & {
        id?: string | undefined;
        email?: string | undefined;
        fullName?: string | undefined;
        isEmailVerified?: boolean | undefined;
    } & { [K in Exclude<keyof I, "id" | "email" | "$type" | "fullName" | "isEmailVerified">]: never; }>(object: I): JwtUserData;
};
declare type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {
    $case: string;
} ? {
    [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]>;
} & {
    $case: T["$case"];
} : T extends {} ? {
    [K in Exclude<keyof T, "$type">]?: DeepPartial<T[K]>;
} : Partial<T>;
declare type KeysOfUnion<T> = T extends T ? keyof T : never;
export declare type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P> | "$type">]: never;
};
export {};
