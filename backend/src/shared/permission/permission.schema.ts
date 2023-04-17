import {CollectionSchema} from "../database/firestore-utils";
import validator from "validator";
import {DBEntity, PermissionOp} from "../../generated/types/permission.pb";

/** Collection reference for firestore. */
export const PERMISSION_COLLECTION_NAME = "permissions";

/** Validation schema for the permission collection. */
export const PERMISSION_COLLECTION_SCHEMA: CollectionSchema = {
  accessor: {
    description: "(string) enum identifier of firebase entity",
    pattern: (entity: any) => {
      return Object.values(DBEntity).includes(entity);
    },
  },
  accessorId: {
    description: "accessor Id",
    pattern: validator.isAscii,
  },
  resource: {
    description: "enum (string) identifier of firebase entity",
    pattern: (entity: any) => {
      return Object.values(DBEntity).includes(entity);
    },
  },
  resourceId: {
    description: "resource Id",
    pattern: validator.isAscii,
  },
  operation: {
    description: "one of the permission operations",
    pattern: (operation: string) => {
      return Object.keys(PermissionOp).includes(operation);
    },
  },
};
