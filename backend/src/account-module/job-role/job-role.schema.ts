import {CollectionSchema} from "../../shared/database/firestore-utils";
import validator from "validator";

/** Collection reference for firestore. */
export const JOB_ROLE_COLLECTION_NAME = "account-job-roles";

/** Validation schema for the job roles collection. */
export const JOB_ROLE_COLLECTION_SCHEMA: CollectionSchema = {
  parent: {
    description: "parent of job role should follow proto oneof format",
    pattern: (parent: any) => ["clientId", "rootId"].includes(parent.$case),
  },
  name: {
    description: "job role name using [a-z ,.'-]",
    pattern: (name: string) => RegExp(/^[a-z ,.'-]+$/i).test(name),
    sanitize: (name: string) => validator.trim(name.toLocaleLowerCase()),
  },
};
