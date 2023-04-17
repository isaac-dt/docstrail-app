import { AppError } from "../../generated/types/common.pb";
import { CommentThread } from "../../generated/types/trail/comment/thread.pb";
import { WriteCommentThreadRequest } from "../../generated/types/trail/comment/thread-api.pb";
/**
 * Manages operations on comment thread data.
 */
export declare class CommentThreadDataService {
    readonly db: FirebaseFirestore.Firestore;
    getCommentThread(args: {
        commentThreadId: string;
    }): Promise<CommentThread | AppError>;
    getCommentThreadsOfProposal(args: {
        proposalId: string;
    }): Promise<readonly CommentThread[]>;
    createCommentThread(args: {
        commentThreadData: WriteCommentThreadRequest;
        userId: string;
    }): Promise<CommentThread | AppError>;
    updateCommentThreadFields(args: {
        commentThreadId: string;
        commentThreadData: WriteCommentThreadRequest;
    }): Promise<CommentThread | AppError>;
    deleteCommentThread(args: {
        commentThreadId: string;
    }): Promise<CommentThread | AppError>;
}
