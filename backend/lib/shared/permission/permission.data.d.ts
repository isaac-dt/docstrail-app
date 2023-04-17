import { DBEntity, GetPermissionResponse, Permission, PermissionOp, WritePermissionRequest } from "../../generated/types/permission.pb";
import { AppError } from "../../generated/types/common.pb";
/** The id of the application root. */
export declare const DB_ROOT_ID = "1";
/** Gets all permission entries for a specific accessor and resource type. */
export declare function getPermissions(args: {
    accessor: DBEntity;
    accessorId: string;
    resource: DBEntity;
}): Promise<Permission[]>;
/** Gets all permissions associated to a specific resource. */
export declare function getPermissionsOnResource(args: {
    accessor: DBEntity;
    resource: DBEntity;
    resourceId: string;
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
}): Promise<Permission>;
/** Adds or updates a permission. */
export declare function setPermission(permission: Partial<WritePermissionRequest>): Promise<Permission | AppError>;
/** Returns the most potent permission operation from a list of operations. */
export declare function getHighestPermissionOp(operations: readonly PermissionOp[]): PermissionOp;
/** Whether the permission operation at `arg1` is more potent than operation at `arg2`. */
export declare function isPermissionOpGt(permissionOpA: PermissionOp, permissionOpB: PermissionOp): boolean;
/** Whether the permission operation at `arg1` is more or equally potent than operation at `arg2`. */
export declare function isPermissionOpGte(permissionOpA: PermissionOp, permissionOpB: PermissionOp): boolean;
/** Returns true if operation allows to read, create, update, and delete. */
export declare function canDeleteWith(operation: PermissionOp): boolean;
/** Returns true if operations allows to read, create, and update. */
export declare function canWriteWith(operation: PermissionOp): boolean;
/** Returns true if operations allows to read, create, and update. */
export declare function canReviewWith(operation: PermissionOp): boolean;
/** Returns true if operations allow to read. */
export declare function canReadWith(operation: PermissionOp): boolean;
/** Response to be sent to client. */
export declare function buildGetPermissionResponse(permission: Permission): Promise<GetPermissionResponse>;
