import {CollectionSchema} from "../../shared/database/firestore-utils";
import validator from "validator";

/** Collection reference for firestore. */
export const COMMENT_MESSAGE_COLLECTION_NAME = "comment-messages";

/** Collection reference for firestore. */
export const COMMENT_MESSAGE_DELETED_COLLECTION_NAME =
  "comment-messages-deleted";

/** Validation schema for the collection. */
export const COMMENT_MESSAGE_COLLECTION_SCHEMA: CollectionSchema = {
  commentThreadId: {
    description: "thread id using ascii",
    pattern: validator.isAscii,
  },
  text: {
    description: "message to add to a thread",
    pattern: validator.isAscii,
  },
};
