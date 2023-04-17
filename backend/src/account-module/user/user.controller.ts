import {Controller} from "../../../framework/core/utils";
import {
  get,
  put,
  patch,
  Request,
  Response,
  dtDelete,
} from "../../../framework/core/https";
import {guard} from "../../shared/authentication/auth";
import {getFirestore} from "firebase-admin/firestore";
import {AppError, AuthData, ErrorCode} from "../../generated/types/common.pb";
import {UserPermissionService} from "./user.permission";
import {UserDataService} from "./user.data";
import {DBEntity, PermissionOp} from "../../generated/types/permission.pb";
import {TeamPermissionService} from "../team/team.permission";
import {TeamDataService} from "../team/team.data";
import {GetUserResponse} from "../../generated/types/account/user/user.api.pb";
import {User} from "../../generated/types/account/user/user.pb";
import {buildRes} from "../../shared/https/response";
import {
  buildGetPermissionResponse,
  canReadWith,
  canWriteWith,
  isPermissionOpGte,
  setPermission,
} from "../../shared/permission/permission.data";
import {getDataParsers} from "../../shared/database/firestore-utils";
import {
  JOIN_USER_JOB_ROLE_COLLECTION_SCHEMA,
  USER_COLLECTION_SCHEMA,
} from "./user.schema";
import {PERMISSION_COLLECTION_SCHEMA} from "../../shared/permission/permission.schema";
import {JoinUserJobRoleRequest} from "../../generated/types/join/user-job-role.pb";
import {RootPermissionService} from "../root/root.permission";
import {ClientPermissionService} from "../client/client.permission";
import {JobRolePermissionService} from "../job-role/job-role.permission";
import {JobRoleDataService} from "../job-role/job-role.data";

/** Controller for User requests. */
@Controller({
  path: "user",
  runHttpAfter: [guard],
})
export class UserController {
  readonly db = getFirestore();

  constructor(
    private readonly userDataService: UserDataService,
    private readonly userPermissionService: UserPermissionService,
    private readonly teamPermissionService: TeamPermissionService,
    private readonly teamDataService: TeamDataService,
    private readonly jobRoleDataService: JobRoleDataService,
    private readonly rootPermissionService: RootPermissionService,
    private readonly clientPermissionService: ClientPermissionService,
    private readonly jobRolePermissionService: JobRolePermissionService
  ) {}

