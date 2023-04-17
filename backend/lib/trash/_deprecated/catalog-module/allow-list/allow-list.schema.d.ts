import { CollectionSchema } from "../../../shared/database/firestore-utils";
/** Collection reference for firestore. */
export declare const ALLOW_LIST_COLLECTION_NAME = "catalog-allow-lists";
/** Validation schema for the allow list collection. */
export declare const ALLOW_LIST_COLLECTION_SCHEMA: CollectionSchema;
/** Join collection between allow list and open definition.  */
export declare const JOIN_ALLOW_LIST_OPEN_DEF_COLLECTION_NAME = "join-allow-list-open-definition";
/** Validation schema for Join collection between allow list and open definition.  */
export declare const JOIN_ALLOW_LIST_OPEN_DEF_COLLECTION_SCHEMA: CollectionSchema;
