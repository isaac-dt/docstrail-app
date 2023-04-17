import * as functions from "firebase-functions";
import {getFirestore} from "firebase-admin/firestore";
import {
  DBEntity,
  GetPermissionResponse,
  Permission,
  PermissionOp,
  WritePermissionRequest,
} from "../../generated/types/permission.pb";
import {AppError, ErrorCode} from "../../generated/types/common.pb";
import {
  PERMISSION_COLLECTION_NAME,
  PERMISSION_COLLECTION_SCHEMA,
} from "./permission.schema";
import {getDataParsers} from "../database/firestore-utils";
import {getDateFromFireTimestamp} from "../utils";

/** The id of the application root. */
export const DB_ROOT_ID = "1";

const db = getFirestore();
const permissionsRef = db.collection(PERMISSION_COLLECTION_NAME);

/** Numerical values associated to permissions operations in a hierarchical fashion. */
const permissionOpToNumeric: Record<PermissionOp, number> = {
  [PermissionOp.UNRECOGNIZED]: -1, // This is for type safety only; unused.
  [PermissionOp.NONE]: 0,
  [PermissionOp.READ]: 1,
  [PermissionOp.REVIEW]: 2,
  [PermissionOp.WRITE]: 3,
  [PermissionOp.ALL]: 4,
};

/** Gets all permission entries for a specific accessor and resource type. */
export async function getPermissions(args: {
  accessor: DBEntity;
  accessorId: string;
  resource: DBEntity;
}): Promise<Permission[]> {
  const permissionsSnap = await permissionsRef
    .where("accessor", "==", args.accessor)
    .where("accessorId", "==", args.accessorId)
    .where("resource", "==", args.resource)
    .get();
  const permissions = permissionsSnap.docs.map((permission) =>
    Permission.fromPartial(permission.data() as Partial<Permission>)
  );
  return permissions.map((permission) => ({
    ...permission,
    createdAt: getDateFromFireTimestamp(permission.createdAt),
    updatedAt: getDateFromFireTimestamp(permission.updatedAt),
  }));
}

/** Gets all permissions associated to a specific resource. */
export async function getPermissionsOnResource(args: {
  accessor: DBEntity;
  resource: DBEntity;
  resourceId: string;
}): Promise<Permission[]> {
  const permissionsSnap = await permissionsRef
    .where("accessor", "==", args.accessor)
    .where("resource", "==", args.resource)
    .where("resourceId", "==", args.resourceId)
    .get();
  const permissions = permissionsSnap.docs.map((permission) =>
    Permission.fromPartial(permission.data() as Partial<Permission>)
  );
  return permissions.map((permission) => ({
    ...permission,
    createdAt: getDateFromFireTimestamp(permission.createdAt),
    updatedAt: getDateFromFireTimestamp(permission.updatedAt),
  }));
}

/** Gets a permission entry by its composite id. */
export async function getPermissionAt(args: {id: string}): Promise<Permission> {
  const permissionSnap = await db
    .collection(PERMISSION_COLLECTION_NAME)
    .doc(args.id)
    .get();
  const permission: Partial<Permission> | undefined = permissionSnap.data();
  if (!permission)
    throw AppError.fromPartial({errorCode: ErrorCode.NOT_FOUND_IN_DB});
  return Permission.fromPartial({
    ...permission,
    id: permissionSnap.id,
    createdAt: getDateFromFireTimestamp(permission.createdAt),
    updatedAt: getDateFromFireTimestamp(permission.updatedAt),
  });
}

/** Gets a permission entry. */
export async function getPermission(args: {
  accessor: DBEntity;
  resource: DBEntity;
  accessorId: string;
  resourceId: string;
}): Promise<Permission> {
  const permissionSnap = await permissionsRef
    .where("accessor", "==", args.accessor)
    .where("accessorId", "==", args.accessorId)
    .where("resource", "==", args.resource)
    .where("resourceId", "==", args.resourceId)
    .get();
  if (permissionSnap.size > 1)
    throw AppError.fromPartial({
      errorCode: ErrorCode.DUPLICATE_ENTRY,
      details: args,
    });
  if (permissionSnap.empty) {
    const noPermission = Permission.fromPartial({
      ...args,
      operation: PermissionOp.NONE,
    });
    return noPermission;
  }
  const permission = Permission.fromPartial({
    ...(permissionSnap.docs[0].data() as Partial<Permission>),
    id: permissionSnap.docs[0].id,
  });
  return {
    ...permission,
    createdAt: getDateFromFireTimestamp(permission.createdAt),
    updatedAt: getDateFromFireTimestamp(permission.updatedAt),
  };
}

