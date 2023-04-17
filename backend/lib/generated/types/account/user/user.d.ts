import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "account.user";
/**
 * Roles that a user can assume.
 * Next Id: 3
 */
export declare enum UserRole {
    EMPLOYEE = 0,
    CLIENT_ADMIN = 1,
    SYSTEM_ADMIN = 2,
    UNRECOGNIZED = -1
}
export declare function userRoleFromJSON(object: any): UserRole;
export declare function userRoleToJSON(object: UserRole): string;
/**
 * Individual user associated to a Dimetrail account.
 * Next Id: 11
 */
export interface User {
    id: string;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
    firstName: string;
    lastName: string;
    birthMonth: number | undefined;
    email: string;
    roles: UserRole[];
    teamId: string;
}
export declare const User: {
    encode(message: User, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): User;
    fromJSON(object: any): User;
    toJSON(message: User): unknown;
    fromPartial<I extends {
        id?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
        birthMonth?: number | undefined;
        email?: string | undefined;
        roles?: UserRole[] | undefined;
        teamId?: string | undefined;
    } & {
        id?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
        birthMonth?: number | undefined;
        email?: string | undefined;
        roles?: (UserRole[] & UserRole[] & { [K in Exclude<keyof I["roles"], keyof UserRole[]>]: never; }) | undefined;
        teamId?: string | undefined;
    } & { [K_1 in Exclude<keyof I, keyof User>]: never; }>(object: I): User;
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
