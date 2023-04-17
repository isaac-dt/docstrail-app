import {CollectionSchema} from "../../../shared/database/firestore-utils";
import validator from "validator";

/** Collection reference for firestore. */
export const BUNDLE_COLLECTION_NAME = "operation-bundle";

/** Validation schema for the bundle collection. */
export const BUNDLE_COLLECTION_SCHEMA: CollectionSchema = {
  parent: {
    description: "parent of bundle should follow proto oneof format",
    pattern: (parent: any) => ["clientId", "rootId"].includes(parent.$case),
  },
  name: {
    description: "bundle name using [a-z ,.'-]",
    pattern: (name: string) => RegExp(/^[a-z ,.'-]+$/i).test(name),
    sanitize: (name: string) => validator.trim(name.toLocaleLowerCase()),
  },
  description: {
    description: "description text in ascii",
    pattern: validator.isAscii,
    sanitize: validator.trim,
  },
};
