import {CollectionSchema} from "../../../shared/database/firestore-utils";
import validator from "validator";

/** Collection reference for firestore. */
export const OPEN_DEFINITION_COLLECTION_NAME = "catalog-open-definitions";

/** Validation schema for the open definition collection. */
export const OPEN_DEFINITION_COLLECTION_SCHEMA: CollectionSchema = {
  name: {
    description: "open definition name using [a-z ,.'-]",
    pattern: (name: string) => RegExp(/^[a-z ,.'-]+$/i).test(name),
    sanitize: (name: string) => validator.trim(name.toLocaleLowerCase()),
  },
  description: {
    description: "open definition description in free ascii text",
    pattern: validator.isAscii,
    sanitize: (name: string) => validator.trim(name),
  },
  parent: {
    description: "parent of open definition should follow proto oneof format",
    pattern: (parent: any) => ["clientId", "rootId"].includes(parent.$case),
  },
  coreDefinitionId: {
    description: "open code alphanumeric id",
    pattern: validator.isAlphanumeric,
  },
  isTangible: {
    description:
      "boolean to determine whether this represents a physical entity",
    pattern: validator.isBoolean,
  },
};