  @get({path: "/:userId"})
  async getUser(req: Request, res: Response) {
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const permissionOp = await this.userPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.USER,
      resourceId: req.params.userId,
    });

    if (!canReadWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const user = await this.userDataService.getUser({
      userId: req.params.userId,
    });
    if (user.$type === AppError.$type) {
      const resData = buildRes({appError: user});
      return res.status(404).json(resData);
    }
    const response = await this.buildGetUserResponse(user);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  /** Requires that a userId be already created via Firebase auth. */
  @put({path: "add/:userId"})
  async createOrReplaceUser(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({schema: USER_COLLECTION_SCHEMA});
    const validationErrors = parser.validate(req.body);
    if (validationErrors.length) {
      const appError = AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
      const resData = buildRes({appError});
      return res.json(resData);
    }
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const targetTeam = await this.teamDataService.getTeam({
      teamId: req.body.teamId,
    });
    if (targetTeam.$type === AppError.$type) {
      const resData = buildRes({appError: targetTeam});
      return res.status(404).json(resData);
    }
    const permissionOp = await this.teamPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.TEAM,
      resourceId: targetTeam.id,
    });
    if (!canWriteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const user = await this.userDataService.createOrReplaceUser({
      id: req.params.userId,
      userData: req.body,
    });
    if (user.$type === AppError.$type) {
      const appError = user;
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
    const response = await this.buildGetUserResponse(user);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @patch({path: "/:userId"})
  async updateUserFields(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({
      schema: USER_COLLECTION_SCHEMA,
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
    const targetUser = await this.userDataService.getUser({
      userId: req.params.userId,
    });
    if (targetUser.$type === AppError.$type) {
      const resData = buildRes({appError: targetUser});
      return res.status(404).json(resData);
    }
    const permissionOps = await this.userPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.USER,
      resourceId: targetUser.id,
    });
    if (!canWriteWith(permissionOps)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const user = await this.userDataService.updateUserFields({
      id: req.params.userId,
      userData: req.body,
    });
    if (user.$type === AppError.$type) {
      const appError = user;
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
    const response = await this.buildGetUserResponse(user);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @put({path: "/job-role"})
  async addJobRole(req: Request, res: Response) {
    const writeJoinReq = JoinUserJobRoleRequest.fromPartial(req.body);
    // Validate client inputs.
    const parser = getDataParsers({
      schema: JOIN_USER_JOB_ROLE_COLLECTION_SCHEMA,
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
    // Verify if request is Permitted to set permission.
    const authData = AuthData.fromPartial(req.body.authData);
    const userPermissionOp = await this.userPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.USER,
      resourceId: writeJoinReq.userId,
    });
    const jobRole = await this.jobRoleDataService.getJobRole({
      jobRoleId: writeJoinReq.jobRoleId,
    });
    if (jobRole.$type === AppError.$type) {
      const resData = buildRes({appError: jobRole});
      return res.status(404).json(resData);
    }
    let jobRolePermissionOp: PermissionOp = PermissionOp.NONE;
    if (jobRole.parent?.$case === "rootId") {
      jobRolePermissionOp = await this.rootPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.ROOT,
        resourceId: jobRole.parent.rootId,
      });
    }
    if (jobRole.parent?.$case === "clientId") {
      jobRolePermissionOp = await this.clientPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.CLIENT,
        resourceId: jobRole.parent.clientId,
      });
    }
    if (!canWriteWith(userPermissionOp) || !canWriteWith(jobRolePermissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const response = await this.userDataService.addJobRoleToUser(writeJoinReq);
    if (response.$type === AppError.$type) {
      const resData = buildRes({error: ErrorCode.UNKNOWN});
      return res.status(500).json(resData);
    }
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @dtDelete({path: "/job-role/:userId/:jobRoleId"})
  async deleteJobRole(req: Request, res: Response) {
    const deleteJoinReq = JoinUserJobRoleRequest.fromPartial({
      userId: req.params.userId,
      jobRoleId: req.params.jobRoleId,
    });
    // Verify if request is Permitted to set permission.
    const authData = AuthData.fromPartial(req.body.authData);
    const userPermissionOp = await this.userPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.USER,
      resourceId: deleteJoinReq.userId,
    });
    const jobRole = await this.jobRoleDataService.getJobRole({
      jobRoleId: deleteJoinReq.jobRoleId,
    });
    if (jobRole.$type === AppError.$type) {
      const resData = buildRes({appError: jobRole});
      return res.status(404).json(resData);
    }
    const jobRolePermissionOp =
      await this.jobRolePermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.JOB_ROLE,
        resourceId: deleteJoinReq.jobRoleId,
      });

    if (!canWriteWith(userPermissionOp) || !canReadWith(jobRolePermissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const response = await this.userDataService.deleteJobRoleFromUser(
      deleteJoinReq
    );
    if (response instanceof Date) {
      const resData = buildRes({data: {deletedAt: response}});
      return res.json(resData);
    }
    const resData = buildRes({error: ErrorCode.UNKNOWN});
    return res.status(500).json(resData);
  }

  @put({path: "/permission"})
  async shareAccess(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({schema: PERMISSION_COLLECTION_SCHEMA});
    const validationErrors = parser.validate(req.body);
    if (validationErrors.length) {
      const appError = AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
      const resData = buildRes({appError});
      return res.json(resData);
    }
    // Verify if request is Permitted to set permission.
    const authData = AuthData.fromPartial(req.body.authData);
    const permissionOp = await this.userPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.USER,
      resourceId: req.body.resourceId,
    });
    if (!canWriteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Ensure that requestor is only allowed to share up to their own permission operation.
    if (!isPermissionOpGte(permissionOp, req.body.operation)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const permission = await setPermission(req.body);
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
    const response = await buildGetPermissionResponse(permission);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  private async buildGetUserResponse(user: User): Promise<GetUserResponse> {
    // const addresses = this.userDataService.getAddresses({
    //   userId: user.id,
    // });
    // const jobRoles = this.userDataService.getJobRoles({
    //   userId: user.id,
    // });
    // const team = this.teamDataService.getTeam({teamId: user.teamId});
    // const client = this.clientDataService.getClientOfTeam({
    //   teamId: user.teamId,
    // });

    return GetUserResponse.fromPartial({
      user,
      // team: await team,
      // client: await client,
      // addresses: await addresses,
      // jobRoles: await jobRoles,
    });
  }
}
