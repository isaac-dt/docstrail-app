export declare const protobufPackage = "permission";
/**
 * Possible operations which could be applied to a resource.
 * Next Id: 6
 */
export declare enum PermissionOp {
    NONE = "NONE",
    /** READ - Can only read the data. */
    READ = "READ",
    /** REVIEW - Can read, but has limited write. */
    REVIEW = "REVIEW",
    /** WRITE - Can read, create, and update the entity. */
    WRITE = "WRITE",
    /** ALL - Can read, create, update, and delete the entity. */
    ALL = "ALL",
    UNRECOGNIZED = "UNRECOGNIZED"
}
export declare function permissionOpFromJSON(object: any): PermissionOp;
export declare function permissionOpToJSON(object: PermissionOp): string;
/** Firebase entities which could be accessors or resources. */
export declare enum DBEntity {
    USER = "USER",
    ADDRESS = "ADDRESS",
    JOB_ROLE = "JOB_ROLE",
    TEAM = "TEAM",
    ORG = "ORG",
    CLIENT = "CLIENT",
    ROOT = "ROOT",
    OPEN_DEFINITION = "OPEN_DEFINITION",
    CORE_DEFINITION = "CORE_DEFINITION",
    INVENTORY_BATCH = "INVENTORY_BATCH",
    DISTRIBUTION_OUTLET = "DISTRIBUTION_OUTLET",
    OUTLET_ADDRESS = "OUTLET_ADDRESS",
    PRODUCT = "PRODUCT",
    ALLOW_LIST = "ALLOW_LIST",
    COMPANY = "COMPANY",
    PACKAGE = "PACKAGE",
    ORDER = "ORDER",
    DELIVERY_ITEM = "DELIVERY_ITEM",
    TEMPLATE = "TEMPLATE",
    TRIGGER = "TRIGGER",
    TARGET = "TARGET",
    BUNDLE = "BUNDLE",
    BILLING_CYCLE = "BILLING_CYCLE",
    /** PROPOSAL - Proposals */
    PROPOSAL = "PROPOSAL",
    COMMENT_THREAD = "COMMENT_THREAD",
    COMMENT_MESSAGE = "COMMENT_MESSAGE",
    PROPOSAL_REVIEW = "PROPOSAL_REVIEW",
    UNRECOGNIZED = "UNRECOGNIZED"
}
export declare function dBEntityFromJSON(object: any): DBEntity;
export declare function dBEntityToJSON(object: DBEntity): string;
/**
 * Used by clients to set permission.
 * Next Id: 9
 */
export interface WritePermissionRequest {
    $type: "permission.WritePermissionRequest";
    readonly accessorId: string;
    readonly resourceId: string;
    readonly accessor: DBEntity;
    readonly resource: DBEntity;
    readonly operation: PermissionOp;
}
/**
 * Returned to clients after set permission request.
 * Next Id: 2
 */
export interface GetPermissionResponse {
    $type: "permission.GetPermissionResponse";
    readonly permission: Permission | undefined;
}
/**
 * Generic permission data.
 * Next Id: 9
 */
export interface Permission {
    $type: "permission.Permission";
    readonly id: string | undefined;
    readonly createdAt: Date | undefined;
    readonly updatedAt: Date | undefined;
    readonly accessorId: string;
    readonly resourceId: string | undefined;
    readonly accessor: DBEntity;
    readonly resource: DBEntity;
    readonly operation: PermissionOp;
}
export declare const WritePermissionRequest: {
    $type: "permission.WritePermissionRequest";
    fromJSON(object: any): WritePermissionRequest;
    toJSON(message: WritePermissionRequest): unknown;
    fromPartial<I extends {
        accessorId?: string | undefined;
        resourceId?: string | undefined;
        accessor?: DBEntity | undefined;
        resource?: DBEntity | undefined;
        operation?: PermissionOp | undefined;
    } & {
        accessorId?: string | undefined;
        resourceId?: string | undefined;
        accessor?: DBEntity | undefined;
        resource?: DBEntity | undefined;
        operation?: PermissionOp | undefined;
    } & { [K in Exclude<keyof I, "$type" | "accessorId" | "resourceId" | "accessor" | "resource" | "operation">]: never; }>(object: I): WritePermissionRequest;
};
export declare const GetPermissionResponse: {
    $type: "permission.GetPermissionResponse";
    fromJSON(object: any): GetPermissionResponse;
    toJSON(message: GetPermissionResponse): unknown;
    fromPartial<I extends {
        permission?: {
            id?: string | undefined;
            createdAt?: Date | undefined;
            accessorId?: string | undefined;
            resourceId?: string | undefined;
            accessor?: DBEntity | undefined;
            resource?: DBEntity | undefined;
            operation?: PermissionOp | undefined;
            updatedAt?: Date | undefined;
        } | undefined;
    } & {
        permission?: ({
            id?: string | undefined;
            createdAt?: Date | undefined;
            accessorId?: string | undefined;
            resourceId?: string | undefined;
            accessor?: DBEntity | undefined;
            resource?: DBEntity | undefined;
            operation?: PermissionOp | undefined;
            updatedAt?: Date | undefined;
        } & {
            id?: string | undefined;
            createdAt?: Date | undefined;
            accessorId?: string | undefined;
            resourceId?: string | undefined;
            accessor?: DBEntity | undefined;
            resource?: DBEntity | undefined;
            operation?: PermissionOp | undefined;
            updatedAt?: Date | undefined;
        } & { [K in Exclude<keyof I["permission"], "id" | "createdAt" | "$type" | "accessorId" | "resourceId" | "accessor" | "resource" | "operation" | "updatedAt">]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, "$type" | "permission">]: never; }>(object: I): GetPermissionResponse;
};
export declare const Permission: {
    $type: "permission.Permission";
    fromJSON(object: any): Permission;
    toJSON(message: Permission): unknown;
    fromPartial<I extends {
        id?: string | undefined;
        createdAt?: Date | undefined;
        accessorId?: string | undefined;
        resourceId?: string | undefined;
        accessor?: DBEntity | undefined;
        resource?: DBEntity | undefined;
        operation?: PermissionOp | undefined;
        updatedAt?: Date | undefined;
    } & {
        id?: string | undefined;
        createdAt?: Date | undefined;
        accessorId?: string | undefined;
        resourceId?: string | undefined;
        accessor?: DBEntity | undefined;
        resource?: DBEntity | undefined;
        operation?: PermissionOp | undefined;
        updatedAt?: Date | undefined;
    } & { [K in Exclude<keyof I, "id" | "createdAt" | "$type" | "accessorId" | "resourceId" | "accessor" | "resource" | "operation" | "updatedAt">]: never; }>(object: I): Permission;
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
