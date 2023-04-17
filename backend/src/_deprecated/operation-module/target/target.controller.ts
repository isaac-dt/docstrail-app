import {Controller} from "@dimetrail/firebase/core/utils";
import {
  get,
  put,
  patch,
  Request,
  Response,
  post,
  dtDelete,
} from "@dimetrail/firebase/core/https";
import {guard} from "../../../shared/authentication/auth";
import {getFirestore} from "firebase-admin/firestore";
import {
  AppError,
  AuthData,
  ErrorCode,
} from "../../../generated/types/common.pb";
import {DBEntity} from "../../../generated/types/permission.pb";
import {buildRes} from "../../../shared/https/response";
import {
  buildGetPermissionResponse,
  canReadWith,
  canWriteWith,
  isPermissionOpGte,
  setPermission,
} from "../../../shared/permission/permission.data";
import {getDataParsers} from "../../../shared/database/firestore-utils";
import {PERMISSION_COLLECTION_SCHEMA} from "../../../shared/permission/permission.schema";
import {TargetDataService} from "./target.data";
import {TargetPermissionService} from "./target.permission";
import {ClientDataService} from "../../../account-module/client/client.data";
import {ClientPermissionService} from "../../../account-module/client/client.permission";
import {GetTargetResponse} from "../../../generated/types/operation/target/target.api.pb";
import {Target} from "../../../generated/types/operation/target/target.pb";
import {
  JOIN_TARGET_JOB_ROLE_COLLECTION_SCHEMA,
  JOIN_TARGET_TEAM_COLLECTION_SCHEMA,
  JOIN_TARGET_USER_COLLECTION_SCHEMA,
  TARGET_COLLECTION_SCHEMA,
} from "./target.schema";
import {JoinTargetUserRequest} from "../../../generated/types/join/target-user.pb";
import {UserDataService} from "../../../account-module/user/user.data";
import {TeamDataService} from "../../../account-module/team/team.data";
import {UserPermissionService} from "../../../account-module/user/user.permission";
import {TeamPermissionService} from "../../../account-module/team/team.permission";
import {JobRoleDataService} from "../../../account-module/job-role/job-role.data";
import {JobRolePermissionService} from "../../../account-module/job-role/job-role.permission";
import {JoinTargetTeamRequest} from "../../../generated/types/join/target-team.pb";
import {JoinTargetJobRoleRequest} from "../../../generated/types/join/target-job-role.pb";
import {User} from "../../../generated/types/account/user/user.pb";

/** Controller for Target requests. */
@Controller({
  path: "target",
  runHttpAfter: [guard],
})
export class TargetController {
  readonly db = getFirestore();

  constructor(
    private readonly targetDataService: TargetDataService,
    private readonly targetPermissionService: TargetPermissionService,
    private readonly clientDataService: ClientDataService,
    private readonly clientPermissionService: ClientPermissionService,
    private readonly userDataService: UserDataService,
    private readonly userPermissionService: UserPermissionService,
    private readonly teamDataService: TeamDataService,
    private readonly teamPermissionService: TeamPermissionService,
    private readonly jobRolePermissionService: JobRolePermissionService,
    private readonly jobRoleDataService: JobRoleDataService
  ) {}