/** Adds or updates a permission. */
export async function setPermission(
  permission: Partial<WritePermissionRequest>
): Promise<Permission | AppError> {
  try {
    const parser = getDataParsers({
      schema: PERMISSION_COLLECTION_SCHEMA,
      onlyFields: ["accessor", "accessorId", "resource", "resourceId"],
    });
    const validationErrors = parser.validate(permission);
    if (validationErrors.length)
      throw AppError.fromPartial({
        errorCode: ErrorCode.INVALID_DATA,
        details: validationErrors,
      });
    const permissionFound = await getPermission({
      accessor: permission.accessor!,
      accessorId: permission.accessorId!,
      resource: permission.resource!,
      resourceId: permission.resourceId!,
    });
    if (!permissionFound.id) return createPermission(permission);
    else return updatePermissionOps(permissionFound, permission);
  } catch (e) {
    functions.logger.error(`Error setting permission. `, e);
    return Promise.resolve(
      AppError.fromPartial({errorCode: ErrorCode.INVALID_DATA, details: e})
    );
  }
}

/** Adds a new permission entry to the permission collection. */
async function createPermission(
  permission: Partial<WritePermissionRequest>
): Promise<Permission | AppError> {
  const parser = getDataParsers({
    schema: PERMISSION_COLLECTION_SCHEMA,
  });
  const validationErrors = parser.validate(permission);
  if (validationErrors.length)
    return AppError.fromPartial({
      errorCode: ErrorCode.INVALID_DATA,
      details: validationErrors,
    });
  const sanitizedPermissionData = Permission.fromPartial(
    parser.sanitize({
      ...permission,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  );

  const permissionRef = await db
    .collection(PERMISSION_COLLECTION_NAME)
    .add(sanitizedPermissionData);
  const permissionAddedData = (await permissionRef.get()).data();
  if (!permissionAddedData)
    return AppError.fromPartial({errorCode: ErrorCode.UNRECOGNIZED});
  const permissionAdded = Permission.fromPartial(
    permissionAddedData as Partial<Permission>
  );
  return permissionAdded;
}

/** Updates the `operation` field in an existing permission entry. */
async function updatePermissionOps(
  permissionFound: Permission,
  requestedUpdate: Partial<WritePermissionRequest>
): Promise<Permission | AppError> {
  const parser = getDataParsers({
    schema: PERMISSION_COLLECTION_SCHEMA,
    onlyFields: ["operation"],
  });
  const validationErrors = parser.validate(requestedUpdate);
  if (validationErrors.length || !permissionFound.id) {
    const err = AppError.fromPartial({
      details: {
        validationErrors,
        others: !permissionFound.id ? "missing permission id" : undefined,
      },
      errorCode: ErrorCode.INVALID_DATA,
    });
    functions.logger.error(`Error setting permission. `, err);
    return err;
  }
  const sanitizedPermissionData = Permission.fromPartial(
    parser.sanitize({
      ...permissionFound,
      ...requestedUpdate,
      updatedAt: new Date(),
    })
  );
  await db
    .collection(PERMISSION_COLLECTION_NAME)
    .doc(permissionFound.id)
    .update(sanitizedPermissionData);
  const updatedPermission = await getPermissionAt({id: permissionFound.id});
  if (!updatedPermission) {
    const err = AppError.fromPartial({errorCode: ErrorCode.UNRECOGNIZED});
    functions.logger.error(`Error setting permission. `, err);
    return err;
  }
  return updatedPermission;
}

/** Returns the most potent permission operation from a list of operations. */
export function getHighestPermissionOp(
  operations: readonly PermissionOp[]
): PermissionOp {
  let highestPermissionOp: PermissionOp = PermissionOp.NONE;
  for (const op of operations) {
    if (isPermissionOpGt(op, highestPermissionOp)) {
      highestPermissionOp = op;
    }
  }
  return highestPermissionOp;
}

/** Whether the permission operation at `arg1` is more potent than operation at `arg2`. */
export function isPermissionOpGt(
  permissionOpA: PermissionOp,
  permissionOpB: PermissionOp
): boolean {
  return (
    permissionOpToNumeric[permissionOpA] > permissionOpToNumeric[permissionOpB]
  );
}

/** Whether the permission operation at `arg1` is more or equally potent than operation at `arg2`. */
export function isPermissionOpGte(
  permissionOpA: PermissionOp,
  permissionOpB: PermissionOp
): boolean {
  return (
    permissionOpToNumeric[permissionOpA] >= permissionOpToNumeric[permissionOpB]
  );
}

/** Returns true if operation allows to read, create, update, and delete. */
export function canDeleteWith(operation: PermissionOp): boolean {
  return operation === PermissionOp.ALL;
}

/** Returns true if operations allows to read, create, and update. */
export function canWriteWith(operation: PermissionOp): boolean {
  return [PermissionOp.ALL, PermissionOp.WRITE].includes(operation);
}

/** Returns true if operations allows to read, create, and update. */
export function canReviewWith(operation: PermissionOp): boolean {
  return [PermissionOp.ALL, PermissionOp.WRITE, PermissionOp.REVIEW].includes(
    operation
  );
}

/** Returns true if operations allow to read. */
export function canReadWith(operation: PermissionOp): boolean {
  return [
    PermissionOp.ALL,
    PermissionOp.WRITE,
    PermissionOp.REVIEW,
    PermissionOp.READ,
  ].includes(operation);
}

/** Response to be sent to client. */
export async function buildGetPermissionResponse(
  permission: Permission
): Promise<GetPermissionResponse> {
  return GetPermissionResponse.fromPartial({
    permission,
  });
}
