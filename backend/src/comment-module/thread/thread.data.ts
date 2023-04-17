import {Injectable} from "../../../framework/core/utils";
import {getDataParsers} from "../../shared/database/firestore-utils";
import {getFirestore, DocumentData} from "firebase-admin/firestore";
import {AppError, ErrorCode} from "../../generated/types/common.pb";
import {
  COMMENT_THREAD_COLLECTION_NAME,
  COMMENT_THREAD_COLLECTION_SCHEMA,
  COMMENT_THREAD_DELETED_COLLECTION_NAME,
} from "./thread.schema";
import {getDateFromFireTimestamp} from "../../shared/utils";
import {CommentThread} from "../../generated/types/trail/comment/thread.pb";
import {WriteCommentThreadRequest} from "../../generated/types/trail/comment/thread-api.pb";

/**
 * Manages operations on comment thread data.
 */
@Injectable()
export class CommentThreadDataService {
  readonly db = getFirestore();

  async getCommentThread(args: {
    commentThreadId: string;
  }): Promise<CommentThread | AppError> {
    const commentThreadSnap = await this.db
      .collection(COMMENT_THREAD_COLLECTION_NAME)
      .doc(args.commentThreadId)
      .get();
    const commentThread: Partial<CommentThread> | undefined =
      commentThreadSnap.data();
    if (!commentThread) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {
          collection: COMMENT_THREAD_COLLECTION_NAME,
          id: args.commentThreadId,
        },
      });
    }
    return CommentThread.fromPartial({
      ...commentThread,
      id: commentThreadSnap.id,
      createdAt: getDateFromFireTimestamp(commentThread.createdAt),
      updatedAt: getDateFromFireTimestamp(commentThread.updatedAt),
      deletedAt: getDateFromFireTimestamp(commentThread.deletedAt),
    });
  }

  async getCommentThreadsOfProposal(args: {
    proposalId: string;
  }): Promise<readonly CommentThread[]> {
    const data = await this.db
      .collection(COMMENT_THREAD_COLLECTION_NAME)
      .where("proposalId", "==", args.proposalId)
      .get();
    const commentThreads = data.docs.map((doc) =>
      CommentThread.fromPartial({
        ...(doc.data() as Partial<CommentThread>),
        id: doc.id,
      })
    );
    return commentThreads
      .map((thread) =>
        CommentThread.fromPartial({
          ...thread,
          createdAt: getDateFromFireTimestamp(thread.createdAt),
          updatedAt: getDateFromFireTimestamp(thread.updatedAt),
          deletedAt: getDateFromFireTimestamp(thread.deletedAt),
        })
      )
      .sort((t1, t2) => {
        return (
          new Date(t2.updatedAt as Date).getTime() -
          new Date(t1.updatedAt as Date).getTime()
        );
      });
  }

  async createCommentThread(args: {
    commentThreadData: WriteCommentThreadRequest;
    userId: string;
  }): Promise<CommentThread | AppError> {
    const parser = getDataParsers({schema: COMMENT_THREAD_COLLECTION_SCHEMA});
    const validationErrors = parser.validate(args.commentThreadData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }

    const commentThreadDbData = CommentThread.fromPartial({
      ...parser.sanitize(args.commentThreadData),
      createdBy: args.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const commentThreadRef = await this.db
      .collection(COMMENT_THREAD_COLLECTION_NAME)
      .add(commentThreadDbData as DocumentData);
    const commentThread = await this.getCommentThread({
      commentThreadId: commentThreadRef.id,
    });
    if (!commentThread)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return commentThread;
  }

  async updateCommentThreadFields(args: {
    commentThreadId: string;
    commentThreadData: WriteCommentThreadRequest;
  }): Promise<CommentThread | AppError> {
    const commentThread = await this.getCommentThread({
      commentThreadId: args.commentThreadId,
    });
    if (!commentThread) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {
          collection: COMMENT_THREAD_COLLECTION_NAME,
          id: args.commentThreadId,
        },
      });
    }
    const parser = getDataParsers({
      schema: COMMENT_THREAD_COLLECTION_SCHEMA,
      onlyFields: Object.keys(args.commentThreadData),
    });
    const validationErrors = parser.validate(args.commentThreadData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const commentThreadDbData = CommentThread.fromPartial({
      ...parser.sanitize({
        ...args.commentThreadData,
      }),
      updatedAt: new Date(),
    });
    await this.db
      .collection(COMMENT_THREAD_COLLECTION_NAME)
      .doc(args.commentThreadId)
      .update(commentThreadDbData as DocumentData);
    const updatedCommentThread = await this.getCommentThread({
      commentThreadId: args.commentThreadId,
    });
    if (!updatedCommentThread)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return updatedCommentThread;
  }

  async deleteCommentThread(args: {
    commentThreadId: string;
  }): Promise<CommentThread | AppError> {
    const commentThread = await this.getCommentThread({
      commentThreadId: args.commentThreadId,
    });
    if (!commentThread) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {
          collection: COMMENT_THREAD_COLLECTION_NAME,
          id: args.commentThreadId,
        },
      });
    }

    // Copy item to deletion collection.
    const commentThreadDbData = CommentThread.fromPartial({
      ...commentThread,
      deletedAt: new Date(),
    });
    const commentThreadCopyResult = await this.db
      .collection(COMMENT_THREAD_DELETED_COLLECTION_NAME)
      .doc(args.commentThreadId)
      .set(commentThreadDbData as DocumentData);
    if (!commentThreadCopyResult.writeTime) {
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    }

    // Delete item from regular collection.
    const deletionResult = await this.db
      .collection(COMMENT_THREAD_COLLECTION_NAME)
      .doc(args.commentThreadId)
      .delete();
    if (!deletionResult.writeTime) {
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    }

    return commentThread;
  }
}
