import { DBEntity, Permission, PermissionOp } from "../../generated/types/permission.pb";
/** Gets all permission entries where the corresponding user is an accessor. */
export declare function getPermissions(args: {
    accessor: DBEntity;
    accessorId: string;
    resource: DBEntity;
}): Promise<Permission[]>;
/** Gets a permission entry by its composite id. */
export declare function getPermissionAt(args: {
    id: string;
}): Promise<Permission>;
/** Gets a permission entry. */
export declare function getPermission(args: {
    accessor: DBEntity;
    resource: DBEntity;
    accessorId: string;
    resourceId: string;
}): Promise<Permission | undefined>;
/** Adds or updates a permission. */
export declare function setPermission(permission: Permission): Promise<Permission>;
/** Returns true if operations allow for deleting. */
export declare function canDeleteWith(operations: readonly PermissionOp[]): boolean;
/** Returns true if operations allow for updating. */
export declare function canUpdateWith(operations: readonly PermissionOp[]): boolean;
/** Returns true if operations allow for creating. */
export declare function canCreateWith(operations: readonly PermissionOp[]): boolean;
/** Returns true if operations allow for reading. */
export declare function canReadWith(operations: readonly PermissionOp[]): boolean;
