import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "permission";
/**
 * Possible operations which could be applied to a resource.
 * Next Id: 6
 */
export declare enum PermissionOp {
    READ = 0,
    UPDATE = 1,
    CREATE = 2,
    DELETE = 3,
    SHARE = 4,
    ALL = 5,
    UNRECOGNIZED = -1
}
export declare function permissionOpFromJSON(object: any): PermissionOp;
export declare function permissionOpToJSON(object: PermissionOp): string;
/**
 * Firebase entities which could be accessors or resources.
 * Next Id: 20
 */
export declare enum DBEntity {
    USER = 0,
    ADDRESS = 1,
    JOB_ROLE = 2,
    TEAM = 3,
    ORG = 4,
    CLIENT = 5,
    BILLING_CYCLE = 6,
    TARGET = 7,
    PROGRAM = 8,
    EVENT = 9,
    TRIGGER = 10,
    ORDER = 11,
    ITEM_ALLOW_LIST = 12,
    PACKAGE = 13,
    ITEM_DEFINITION = 14,
    ITEM_CODE = 15,
    INVENTORY = 16,
    PROVIDER = 17,
    ITEM = 18,
    ROOT = 19,
    UNRECOGNIZED = -1
}
export declare function dBEntityFromJSON(object: any): DBEntity;
export declare function dBEntityToJSON(object: DBEntity): string;
/**
 * Generic permission data.
 * Next Id: 9
 */
export interface Permission {
    id: string | undefined;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
    accessorId: string;
    resourceId: string | undefined;
    accessor: DBEntity;
    resource: DBEntity;
    operations: PermissionOp[];
}
export declare const Permission: {
    encode(message: Permission, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Permission;
    fromJSON(object: any): Permission;
    toJSON(message: Permission): unknown;
    fromPartial<I extends {
        id?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        accessorId?: string | undefined;
        resourceId?: string | undefined;
        accessor?: DBEntity | undefined;
        resource?: DBEntity | undefined;
        operations?: PermissionOp[] | undefined;
    } & {
        id?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        accessorId?: string | undefined;
        resourceId?: string | undefined;
        accessor?: DBEntity | undefined;
        resource?: DBEntity | undefined;
        operations?: (PermissionOp[] & PermissionOp[] & { [K in Exclude<keyof I["operations"], keyof PermissionOp[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof Permission>]: never; }>(object: I): Permission;
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
