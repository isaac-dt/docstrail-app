export declare const protobufPackage = "account.user";
/** Roles that a user can assume. */
export declare enum UserRole {
    UNKNOWN_ROLE = "UNKNOWN_ROLE",
    EMPLOYEE = "EMPLOYEE",
    ORG_ADMIN = "ORG_ADMIN",
    SYSTEM_ADMIN = "SYSTEM_ADMIN",
    UNRECOGNIZED = "UNRECOGNIZED"
}
export declare function userRoleFromJSON(object: any): UserRole;
export declare function userRoleToJSON(object: UserRole): string;
/** Individual user associated to a Dimetrail account. */
export interface User {
    $type: "account.user.User";
    readonly id: string;
    readonly fullName: string;
    readonly createdAt: Date | undefined;
    readonly updatedAt: Date | undefined;
    readonly role: UserRole;
    readonly teamId: string | undefined;
    readonly photoUrl: string | undefined;
    readonly email: string;
}
export declare const User: {
    $type: "account.user.User";
    fromJSON(object: any): User;
    toJSON(message: User): unknown;
    fromPartial<I extends {
        id?: string | undefined;
        email?: string | undefined;
        photoUrl?: string | undefined;
        createdAt?: Date | undefined;
        fullName?: string | undefined;
        updatedAt?: Date | undefined;
        role?: UserRole | undefined;
        teamId?: string | undefined;
    } & {
        id?: string | undefined;
        email?: string | undefined;
        photoUrl?: string | undefined;
        createdAt?: Date | undefined;
        fullName?: string | undefined;
        updatedAt?: Date | undefined;
        role?: UserRole | undefined;
        teamId?: string | undefined;
    } & { [K in Exclude<keyof I, "id" | "email" | "photoUrl" | "createdAt" | "$type" | "fullName" | "updatedAt" | "role" | "teamId">]: never; }>(object: I): User;
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
