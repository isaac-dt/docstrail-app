import {CollectionSchema} from "../../shared/database/firestore-utils";
import validator from "validator";
import {CommentThread_Type} from "../../generated/types/trail/comment/thread.pb";

/** Collection reference for firestore. */
export const COMMENT_THREAD_COLLECTION_NAME = "comment-threads";

/** Collection reference for firestore. */
export const COMMENT_THREAD_DELETED_COLLECTION_NAME = "comment-threads-deleted";

/** Validation schema for the collection. */
export const COMMENT_THREAD_COLLECTION_SCHEMA: CollectionSchema = {
  proposalId: {
    description: "proposal id using ascii",
    pattern: validator.isAscii,
  },
  screenshot: {
    description: "price following CommentThread.GraphScreenshot proto.",
    isOptional: true,
    pattern: (screenshot: any) => {
      if (!screenshot) return true;
      const imageContainerOuterHtml = !!screenshot.imageContainerOuterHtml; // TODO: Add validity check.
      const imageContainerWidth = validator.isInt(
        "" + screenshot.imageContainerWidth
      );
      const imageContainerHeight = validator.isInt(
        "" + screenshot.imageContainerHeight
      );
      const imageOuterHtml = !!screenshot.imageOuterHtml; // TODO: Add validity check.
      const imageWidth = validator.isInt("" + screenshot.imageWidth);
      const imageHeight = validator.isInt("" + screenshot.imageHeight);
      const imageMarginLeft = validator.isInt("" + screenshot.imageMarginLeft);
      const imageMarginTop = validator.isInt("" + screenshot.imageMarginTop);
      return (
        imageContainerOuterHtml &&
        imageContainerWidth &&
        imageContainerHeight &&
        imageOuterHtml &&
        imageWidth &&
        imageHeight &&
        imageMarginLeft &&
        imageMarginTop
      );
    },
  },
  diagramXml: {
    description: "proposal diagram data in jgraph.xml format",
    pattern: (diagram: any) => !!diagram, // TODO: Add validity check.
  },
  type: {
    description: "type of comment thread, following CommentThread_Type format",
    pattern: (data: any) => {
      return Object.keys(CommentThread_Type).includes(data);
    },
  },
};
