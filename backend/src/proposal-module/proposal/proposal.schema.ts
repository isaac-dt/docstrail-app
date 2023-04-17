import {PermissionOp} from "../../generated/types/permission.pb";
import {CollectionSchema} from "../../shared/database/firestore-utils";
import validator from "validator";

/** Collection reference for firestore. */
export const PROPOSAL_COLLECTION_NAME = "proposals";

/** Collection reference for firestore. */
export const PROPOSAL_DELETED_COLLECTION_NAME = "proposals-deleted";

/** Validation schema for the proposals collection. */
export const PROPOSAL_COLLECTION_SCHEMA: CollectionSchema = {
  name: {
    description: "proposal name using [a-z ,.'-]",
    pattern: validator.isAscii,
    // sanitize: (name: string) => validator.trim(name.toLocaleLowerCase()),
  },
  diagramXml: {
    description: "proposal diagram data in jgraph.xml format",
    pattern: validator.isAscii,
  },
};

/** Validation for proposal share request. */
export const WRITE_SHARE_PROPOSAL_REQUEST_SCHEMA: CollectionSchema = {
  accessorEmail: {
    description: "email of the accessor",
    pattern: validator.isEmail,
  },
  proposalId: {
    description: "proposal id as an alphanumeric",
    pattern: validator.isAlphanumeric,
  },
  operation: {
    description: "one of the permission operations",
    pattern: (operation: any) => {
      return Object.values(PermissionOp).includes(operation);
    },
  },
};
