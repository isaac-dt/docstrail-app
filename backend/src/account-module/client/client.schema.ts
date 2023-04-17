import {CollectionSchema} from "../../shared/database/firestore-utils";
import validator from "validator";

/** Collection reference for firestore. */
export const CLIENT_COLLECTION_NAME = "account-clients";

/** Validation schema for the clients collection. */
export const CLIENT_COLLECTION_SCHEMA: CollectionSchema = {
  name: {
    description: "client name using [a-z ,.'-]",
    pattern: (name: string) => RegExp(/^[a-z ,.'-]+$/i).test(name),
    sanitize: (name: string) => validator.trim(name.toLocaleLowerCase()),
  },
  rootId: {
    description: "root alphanumeric id",
    pattern: validator.isAlphanumeric,
  },
};
