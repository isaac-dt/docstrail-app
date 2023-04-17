import {CollectionSchema} from "../../../shared/database/firestore-utils";
import validator from "validator";

/** Collection reference for firestore. */
export const TARGET_COLLECTION_NAME = "operation-target";

/** Validation schema for the target collection. */
export const TARGET_COLLECTION_SCHEMA: CollectionSchema = {
  clientId: {
    description: "client id alphanumeric id",
    pattern: validator.isAlphanumeric,
  },
  name: {
    description: "target name using [a-z ,.'-]",
    pattern: (name: string) => RegExp(/^[a-z ,.'-]+$/i).test(name),
    sanitize: (name: string) => validator.trim(name.toLocaleLowerCase()),
  },
};

/** Join collection between target and user.  */
export const JOIN_TARGET_USER_COLLECTION_NAME = "join-target-user";
/** Validation schema for Join collection between target and user.  */
export const JOIN_TARGET_USER_COLLECTION_SCHEMA: CollectionSchema = {
  targetId: {
    description: "target alphanumeric id",
    pattern: validator.isAlphanumeric,
  },
  userId: {
    description: "user alphanumeric id",
    pattern: validator.isAlphanumeric,
  },
};

/** Join collection between target and team.  */
export const JOIN_TARGET_TEAM_COLLECTION_NAME = "join-target-team";
/** Validation schema for Join collection between target and team.  */
export const JOIN_TARGET_TEAM_COLLECTION_SCHEMA: CollectionSchema = {
  targetId: {
    description: "target alphanumeric id",
    pattern: validator.isAlphanumeric,
  },
  teamId: {
    description: "team alphanumeric id",
    pattern: validator.isAlphanumeric,
  },
};

/** Join collection between target and job role.  */
export const JOIN_TARGET_JOB_ROLE_COLLECTION_NAME = "join-target-user";
/** Validation schema for Join collection between target and job role.  */
export const JOIN_TARGET_JOB_ROLE_COLLECTION_SCHEMA: CollectionSchema = {
  targetId: {
    description: "target alphanumeric id",
    pattern: validator.isAlphanumeric,
  },
  jobRoleId: {
    description: "job role alphanumeric id",
    pattern: validator.isAlphanumeric,
  },
};
