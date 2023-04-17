import {Controller} from "../../../framework/core/utils";
import {
  get,
  put,
  patch,
  Request,
  Response,
  post,
} from "../../../framework/core/https";
import {guard} from "../../shared/authentication/auth";
import {getFirestore} from "firebase-admin/firestore";
import {Team} from "../../generated/types/account/team/team.pb";
import {AppError, AuthData, ErrorCode} from "../../generated/types/common.pb";
import {TeamDataService} from "./team.data";
import {TeamPermissionService} from "./team.permission";
import {DBEntity, PermissionOp} from "../../generated/types/permission.pb";
import {ClientPermissionService} from "../client/client.permission";
import {ClientDataService} from "../client/client.data";
import {
  GetTeamResponse,
  WriteTeamRequest,
} from "../../generated/types/account/team/team.api.pb";
import {UserDataService} from "../user/user.data";
import {buildRes} from "../../shared/https/response";
import {
  buildGetPermissionResponse,
  canReadWith,
  canWriteWith,
  isPermissionOpGte,
  setPermission,
} from "../../shared/permission/permission.data";
import {getDataParsers} from "../../shared/database/firestore-utils";
import {TEAM_COLLECTION_SCHEMA} from "./team.schema";
import {PERMISSION_COLLECTION_SCHEMA} from "../../shared/permission/permission.schema";

/** Controller for Team requests. */
@Controller({
  path: "team",
  runHttpAfter: [guard],
})
export class TeamController {
  readonly db = getFirestore();

  constructor(
    private readonly teamDataService: TeamDataService,
    private readonly teamPermissionService: TeamPermissionService,
    private readonly clientPermissionService: ClientPermissionService,
    private readonly clientDataService: ClientDataService,
    private readonly userDataService: UserDataService
  ) {}

  @get({path: "/:teamId"})
  async getTeam(req: Request, res: Response) {
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const permissionOp = await this.teamPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.TEAM,
      resourceId: req.params.teamId,
    });
    if (!canReadWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const team = await this.teamDataService.getTeam({
      teamId: req.params.teamId,
    });
    if (team.$type === AppError.$type) {
      const resData = buildRes({appError: team});
      return res.status(404).json(resData);
    }
    const response = await this.buildGetTeamResponse(team);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @post({path: "/"})
  async createTeam(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({schema: TEAM_COLLECTION_SCHEMA});
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
    let permissionOp: PermissionOp = PermissionOp.NONE;
    const reqTeam = WriteTeamRequest.fromPartial(req.body);
    if (reqTeam.parent?.$case === "teamId") {
      const parentTeam = await this.teamDataService.getTeam({
        teamId: reqTeam.parent.teamId,
      });
      if (parentTeam.$type === AppError.$type) {
        const resData = buildRes({appError: parentTeam});
        return res.status(404).json(resData);
      }
      permissionOp = await this.teamPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.TEAM,
        resourceId: parentTeam.id,
      });
    } else if (reqTeam.parent?.$case === "clientId") {
      const parentClient = await this.clientDataService.getClient({
        clientId: reqTeam.parent.clientId,
      });
      if (parentClient.$type === AppError.$type) {
        const resData = buildRes({appError: parentClient});
        return res.status(404).json(resData);
      }
      permissionOp = await this.clientPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.CLIENT,
        resourceId: parentClient.id,
      });
    }
    if (!canWriteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const team = await this.teamDataService.createTeam({
      teamData: req.body,
    });
    if (team.$type === AppError.$type) {
      const appError = team;
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
    const response = await this.buildGetTeamResponse(team);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @patch({path: "/:teamId"})
  async updateTeamFields(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({
      schema: TEAM_COLLECTION_SCHEMA,
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
    let permissionOp: PermissionOp = PermissionOp.NONE;
    const reqTeam = await this.teamDataService.getTeam({
      teamId: req.params.teamId,
    });
    if (reqTeam.$type === AppError.$type) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    if (reqTeam.parent?.$case === "teamId") {
      permissionOp = await this.teamPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.TEAM,
        resourceId: reqTeam.parent.teamId,
      });
    } else if (reqTeam.parent?.$case === "clientId") {
      permissionOp = await this.clientPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.CLIENT,
        resourceId: reqTeam.parent.clientId,
      });
    }
    if (!canWriteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const team = await this.teamDataService.updateTeamFields({
      id: req.params.teamId,
      teamData: req.body,
    });
    if (team.$type === AppError.$type) {
      const appError = team;
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
    const response = this.buildGetTeamResponse(team);
    const resData = buildRes({data: response});
    return res.json(resData);
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
    const permissionOp = await this.teamPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.TEAM,
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

  private async buildGetTeamResponse(team: Team): Promise<GetTeamResponse> {
    const users = this.userDataService.getUsersInTeam({teamId: team.id});
    const childrenTeams = this.teamDataService.getChildrenTeams({
      parentTeamId: team.id,
    });
    const response = GetTeamResponse.fromPartial({
      users: await users,
      childrenTeams: await childrenTeams,
      team,
    });
    return response;
  }
}
