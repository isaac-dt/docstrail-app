import { CollectionSchema } from "../../shared/database/firestore-utils";
/** Collection reference for firestore. */
export declare const PROPOSAL_COLLECTION_NAME = "proposals";
/** Collection reference for firestore. */
export declare const PROPOSAL_DELETED_COLLECTION_NAME = "proposals-deleted";
/** Validation schema for the proposals collection. */
export declare const PROPOSAL_COLLECTION_SCHEMA: CollectionSchema;
/** Validation for proposal share request. */
export declare const WRITE_SHARE_PROPOSAL_REQUEST_SCHEMA: CollectionSchema;
