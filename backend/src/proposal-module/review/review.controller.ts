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
import {ProposalPermissionService} from "../../proposal-module/proposal/proposal.permission";

import {ProposalDataService} from "../../proposal-module/proposal/proposal.data";
import {UserDataService} from "../../account-module/user/user.data";
import {ProposalReviewPermissionService} from "./review.permission";
import {ProposalReviewDataService} from "./review.data";
import {PROPOSAL_REVIEW_COLLECTION_SCHEMA} from "./review.schema";
import {
  GetProposalReviewResponse,
  ListProposalReviewResponse,
} from "../../generated/types/trail/proposal/review.api.pb";
import {ProposalReview} from "../../generated/types/trail/proposal/review.pb";

/** Controller for proposal review requests. */
@Controller({
  path: "v1/review",
  runHttpAfter: [guard],
})
export class ProposalReviewController {
  readonly db = getFirestore();

  constructor(
    private readonly proposalReviewPermissionService: ProposalReviewPermissionService,
    private readonly proposalReviewDataService: ProposalReviewDataService,
    private readonly proposalPermissionService: ProposalPermissionService,
    private readonly proposalDataService: ProposalDataService,
    private readonly userDataService: UserDataService
  ) {}

  @get({path: "id/:proposalReviewId"})
  async getProposalReview(req: Request, res: Response) {
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const permissionOp =
      await this.proposalReviewPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.PROPOSAL_REVIEW,
        resourceId: req.params.proposalReviewId,
      });
    if (!canReadWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const proposalReview =
      await this.proposalReviewDataService.getProposalReview({
        proposalReviewId: req.params.proposalReviewId,
      });
    if (proposalReview.$type === AppError.$type) {
      const resData = buildRes({appError: proposalReview});
      return res.status(404).json(resData);
    }
    const response = await this.buildGetProposalReviewResponse(proposalReview);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @get({path: "/list/:proposalId"})
  async getProposalReviews(req: Request, res: Response) {
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
    const proposalReviewsOfProposal =
      await this.proposalReviewDataService.getProposalReviewsOfProposal({
        proposalId: req.params.proposalId,
      });
    const creatorIds = proposalReviewsOfProposal.map(
      (review) => review.createdBy!
    );
    const creators = creatorIds.length
      ? this.userDataService.getUsersFromIds({
          userIds: creatorIds,
        })
      : [];
    const listProposalReviewResponse = ListProposalReviewResponse.fromPartial({
      creators: await creators,
      proposalReviews: proposalReviewsOfProposal,
      matchCount: proposalReviewsOfProposal.length,
    });

    const resData = buildRes({data: listProposalReviewResponse});
    return res.json(resData);
  }

  @post({path: "/"})
  async createProposalReview(req: Request, res: Response) {
    const authData = AuthData.fromPartial(req.body.authData);
    // Validate client inputs.
    const parser = getDataParsers({schema: PROPOSAL_REVIEW_COLLECTION_SCHEMA});
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
    // Verify permission to add review to proposal.
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
    const proposalReview =
      await this.proposalReviewDataService.createProposalReview({
        proposalReviewData: req.body,
        userId: authData.user!.id,
      });
    if (proposalReview.$type === AppError.$type) {
      const appError = proposalReview;
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
      resource: DBEntity.PROPOSAL_REVIEW,
      resourceId: proposalReview.id,
      operation: PermissionOp.ALL,
    });
    const permission = await setPermission(permissionReq);
    if (permission.$type === AppError.$type) {
      const resData = buildRes({error: ErrorCode.UNKNOWN});
      return res.status(500).json(resData);
    }
    const response = await this.buildGetProposalReviewResponse(proposalReview);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @patch({path: "id/:proposalReviewId"})
  async updateProposalReviewFields(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({
      schema: PROPOSAL_REVIEW_COLLECTION_SCHEMA,
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
      await this.proposalReviewPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.PROPOSAL_REVIEW,
        resourceId: req.params.proposalReviewId,
      });
    if (!canWriteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Verify availability
    const proposalReviewFromReq =
      await this.proposalReviewDataService.getProposalReview({
        proposalReviewId: req.params.proposalReviewId,
      });
    if (proposalReviewFromReq.$type === AppError.$type) {
      const resData = buildRes({error: ErrorCode.NOT_FOUND_IN_DB});
      return res.status(404).json(resData);
    }
    // Handle request.
    const proposalReview =
      await this.proposalReviewDataService.updateProposalReviewFields({
        proposalReviewId: req.params.proposalReviewId,
        proposalReviewData: req.body,
      });
    if (proposalReview.$type === AppError.$type) {
      const appError = proposalReview;
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
    const response = await this.buildGetProposalReviewResponse(proposalReview);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @dtDelete({path: "id/:proposalReviewId"})
  async deleteProposalReview(req: Request, res: Response) {
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const permissionOp =
      await this.proposalReviewPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.PROPOSAL_REVIEW,
        resourceId: req.params.proposalReviewId,
      });
    if (!canDeleteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Verify availability
    const proposalReviewFromReq =
      await this.proposalReviewDataService.getProposalReview({
        proposalReviewId: req.params.proposalReviewId,
      });
    if (proposalReviewFromReq.$type === AppError.$type) {
      const resData = buildRes({error: ErrorCode.NOT_FOUND_IN_DB});
      return res.status(404).json(resData);
    }
    // Handle request.
    const proposalReview =
      await this.proposalReviewDataService.deleteProposalReview({
        proposalReviewId: req.params.proposalReviewId,
      });
    if (proposalReview.$type === AppError.$type) {
      const appError = proposalReview;
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
    const response = await this.buildGetProposalReviewResponse(proposalReview);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  private async buildGetProposalReviewResponse(
    proposalReview: ProposalReview
  ): Promise<GetProposalReviewResponse> {
    const proposal = this.proposalDataService.getProposal({
      proposalId: proposalReview.proposalId!,
    });
    const user = this.userDataService.getUser({
      userId: proposalReview.createdBy!,
    });

    const response = GetProposalReviewResponse.fromPartial({
      proposal: await proposal,
      creator: await user,
    });
    return response;
  }
}
