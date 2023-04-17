import { CollectionSchema } from "../../shared/database/firestore-utils";
/** Collection reference for firestore. */
export declare const USER_COLLECTION_NAME = "account-users";
/** Validation schema for the users collection. */
export declare const USER_COLLECTION_SCHEMA: CollectionSchema;
/** Join collection between user and jobRole.  */
export declare const JOIN_USER_JOB_ROLE_COLLECTION_NAME = "account-join-user-job-role";
/** Validation schema for Join collection between user and jobRole.  */
export declare const JOIN_USER_JOB_ROLE_COLLECTION_SCHEMA: CollectionSchema;
