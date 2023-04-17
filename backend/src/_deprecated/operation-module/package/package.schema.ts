import {CollectionSchema} from "../../../shared/database/firestore-utils";
import validator from "validator";

/** Package reference for firestore. */
export const PACKAGE_COLLECTION_NAME = "operations-package";

/** Validation schema for the packages collection. */
export const PACKAGE_COLLECTION_SCHEMA: CollectionSchema = {
  name: {
    description: "name using [a-z ,.'-]",
    pattern: (name: string) => RegExp(/^[a-z ,.'-]+$/i).test(name),
    sanitize: (name: string) => validator.trim(name.toLocaleLowerCase()),
  },
  description: {
    description: "description text in ascii",
    pattern: validator.isAscii,
    sanitize: validator.trim,
  },
  parent: {
    description: "parent of job role should follow proto oneof format",
    pattern: (parent: any) => ["clientId", "rootId"].includes(parent.$case),
  },
};

/** Join collection between package and open definition.  */
export const JOIN_PACKAGE_OPEN_DEF_COLLECTION_NAME =
  "join-package-open-definition";
/** Validation schema for Join collection between package and open definition.  */
export const JOIN_PACKAGE_OPEN_DEF_COLLECTION_SCHEMA: CollectionSchema = {
  packageId: {
    description: "package alphanumeric id",
    pattern: validator.isAlphanumeric,
  },
  openDefinitionId: {
    description: "open definition alphanumeric id",
    pattern: validator.isAlphanumeric,
  },
};
