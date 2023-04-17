import {CollectionSchema} from "../../../shared/database/firestore-utils";
import validator from "validator";

/** Collection reference for firestore. */
export const ALLOW_LIST_COLLECTION_NAME = "catalog-allow-lists";

/** Validation schema for the allow list collection. */
export const ALLOW_LIST_COLLECTION_SCHEMA: CollectionSchema = {
  clientId: {
    description: "client id alphanumeric id",
    pattern: validator.isAlphanumeric,
  },
};

/** Join collection between allow list and open definition.  */
export const JOIN_ALLOW_LIST_OPEN_DEF_COLLECTION_NAME =
  "join-allow-list-open-definition";
/** Validation schema for Join collection between allow list and open definition.  */
export const JOIN_ALLOW_LIST_OPEN_DEF_COLLECTION_SCHEMA: CollectionSchema = {
  allowListId: {
    description: "job role alphanumeric id",
    pattern: validator.isAlphanumeric,
  },
  openDefinitionId: {
    description: "open definition alphanumeric id",
    pattern: validator.isAlphanumeric,
  },
};
