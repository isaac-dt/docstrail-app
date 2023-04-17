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
  canWriteWith,
  isPermissionOpGte,
  setPermission,
} from "../../shared/permission/permission.data";
import {getDataParsers} from "../../shared/database/firestore-utils";
import {ProposalPermissionService} from "./proposal.permission";
import {ProposalDataService} from "./proposal.data";
import {Proposal} from "../../generated/types/trail/proposal/proposal.pb";
import {
  GetProposalResponse,
  GetShareProposalResponse,
  ListProposalResponse,
  ProposalPermission,
} from "../../generated/types/trail/proposal/proposal.api.pb";
import {
  PROPOSAL_COLLECTION_SCHEMA,
  WRITE_SHARE_PROPOSAL_REQUEST_SCHEMA,
} from "./proposal.schema";
import {UserDataService} from "../../account-module/user/user.data";

/** Controller for proposal requests. */
@Controller({
  path: "v1",
  runHttpAfter: [guard],
})
export class ProposalController {
  readonly db = getFirestore();

  constructor(
    private readonly proposalDataService: ProposalDataService,
    private readonly proposalPermissionService: ProposalPermissionService,
    private readonly userDataService: UserDataService
  ) {}

  @get({path: "id/:proposalId"})
  async getProposal(req: Request, res: Response) {
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
    const proposal = await this.proposalDataService.getProposal({
      proposalId: req.params.proposalId,
    });
    if (proposal.$type === AppError.$type) {
      const resData = buildRes({appError: proposal});
      return res.status(404).json(resData);
    }
    const response = await this.buildGetProposalResponse(proposal);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @get({path: "/list"})
  async getProposals(req: Request, res: Response) {
    const authData = AuthData.fromPartial(req.body.authData);
    const proposalsAndPermissionsOfRequestor =
      await this.proposalDataService.getProposalsOfUser({
        userId: authData.user!.id,
      });
    const user = await this.userDataService.getUser({
      userId: authData.user!.id,
    });
    const proposalPermissions = [];
    for (const proposal of proposalsAndPermissionsOfRequestor.proposals) {
      const permission = proposalsAndPermissionsOfRequestor.permissions.find(
        (permission) => permission.resourceId === proposal.id
      );
      proposalPermissions.push(
        ProposalPermission.fromPartial({
          user,
          permission,
          proposalId: proposal.id,
        })
      );
    }
    const listProposalResponse = ListProposalResponse.fromPartial({
      proposals: proposalsAndPermissionsOfRequestor.proposals,
      requestorPermissionsOnProposals:
        proposalPermissions as readonly ProposalPermission[],
      matchCount: proposalsAndPermissionsOfRequestor.proposals.length,
    });
    const resData = buildRes({data: listProposalResponse});
    return res.json(resData);
  }

  @post({path: "create"})
  async createProposal(req: Request, res: Response) {
    const authData = AuthData.fromPartial(req.body.authData);
    // Validate client inputs.
    const parser = getDataParsers({schema: PROPOSAL_COLLECTION_SCHEMA});
    const validationErrors = parser.validate(req.body);
    if (validationErrors.length) {
      const appError = AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
      const resData = buildRes({appError});
      return res.json(resData);
    }
    // Handle request.
    const proposal = await this.proposalDataService.createProposal({
      proposalData: req.body,
      userId: authData.user!.id,
    });
    if (proposal.$type === AppError.$type) {
      const appError = proposal;
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
      resource: DBEntity.PROPOSAL,
      resourceId: proposal.id,
      operation: PermissionOp.ALL,
    });
    const permission = await setPermission(permissionReq);
    if (permission.$type === AppError.$type) {
      const resData = buildRes({error: ErrorCode.UNKNOWN});
      return res.status(500).json(resData);
    }
    const response = await this.buildGetProposalResponse(proposal);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @patch({path: "id/:proposalId"})
  async updateProposalFields(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({
      schema: PROPOSAL_COLLECTION_SCHEMA,
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
    const permissionOp = await this.proposalPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.PROPOSAL,
      resourceId: req.params.proposalId,
    });
    if (!canWriteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Verify availability
    const reqProposal = await this.proposalDataService.getProposal({
      proposalId: req.params.proposalId,
    });
    if (reqProposal.$type === AppError.$type) {
      const resData = buildRes({error: ErrorCode.NOT_FOUND_IN_DB});
      return res.status(404).json(resData);
    }
    // Handle request.
    const proposal = await this.proposalDataService.updateProposalFields({
      proposalId: req.params.proposalId,
      proposalData: req.body,
    });
    if (proposal.$type === AppError.$type) {
      const appError = proposal;
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
    const response = await this.buildGetProposalResponse(proposal);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @dtDelete({path: "id/:proposalId"})
  async deleteProposal(req: Request, res: Response) {
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const permissionOp = await this.proposalPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.PROPOSAL,
      resourceId: req.params.proposalId,
    });
    if (!canDeleteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Verify availability
    const reqProposal = await this.proposalDataService.getProposal({
      proposalId: req.params.proposalId,
    });
    if (reqProposal.$type === AppError.$type) {
      const resData = buildRes({error: ErrorCode.NOT_FOUND_IN_DB});
      return res.status(404).json(resData);
    }
    // Handle request.
    const proposal = await this.proposalDataService.deleteProposal({
      proposalId: req.params.proposalId,
    });
    if (proposal.$type === AppError.$type) {
      const appError = proposal;
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
    const response = await this.buildGetProposalResponse(proposal);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @post({path: "/permission"})
  async setPermission(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({
      schema: WRITE_SHARE_PROPOSAL_REQUEST_SCHEMA,
    });
    const validationErrors = parser.validate(req.body);
    if (validationErrors.length) {
      const appError = AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
      const resData = buildRes({appError});
      return res.json(resData);
    }
    // Verify if requestor is permitted to set permission.
    const authData = AuthData.fromPartial(req.body.authData);
    const permissionOp = await this.proposalPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.PROPOSAL,
      resourceId: req.body.proposalId,
    });
    if (!canReadWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Ensure that requestor is only allowed to share up to their own permission operation.
    if (!isPermissionOpGte(permissionOp, req.body.operation)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const userAsAccessor = await this.userDataService.getUserWithEmail({
      userEmail: req.body.accessorEmail,
    });
    if (!userAsAccessor || userAsAccessor.$type === AppError.$type) {
      return res.status(404).json(userAsAccessor);
    }
    const proposal = await this.proposalDataService.getProposal({
      proposalId: req.body.proposalId,
    });
    if (proposal.$type === AppError.$type) {
      return res.status(404).json(proposal);
    }
    const newPermission = WritePermissionRequest.fromPartial({
      resource: DBEntity.PROPOSAL,
      resourceId: req.body.proposalId,
      accessor: DBEntity.USER,
      accessorId: userAsAccessor.id,
      operation: req.body.operation,
    });
    const permission = await setPermission(newPermission);
    if (permission.$type === AppError.$type) {
      const appError = permission;
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

    const response = GetShareProposalResponse.fromPartial({
      accessor: userAsAccessor,
      permission: permission,
    });
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  private async buildGetProposalResponse(
    proposal: Proposal
  ): Promise<GetProposalResponse> {
    const usersAndPermissions =
      await this.proposalDataService.getUsersOfProposal({
        proposalId: proposal.id!,
      });

    const proposalPermissions = [];
    for (const user of usersAndPermissions.users) {
      const permission = usersAndPermissions.permissions.find(
        (permission) => permission.accessorId === user.id
      );
      proposalPermissions.push(
        ProposalPermission.fromPartial({
          user,
          permission,
          proposalId: proposal.id,
        })
      );
    }

    const response = GetProposalResponse.fromPartial({
      proposal,
      allPermissionsOnProposal:
        proposalPermissions as readonly ProposalPermission[],
    });

    return response;
  }
}
