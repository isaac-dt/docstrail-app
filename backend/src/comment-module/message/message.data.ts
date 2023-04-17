import {Injectable} from "@dimetrail/firebase/core/utils";
import {getDataParsers} from "../../shared/database/firestore-utils";
import {getFirestore, DocumentData} from "firebase-admin/firestore";
import {AppError, ErrorCode} from "../../generated/types/common.pb";
import {getDateFromFireTimestamp} from "../../shared/utils";
import {CommentMessage} from "../../generated/types/trail/comment/message.pb";
import {
  COMMENT_MESSAGE_COLLECTION_NAME,
  COMMENT_MESSAGE_COLLECTION_SCHEMA,
  COMMENT_MESSAGE_DELETED_COLLECTION_NAME,
} from "./message.schema";
import {WriteCommentMessageRequest} from "../../generated/types/trail/comment/message-api.pb";

/**
 * Manages operations on comment message data.
 */
@Injectable()
export class CommentMessageDataService {
  readonly db = getFirestore();

  async getCommentMessage(args: {
    commentMessageId: string;
  }): Promise<CommentMessage | AppError> {
    const commentMessageSnap = await this.db
      .collection(COMMENT_MESSAGE_COLLECTION_NAME)
      .doc(args.commentMessageId)
      .get();
    const commentMessage: Partial<CommentMessage> | undefined =
      commentMessageSnap.data();
    if (!commentMessage) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {
          collection: COMMENT_MESSAGE_COLLECTION_NAME,
          id: args.commentMessageId,
        },
      });
    }
    return CommentMessage.fromPartial({
      ...commentMessage,
      id: commentMessageSnap.id,
      createdAt: getDateFromFireTimestamp(commentMessage.createdAt),
      updatedAt: getDateFromFireTimestamp(commentMessage.updatedAt),
      deletedAt: getDateFromFireTimestamp(commentMessage.deletedAt),
    });
  }

  async getCommentMessagesOfThread(args: {
    threadId: string;
  }): Promise<readonly CommentMessage[]> {
    const data = await this.db
      .collection(COMMENT_MESSAGE_COLLECTION_NAME)
      .where("commentThreadId", "==", args.threadId)
      .get();
    const commentMessages = data.docs.map((doc) =>
      CommentMessage.fromPartial({
        ...(doc.data() as Partial<CommentMessage>),
        id: doc.id,
      })
    );
    return commentMessages
      .map((message) =>
        CommentMessage.fromPartial({
          ...message,
          createdAt: getDateFromFireTimestamp(message.createdAt),
          updatedAt: getDateFromFireTimestamp(message.updatedAt),
          deletedAt: getDateFromFireTimestamp(message.deletedAt),
        })
      )
      .sort((m1: any, m2: any) => {
        return (
          new Date(m1.createdAt as Date).getTime() -
          new Date(m2.createdAt as Date).getTime()
        );
      });
  }

  async getCommentMessagesOfThreads(args: {
    threadIds: string[];
  }): Promise<readonly CommentMessage[]> {
    if (!args.threadIds.length) return [];
    const data = await this.db
      .collection(COMMENT_MESSAGE_COLLECTION_NAME)
      .where("commentThreadId", "in", args.threadIds)
      .get();
    const commentMessages = data.docs.map((doc) =>
      CommentMessage.fromPartial({
        ...(doc.data() as Partial<CommentMessage>),
        id: doc.id,
      })
    );

    return commentMessages
      .map((message) =>
        CommentMessage.fromPartial({
          ...message,
          createdAt: getDateFromFireTimestamp(message.createdAt),
          updatedAt: getDateFromFireTimestamp(message.updatedAt),
          deletedAt: getDateFromFireTimestamp(message.deletedAt),
        })
      )
      .sort((m1: any, m2: any) => {
        return (
          new Date(m1.createdAt as Date).getTime() -
          new Date(m2.createdAt as Date).getTime()
        );
      });
  }

  async createCommentMessage(args: {
    commentMessageData: WriteCommentMessageRequest;
    userId: string;
  }): Promise<CommentMessage | AppError> {
    const parser = getDataParsers({schema: COMMENT_MESSAGE_COLLECTION_SCHEMA});
    const validationErrors = parser.validate(args.commentMessageData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }

    const commentMessageDbData = CommentMessage.fromPartial({
      ...parser.sanitize(args.commentMessageData),
      createdBy: args.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const commentMessageRef = await this.db
      .collection(COMMENT_MESSAGE_COLLECTION_NAME)
      .add(commentMessageDbData as DocumentData);
    const commentMessage = await this.getCommentMessage({
      commentMessageId: commentMessageRef.id,
    });
    if (!commentMessage)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return commentMessage;
  }

  async updateCommentMessageFields(args: {
    commentMessageId: string;
    commentMessageData: WriteCommentMessageRequest;
  }): Promise<CommentMessage | AppError> {
    const commentMessage = await this.getCommentMessage({
      commentMessageId: args.commentMessageId,
    });
    if (!commentMessage) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {
          collection: COMMENT_MESSAGE_COLLECTION_NAME,
          id: args.commentMessageId,
        },
      });
    }
    const parser = getDataParsers({
      schema: COMMENT_MESSAGE_COLLECTION_SCHEMA,
      onlyFields: Object.keys(args.commentMessageData),
    });
    const validationErrors = parser.validate(args.commentMessageData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const commentMessageDbData = CommentMessage.fromPartial({
      ...parser.sanitize({
        ...args.commentMessageData,
      }),
      updatedAt: new Date(),
    });
    await this.db
      .collection(COMMENT_MESSAGE_COLLECTION_NAME)
      .doc(args.commentMessageId)
      .update(commentMessageDbData as DocumentData);
    const updatedCommentMessage = await this.getCommentMessage({
      commentMessageId: args.commentMessageId,
    });
    if (!updatedCommentMessage)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return updatedCommentMessage;
  }

  async deleteCommentMessage(args: {
    commentMessageId: string;
  }): Promise<CommentMessage | AppError> {
    const commentMessage = await this.getCommentMessage({
      commentMessageId: args.commentMessageId,
    });
    if (!commentMessage) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {
          collection: COMMENT_MESSAGE_COLLECTION_NAME,
          id: args.commentMessageId,
        },
      });
    }

    // Copy item to deletion collection.
    const commentMessageDbData = CommentMessage.fromPartial({
      ...commentMessage,
      deletedAt: new Date(),
    });
    const commentMessageCopyResult = await this.db
      .collection(COMMENT_MESSAGE_DELETED_COLLECTION_NAME)
      .doc(args.commentMessageId)
      .set(commentMessageDbData as DocumentData);
    if (!commentMessageCopyResult.writeTime) {
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    }

    // Delete item from regular collection.
    const deletionResult = await this.db
      .collection(COMMENT_MESSAGE_COLLECTION_NAME)
      .doc(args.commentMessageId)
      .delete();
    if (!deletionResult.writeTime) {
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    }

    return commentMessage;
  }
}
