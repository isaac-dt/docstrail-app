import {CollectionSchema} from "../../../shared/database/firestore-utils";
import validator from "validator";

/** Collection reference for firestore. */
export const COMPANY_COLLECTION_NAME = "catalog-companies";

/** Validation schema for the companies collection. */
export const COMPANY_COLLECTION_SCHEMA: CollectionSchema = {
  legalName: {
    description: "legal name using [a-z ,.'-]",
    pattern: (name: string) => RegExp(/^[a-z ,.'-]+$/i).test(name),
    sanitize: (name: string) => validator.trim(name.toLocaleLowerCase()),
  },
  rootId: {
    description: "root alphanumeric id",
    pattern: validator.isAlphanumeric,
  },
  webAddress: {
    description: "web address as URL",
    pattern: validator.isURL,
  },
};
