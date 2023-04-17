import {CollectionSchema} from "../../../shared/database/firestore-utils";
import validator from "validator";

/** Collection reference for firestore. */
export const CORE_DEFINITION_COLLECTION_NAME = "catalog-core-definitions";

/** Validation schema for the core definition collection. */
export const CORE_DEFINITION_COLLECTION_SCHEMA: CollectionSchema = {
  name: {
    description: "core definition name using [a-z ,.'-]",
    pattern: (name: string) => RegExp(/^[a-z ,.'-]+$/i).test(name),
    sanitize: (name: string) => validator.trim(name.toLocaleLowerCase()),
  },
  description: {
    description: "core definition description in free ascii text",
    pattern: validator.isAscii,
    sanitize: (name: string) => validator.trim(name),
  },
  rootId: {
    description: "core definition alphanumeric id",
    pattern: validator.isAlphanumeric,
  },
};

/** Join collection between core definition and distribution outlet. */
export const JOIN_CORE_DEF_DIST_OUTLET_COLLECTION_NAME =
  "catalog-join-core-definition-distribution-outlet";
/** Validation schema for Join collection between core definition and distribution outlet. */
export const JOIN_CORE_DEF_DIST_OUTLET_COLLECTION_SCHEMA: CollectionSchema = {
  coreDefinitionId: {
    description: "core definition alphanumeric id",
    pattern: validator.isAlphanumeric,
  },
  distributionOutletId: {
    description: "distribution outlet alphanumeric id",
    pattern: validator.isAlphanumeric,
  },
};
