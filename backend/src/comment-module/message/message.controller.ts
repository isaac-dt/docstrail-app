import {Controller} from "../../../framework/core/utils";
import {
  get,
  patch,
  Request,
  Response,
  post,
  dtDelete,
} from "../../../framework/core/https";
import {guard} from "../../shared/authentication/auth";
import {getFirestore} from "firebase-admin/firestore";
import {AppError, AuthData, ErrorCode} from "../../generated/types/common.pb";
import {
  DBEntity,
  PermissionOp,
  WritePermissionRequest,
} from "../../generated/types/permission.pb";
import {buildRes} from "../../shared/https/response";
import {
  canDeleteWith,
  canReadWith,
  canReviewWith,
  canWriteWith,
  setPermission,
} from "../../shared/permission/permission.data";
import {getDataParsers} from "../../shared/database/firestore-utils";
import {CommentMessageDataService} from "./message.data";
import {CommentMessagePermissionService} from "./message.permission";
import {
  GetCommentMessageResponse,
  ListCommentMessageResponse,
} from "../../generated/types/trail/comment/message-api.pb";
import {CommentMessage} from "../../generated/types/trail/comment/message.pb";
import {CommentThreadPermissionService} from "../thread/thread.permission";
import {COMMENT_MESSAGE_COLLECTION_SCHEMA} from "./message.schema";
import {CommentThreadDataService} from "../thread/thread.data";
import {UserDataService} from "../../account-module/user/user.data";

/** Controller for comment message requests. */
@Controller({
  path: "v1/message",
  runHttpAfter: [guard],
})
export class CommentMessageController {
  readonly db = getFirestore();

  constructor(
    private readonly commentMessageDataService: CommentMessageDataService,
    private readonly commentMessagePermissionService: CommentMessagePermissionService,
    private readonly commentThreadPermissionService: CommentThreadPermissionService,
    private readonly commentThreadDataService: CommentThreadDataService,
    private readonly userDataService: UserDataService
  ) {}

