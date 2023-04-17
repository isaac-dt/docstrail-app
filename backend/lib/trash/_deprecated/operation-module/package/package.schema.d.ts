import { CollectionSchema } from "../../../shared/database/firestore-utils";
/** Package reference for firestore. */
export declare const PACKAGE_COLLECTION_NAME = "operations-package";
/** Validation schema for the packages collection. */
export declare const PACKAGE_COLLECTION_SCHEMA: CollectionSchema;
/** Join collection between package and open definition.  */
export declare const JOIN_PACKAGE_OPEN_DEF_COLLECTION_NAME = "join-package-open-definition";
/** Validation schema for Join collection between package and open definition.  */
export declare const JOIN_PACKAGE_OPEN_DEF_COLLECTION_SCHEMA: CollectionSchema;
