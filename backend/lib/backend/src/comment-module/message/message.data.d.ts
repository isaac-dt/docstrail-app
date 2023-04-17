import { AppError } from "../../generated/types/common.pb";
import { CommentMessage } from "../../generated/types/trail/comment/message.pb";
import { WriteCommentMessageRequest } from "../../generated/types/trail/comment/message-api.pb";
/**
 * Manages operations on comment message data.
 */
export declare class CommentMessageDataService {
    readonly db: FirebaseFirestore.Firestore;
    getCommentMessage(args: {
        commentMessageId: string;
    }): Promise<CommentMessage | AppError>;
    getCommentMessagesOfThread(args: {
        threadId: string;
    }): Promise<readonly CommentMessage[]>;
    getCommentMessagesOfThreads(args: {
        threadIds: string[];
    }): Promise<readonly CommentMessage[]>;
    createCommentMessage(args: {
        commentMessageData: WriteCommentMessageRequest;
        userId: string;
    }): Promise<CommentMessage | AppError>;
    updateCommentMessageFields(args: {
        commentMessageId: string;
        commentMessageData: WriteCommentMessageRequest;
    }): Promise<CommentMessage | AppError>;
    deleteCommentMessage(args: {
        commentMessageId: string;
    }): Promise<CommentMessage | AppError>;
}