  @get({path: "id/:commentMessageId"})
  async getCommentMessage(req: Request, res: Response) {
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const permissionOp =
      await this.commentMessagePermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.COMMENT_MESSAGE,
        resourceId: req.params.commentMessageId,
      });
    if (!canReadWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const commentMessage =
      await this.commentMessageDataService.getCommentMessage({
        commentMessageId: req.params.commentMessageId,
      });
    if (commentMessage.$type === AppError.$type) {
      const resData = buildRes({appError: commentMessage});
      return res.status(404).json(resData);
    }
    const response = await this.buildGetCommentMessageResponse(commentMessage);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @get({path: "/list/:commentThreadId"})
  async getCommentMessages(req: Request, res: Response) {
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const permissionOp =
      await this.commentThreadPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.COMMENT_THREAD,
        resourceId: req.params.commentThreadId,
      });
    if (!canReadWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const commentMessagesOfThread =
      await this.commentMessageDataService.getCommentMessagesOfThread({
        threadId: req.params.commentThreadId,
      });
    const creatorIds = commentMessagesOfThread.map(
      (message) => message.createdBy!
    );
    const creators = creatorIds.length
      ? this.userDataService.getUsersFromIds({
          userIds: creatorIds,
        })
      : [];
    const listCommentMessageResponse = ListCommentMessageResponse.fromPartial({
      creators: await creators,
      commentMessages: commentMessagesOfThread,
      matchCount: commentMessagesOfThread.length,
    });

    const resData = buildRes({data: listCommentMessageResponse});
    return res.json(resData);
  }

  @post({path: "/"})
  async createCommentMessage(req: Request, res: Response) {
    const authData = AuthData.fromPartial(req.body.authData);
    // Validate client inputs.
    const parser = getDataParsers({schema: COMMENT_MESSAGE_COLLECTION_SCHEMA});
    const validationErrors = parser.validate(req.body);
    if (validationErrors.length) {
      const appError = AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
      const resData = buildRes({appError});
      return res.json(resData);
    }
    // Verify availability.
    const commentThreadFromReq =
      await this.commentThreadDataService.getCommentThread({
        commentThreadId: req.body.commentThreadId,
      });
    if (commentThreadFromReq.$type === AppError.$type) {
      const resData = buildRes({error: commentThreadFromReq.errorCode});
      return res.status(404).json(resData);
    }
    // Verify permission to add thread to proposal.
    const permissionOp =
      await this.commentThreadPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.COMMENT_THREAD,
        resourceId: req.body.commentThreadId,
      });
    if (!canReviewWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const commentMessage =
      await this.commentMessageDataService.createCommentMessage({
        commentMessageData: req.body,
        userId: authData.user!.id,
      });
    if (commentMessage.$type === AppError.$type) {
      const appError = commentMessage;
      switch (appError.errorCode) {
        case ErrorCode.INVALID_DATA: {
          const resData = buildRes({appError});
          return res.status(400).json(resData);
        }
        case ErrorCode.NOT_FOUND_IN_DB: {
          const resData = buildRes({appError});
          return res.status(404).json(resData);
        }
        default: {
          const resData = buildRes({error: ErrorCode.UNKNOWN});
          return res.status(500).json(resData);
        }
      }
    }
    // Set permission.
    const permissionReq = WritePermissionRequest.fromPartial({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.COMMENT_MESSAGE,
      resourceId: commentMessage.id,
      operation: PermissionOp.ALL,
    });
    const permission = await setPermission(permissionReq);
    if (permission.$type === AppError.$type) {
      const resData = buildRes({error: ErrorCode.UNKNOWN});
      return res.status(500).json(resData);
    }
    const response = await this.buildGetCommentMessageResponse(commentMessage);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @patch({path: "id/:commentMessageId"})
  async updateCommentMessageFields(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({
      schema: COMMENT_MESSAGE_COLLECTION_SCHEMA,
      onlyFields: Object.keys(req.body),
    });
    const validationErrors = parser.validate(req.body);
    if (validationErrors.length) {
      const appError = AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
      const resData = buildRes({appError});
      return res.status(400).json(resData);
    }
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const permissionOp =
      await this.commentMessagePermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.COMMENT_MESSAGE,
        resourceId: req.params.commentMessageId,
      });
    if (!canWriteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Verify availability
    const commentMessageFromReq =
      await this.commentMessageDataService.getCommentMessage({
        commentMessageId: req.params.commentMessageId,
      });
    if (commentMessageFromReq.$type === AppError.$type) {
      const resData = buildRes({error: ErrorCode.NOT_FOUND_IN_DB});
      return res.status(404).json(resData);
    }
    // Handle request.
    const commentMessage =
      await this.commentMessageDataService.updateCommentMessageFields({
        commentMessageId: req.params.commentMessageId,
        commentMessageData: req.body,
      });
    if (commentMessage.$type === AppError.$type) {
      const appError = commentMessage;
      switch (appError.errorCode) {
        case ErrorCode.NOT_FOUND_IN_DB: {
          const resData = buildRes({error: ErrorCode.NOT_FOUND_IN_DB});
          return res.status(404).json(resData);
        }
        case ErrorCode.INVALID_DATA: {
          const resData = buildRes({appError});
          return res.status(400).json(resData);
        }
        default: {
          const resData = buildRes({error: ErrorCode.UNKNOWN});
          return res.status(500).json(resData);
        }
      }
    }
    const response = await this.buildGetCommentMessageResponse(commentMessage);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @dtDelete({path: "id/:commentMessageId"})
  async deleteCommentMessage(req: Request, res: Response) {
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const permissionOp =
      await this.commentMessagePermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.COMMENT_MESSAGE,
        resourceId: req.params.commentMessageId,
      });
    if (!canDeleteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Verify availability
    const commentMessageFromReq =
      await this.commentMessageDataService.getCommentMessage({
        commentMessageId: req.params.commentMessageId,
      });
    if (commentMessageFromReq.$type === AppError.$type) {
      const resData = buildRes({error: ErrorCode.NOT_FOUND_IN_DB});
      return res.status(404).json(resData);
    }
    // Handle request.
    const commentMessage =
      await this.commentMessageDataService.deleteCommentMessage({
        commentMessageId: req.params.commentMessageId,
      });
    if (commentMessage.$type === AppError.$type) {
      const appError = commentMessage;
      switch (appError.errorCode) {
        case ErrorCode.NOT_FOUND_IN_DB: {
          const resData = buildRes({error: ErrorCode.NOT_FOUND_IN_DB});
          return res.status(404).json(resData);
        }
        case ErrorCode.INVALID_DATA: {
          const resData = buildRes({appError});
          return res.status(400).json(resData);
        }
        default: {
          const resData = buildRes({error: ErrorCode.UNKNOWN});
          return res.status(500).json(resData);
        }
      }
    }
    const response = await this.buildGetCommentMessageResponse(commentMessage);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  private async buildGetCommentMessageResponse(
    commentMessage: CommentMessage
  ): Promise<GetCommentMessageResponse> {
    const commentThread = this.commentThreadDataService.getCommentThread({
      commentThreadId: commentMessage.commentThreadId!,
    });
    const creator = this.userDataService.getUser({
      userId: commentMessage.createdBy!,
    });
    const response = GetCommentMessageResponse.fromPartial({
      creator: await creator,
      commentThread: await commentThread,
      commentMessage,
    });
    return response;
  }
}
