import {Controller} from "@dimetrail/firebase/core/utils";
import {
  get,
  patch,
  Request,
  Response,
  post,
  dtDelete,
} from "@dimetrail/firebase/core/https";
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
import {CommentMessageDataService} from "../message/message.data";
import {CommentThreadPermissionService} from "./thread.permission";
import {CommentThreadDataService} from "./thread.data";
import {CommentThread} from "../../generated/types/trail/comment/thread.pb";
import {ProposalPermissionService} from "../../proposal-module/proposal/proposal.permission";
import {
  GetCommentThreadResponse,
  ListCommentThreadResponse,
} from "../../generated/types/trail/comment/thread-api.pb";
import {COMMENT_THREAD_COLLECTION_SCHEMA} from "./thread.schema";
import {ProposalDataService} from "../../proposal-module/proposal/proposal.data";
import {UserDataService} from "../../account-module/user/user.data";

/** Controller for comment thread requests. */
@Controller({
  path: "v1/thread",
  runHttpAfter: [guard],
})
export class CommentThreadController {
  readonly db = getFirestore();

  constructor(
    private readonly commentMessageDataService: CommentMessageDataService,
    private readonly commentThreadPermissionService: CommentThreadPermissionService,
    private readonly commentThreadDataService: CommentThreadDataService,
    private readonly proposalPermissionService: ProposalPermissionService,
    private readonly proposalDataService: ProposalDataService,
    private readonly userDataService: UserDataService
  ) {}

  @get({path: "id/:commentThreadId"})
  async getCommentThread(req: Request, res: Response) {
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
    const commentThread = await this.commentThreadDataService.getCommentThread({
      commentThreadId: req.params.commentThreadId,
    });
    if (commentThread.$type === AppError.$type) {
      const resData = buildRes({appError: commentThread});
      return res.status(404).json(resData);
    }
    const response = await this.buildGetCommentThreadResponse(commentThread);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @get({path: "/list/:proposalId"})
  async getCommentThreads(req: Request, res: Response) {
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const permissionOp = await this.proposalPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.PROPOSAL,
      resourceId: req.params.proposalId,
    });
    if (!canReadWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const commentThreadsOfProposal =
      await this.commentThreadDataService.getCommentThreadsOfProposal({
        proposalId: req.params.proposalId,
      });
    const creatorIds = commentThreadsOfProposal.map(
      (thread) => thread.createdBy!
    );
    const creators = creatorIds.length
      ? this.userDataService.getUsersFromIds({
          userIds: creatorIds,
        })
      : [];
    const commentMessagesOfThreads =
      this.commentMessageDataService.getCommentMessagesOfThreads({
        threadIds: commentThreadsOfProposal.map((thread) => thread.id!),
      });
    const listCommentThreadResponse = ListCommentThreadResponse.fromPartial({
      creators: await creators,
      commentMessagesOfThreads: await commentMessagesOfThreads,
      commentThreads: commentThreadsOfProposal,
      matchCount: commentThreadsOfProposal.length,
    });

    const resData = buildRes({data: listCommentThreadResponse});
    return res.json(resData);
  }

  @post({path: "/"})
  async createCommentThread(req: Request, res: Response) {
    const authData = AuthData.fromPartial(req.body.authData);
    // Validate client inputs.
    const parser = getDataParsers({schema: COMMENT_THREAD_COLLECTION_SCHEMA});
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
    const proposalFromReq = await this.proposalDataService.getProposal({
      proposalId: req.body.proposalId,
    });
    if (proposalFromReq.$type === AppError.$type) {
      const resData = buildRes({error: proposalFromReq.errorCode});
      return res.status(404).json(resData);
    }
    // Verify permission to add thread to proposal.
    const permissionOp = await this.proposalPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.PROPOSAL,
      resourceId: req.body.proposalId,
    });
    if (!canReviewWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const commentThread =
      await this.commentThreadDataService.createCommentThread({
        commentThreadData: req.body,
        userId: authData.user!.id,
      });
    if (commentThread.$type === AppError.$type) {
      const appError = commentThread;
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
      resource: DBEntity.COMMENT_THREAD,
      resourceId: commentThread.id,
      operation: PermissionOp.ALL,
    });
    const permission = await setPermission(permissionReq);
    if (permission.$type === AppError.$type) {
      const resData = buildRes({error: ErrorCode.UNKNOWN});
      return res.status(500).json(resData);
    }
    const response = await this.buildGetCommentThreadResponse(commentThread);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @patch({path: "id/:commentThreadId"})
  async updateCommentThreadFields(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({
      schema: COMMENT_THREAD_COLLECTION_SCHEMA,
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
      await this.commentThreadPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.COMMENT_THREAD,
        resourceId: req.params.commentThreadId,
      });
    if (!canWriteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Verify availability
    const commentThreadFromReq =
      await this.commentThreadDataService.getCommentThread({
        commentThreadId: req.params.commentThreadId,
      });
    if (commentThreadFromReq.$type === AppError.$type) {
      const resData = buildRes({error: ErrorCode.NOT_FOUND_IN_DB});
      return res.status(404).json(resData);
    }
    // Handle request.
    const commentThread =
      await this.commentThreadDataService.updateCommentThreadFields({
        commentThreadId: req.params.commentThreadId,
        commentThreadData: req.body,
      });
    if (commentThread.$type === AppError.$type) {
      const appError = commentThread;
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
    const response = await this.buildGetCommentThreadResponse(commentThread);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @dtDelete({path: "id/:commentThreadId"})
  async deleteCommentThread(req: Request, res: Response) {
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const permissionOp =
      await this.commentThreadPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.COMMENT_THREAD,
        resourceId: req.params.commentThreadId,
      });
    if (!canDeleteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Verify availability
    const commentThreadFromReq =
      await this.commentThreadDataService.getCommentThread({
        commentThreadId: req.params.commentThreadId,
      });
    if (commentThreadFromReq.$type === AppError.$type) {
      const resData = buildRes({error: ErrorCode.NOT_FOUND_IN_DB});
      return res.status(404).json(resData);
    }
    // Handle request.
    const commentThread =
      await this.commentThreadDataService.deleteCommentThread({
        commentThreadId: req.params.commentThreadId,
      });
    if (commentThread.$type === AppError.$type) {
      const appError = commentThread;
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
    const response = await this.buildGetCommentThreadResponse(commentThread);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  private async buildGetCommentThreadResponse(
    commentThread: CommentThread
  ): Promise<GetCommentThreadResponse> {
    const proposal = this.proposalDataService.getProposal({
      proposalId: commentThread.proposalId!,
    });
    const commentMessages =
      this.commentMessageDataService.getCommentMessagesOfThread({
        threadId: commentThread.proposalId!,
      });
    const creator = this.userDataService.getUser({
      userId: commentThread.createdBy!,
    });

    const response = GetCommentThreadResponse.fromPartial({
      proposal: await proposal,
      commentMessages: await commentMessages,
      creator: await creator,
      commentThread,
    });
    return response;
  }
}
