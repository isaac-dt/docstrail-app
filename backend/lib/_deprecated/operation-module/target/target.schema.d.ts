import { CollectionSchema } from "../../../shared/database/firestore-utils";
/** Collection reference for firestore. */
export declare const TARGET_COLLECTION_NAME = "operation-target";
/** Validation schema for the target collection. */
export declare const TARGET_COLLECTION_SCHEMA: CollectionSchema;
/** Join collection between target and user.  */
export declare const JOIN_TARGET_USER_COLLECTION_NAME = "join-target-user";
/** Validation schema for Join collection between target and user.  */
export declare const JOIN_TARGET_USER_COLLECTION_SCHEMA: CollectionSchema;
/** Join collection between target and team.  */
export declare const JOIN_TARGET_TEAM_COLLECTION_NAME = "join-target-team";
/** Validation schema for Join collection between target and team.  */
export declare const JOIN_TARGET_TEAM_COLLECTION_SCHEMA: CollectionSchema;
/** Join collection between target and job role.  */
export declare const JOIN_TARGET_JOB_ROLE_COLLECTION_NAME = "join-target-user";
/** Validation schema for Join collection between target and job role.  */
export declare const JOIN_TARGET_JOB_ROLE_COLLECTION_SCHEMA: CollectionSchema;