  @get({path: "/:targetId"})
  async getTarget(req: Request, res: Response) {
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const permissionOp = await this.targetPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.TARGET,
      resourceId: req.params.targetId,
    });
    if (!canReadWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const target = await this.targetDataService.getTarget({
      targetId: req.params.targetId,
    });
    if (target.$type === AppError.$type) {
      const resData = buildRes({appError: target});
      return res.status(404).json(resData);
    }
    const response = await this.buildGetTargetResponse(target);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @post({path: "/"})
  async createTarget(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({schema: TARGET_COLLECTION_SCHEMA});
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
    const parentAsclient = await this.clientDataService.getClient({
      clientId: req.body.clientId,
    });
    if (parentAsclient.$type === AppError.$type) {
      const resData = buildRes({appError: parentAsclient});
      return res.status(404).json(resData);
    }
    const permissionOp = await this.clientPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.CLIENT,
      resourceId: parentAsclient.id,
    });
    if (!canWriteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const target = await this.targetDataService.createTarget({
      targetData: req.body,
    });
    if (target.$type === AppError.$type) {
      const appError = target;
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
    const response = await this.buildGetTargetResponse(target);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @patch({path: "/:targetId"})
  async updateTargetFields(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({
      schema: TARGET_COLLECTION_SCHEMA,
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
    const targetFound = await this.targetDataService.getTarget({
      targetId: req.params.targetId,
    });
    if (targetFound.$type === AppError.$type) {
      const resData = buildRes({appError: targetFound});
      return res.status(404).json(resData);
    }
    const permissionOp = await this.targetPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.TARGET,
      resourceId: targetFound.id,
    });
    if (!canWriteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const target = await this.targetDataService.updateTargetFields({
      targetId: req.params.targetId,
      targetData: req.body,
    });
    if (target.$type === AppError.$type) {
      const appError = target;
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
    const response = this.buildGetTargetResponse(target);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @put({path: "/user"})
  async addUser(req: Request, res: Response) {
    const writeJoinReq = JoinTargetUserRequest.fromPartial(req.body);
    // Validate client inputs.
    const parser = getDataParsers({
      schema: JOIN_TARGET_USER_COLLECTION_SCHEMA,
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
    const targetPermissionOp =
      await this.targetPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.TARGET,
        resourceId: writeJoinReq.targetId,
      });
    const user = await this.userDataService.getUser({
      userId: writeJoinReq.userId,
    });
    if (user.$type === AppError.$type) {
      const resData = buildRes({appError: user});
      return res.status(404).json(resData);
    }
    const userPermissionOp = await this.userPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.USER,
      resourceId: writeJoinReq.userId,
    });

    if (!canWriteWith(targetPermissionOp) || !canWriteWith(userPermissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const response = await this.targetDataService.addUserToTarget(writeJoinReq);
    if (response.$type === AppError.$type) {
      const resData = buildRes({error: ErrorCode.UNKNOWN});
      return res.status(500).json(resData);
    }
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @dtDelete({path: "/user/:targetId/:userId"})
  async deleteUser(req: Request, res: Response) {
    const deleteJoinReq = JoinTargetUserRequest.fromPartial({
      targetId: req.params.targetId,
      userId: req.params.userId,
    });
    // Verify if request is Permitted to set permission.
    const authData = AuthData.fromPartial(req.body.authData);
    const targetPermissionOp =
      await this.targetPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.TARGET,
        resourceId: deleteJoinReq.targetId,
      });
    const user = await this.userDataService.getUser({
      userId: deleteJoinReq.userId,
    });
    if (user.$type === AppError.$type) {
      const resData = buildRes({appError: user});
      return res.status(404).json(resData);
    }
    const userPermissionOp = await this.userPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.USER,
      resourceId: deleteJoinReq.userId,
    });

    if (!canWriteWith(targetPermissionOp) || !canReadWith(userPermissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const response = await this.targetDataService.deleteUserFromTarget(
      deleteJoinReq
    );
    if (response instanceof Date) {
      const resData = buildRes({data: {deletedAt: response}});
      return res.json(resData);
    }
    const resData = buildRes({error: ErrorCode.UNKNOWN});
    return res.status(500).json(resData);
  }

  @put({path: "/team"})
  async addTeam(req: Request, res: Response) {
    const writeJoinReq = JoinTargetTeamRequest.fromPartial(req.body);
    // Validate client inputs.
    const parser = getDataParsers({
      schema: JOIN_TARGET_TEAM_COLLECTION_SCHEMA,
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
    const targetPermissionOp =
      await this.targetPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.TARGET,
        resourceId: writeJoinReq.targetId,
      });
    const team = await this.teamDataService.getTeam({
      teamId: writeJoinReq.teamId,
    });
    if (team.$type === AppError.$type) {
      const resData = buildRes({appError: team});
      return res.status(404).json(resData);
    }
    const teamPermissionOp = await this.teamPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.TEAM,
      resourceId: writeJoinReq.teamId,
    });

    if (!canWriteWith(targetPermissionOp) || !canWriteWith(teamPermissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const response = await this.targetDataService.addTeamToTarget(writeJoinReq);
    if (response.$type === AppError.$type) {
      const resData = buildRes({error: ErrorCode.UNKNOWN});
      return res.status(500).json(resData);
    }
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @dtDelete({path: "/team/:targetId/:teamId"})
  async deleteTeam(req: Request, res: Response) {
    const deleteJoinReq = JoinTargetTeamRequest.fromPartial({
      targetId: req.params.targetId,
      teamId: req.params.teamId,
    });
    // Verify if request is Permitted to set permission.
    const authData = AuthData.fromPartial(req.body.authData);
    const targetPermissionOp =
      await this.targetPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.TARGET,
        resourceId: deleteJoinReq.targetId,
      });
    const team = await this.teamDataService.getTeam({
      teamId: deleteJoinReq.teamId,
    });
    if (team.$type === AppError.$type) {
      const resData = buildRes({appError: team});
      return res.status(404).json(resData);
    }
    const teamPermissionOp = await this.teamPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.TEAM,
      resourceId: deleteJoinReq.teamId,
    });

    if (!canWriteWith(targetPermissionOp) || !canReadWith(teamPermissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const response = await this.targetDataService.deleteTeamFromTarget(
      deleteJoinReq
    );
    if (response instanceof Date) {
      const resData = buildRes({data: {deletedAt: response}});
      return res.json(resData);
    }
    const resData = buildRes({error: ErrorCode.UNKNOWN});
    return res.status(500).json(resData);
  }

  @put({path: "/job-role"})
  async addJobRole(req: Request, res: Response) {
    const writeJoinReq = JoinTargetJobRoleRequest.fromPartial(req.body);
    // Validate client inputs.
    const parser = getDataParsers({
      schema: JOIN_TARGET_JOB_ROLE_COLLECTION_SCHEMA,
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
    const targetPermissionOp =
      await this.targetPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.TARGET,
        resourceId: writeJoinReq.targetId,
      });
    const jobRole = await this.jobRoleDataService.getJobRole({
      jobRoleId: writeJoinReq.jobRoleId,
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
        resourceId: writeJoinReq.jobRoleId,
      });

    if (
      !canWriteWith(targetPermissionOp) ||
      !canWriteWith(jobRolePermissionOp)
    ) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const response = await this.targetDataService.addJobRoleToTarget(
      writeJoinReq
    );
    if (response.$type === AppError.$type) {
      const resData = buildRes({error: ErrorCode.UNKNOWN});
      return res.status(500).json(resData);
    }
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @dtDelete({path: "/job-role/:targetId/:jobRoleId"})
  async deleteJobRole(req: Request, res: Response) {
    const deleteJoinReq = JoinTargetJobRoleRequest.fromPartial({
      targetId: req.params.targetId,
      jobRoleId: req.params.jobRoleId,
    });
    // Verify if request is Permitted to set permission.
    const authData = AuthData.fromPartial(req.body.authData);
    const targetPermissionOp =
      await this.targetPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.TARGET,
        resourceId: deleteJoinReq.targetId,
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

    if (
      !canWriteWith(targetPermissionOp) ||
      !canReadWith(jobRolePermissionOp)
    ) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const response = await this.targetDataService.deleteJobRoleFromTarget(
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
    // Verify if requestor is Permitted to set permission.
    const authData = AuthData.fromPartial(req.body.authData);
    const permissionOp = await this.targetPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.TARGET,
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

  private async buildGetTargetResponse(
    target: Target
  ): Promise<GetTargetResponse> {
    const users = this.userDataService.getUsersOfTarget({targetId: target.id});
    const teams = this.teamDataService.getTeamsOfTarget({targetId: target.id});
    const jobRoles = this.jobRoleDataService.getJobRolesOfTarget({
      targetId: target.id,
    });
    const data = {
      target,
      directUsers: await users,
      teams: await teams,
      jobRoles: await jobRoles,
    };

    const usersOfTeams = [];
    for (const team of data.teams) {
      const users = await this.userDataService.getUsersInTeam({
        teamId: team.id,
      });
      usersOfTeams.push(...users);
    }

    const usersOfJobRoles = [];
    for (const jobRole of data.jobRoles) {
      const users = await this.userDataService.getUsersOfJobRole({
        jobRoleId: jobRole.id,
      });
      usersOfJobRoles.push(...users);
    }

    const aggregatedUserList = [
      ...data.directUsers,
      ...usersOfTeams,
      ...usersOfJobRoles,
    ];
    const aggregatedUserSetIds = [
      ...new Set<String>(aggregatedUserList.map((user) => user.id)),
    ];
    const finalUserSet = aggregatedUserSetIds.map((userId) => {
      const user = aggregatedUserList.find((user) => user.id === userId);
      return user;
    });

    return GetTargetResponse.fromPartial({
      ...data,
      finalUserSet: finalUserSet as ReadonlyArray<User>,
    });
  }
}
