import { CollectionSchema } from "../../shared/database/firestore-utils";
/** Validation schema for the user signup api. */
export declare const USER_SIGNUP_SCHEMA: CollectionSchema;
/**
 * Validation schema for the org signup api.
 * @deprecated Use {@link USER_SIGNUP_SCHEMA} instead.
 */
export declare const ORG_SIGNUP_SCHEMA: CollectionSchema;
