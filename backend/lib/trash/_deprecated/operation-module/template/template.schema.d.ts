import { CollectionSchema } from "../../../shared/database/firestore-utils";
/** Collection reference for firestore. */
export declare const TEMPLATE_COLLECTION_NAME = "operation-template";
/** Validation schema for the template collection. */
export declare const TEMPLATE_COLLECTION_SCHEMA: CollectionSchema;
/** Join collection between template and package.  */
export declare const JOIN_TEMPLATE_PACKAGE_COLLECTION_NAME = "join-template-package";
/** Validation schema for Join collection between template and package.  */
export declare const JOIN_TEMPLATE_PACKAGE_COLLECTION_SCHEMA: CollectionSchema;
/** Join collection between template and trigger.  */
export declare const JOIN_TEMPLATE_TRIGGER_COLLECTION_NAME = "join-template-trigger";
/** Validation schema for Join collection between template and trigger.  */
export declare const JOIN_TEMPLATE_TRIGGER_COLLECTION_SCHEMA: CollectionSchema;
/** Join collection between template and target.  */
export declare const JOIN_TEMPLATE_TARGET_COLLECTION_NAME = "join-template-target";
/** Validation schema for Join collection between template and target.  */
export declare const JOIN_TEMPLATE_TARGET_COLLECTION_SCHEMA: CollectionSchema;
