import {post, Request, Response} from "@dimetrail/firebase/core/https";
import {Controller} from "@dimetrail/firebase/core/utils";
import {ClientDataService} from "../../account-module/client/client.data";
import {TeamDataService} from "../../account-module/team/team.data";
import {UserDataService} from "../../account-module/user/user.data";
import {Client} from "../../generated/types/account/client/client.pb";
import {Team} from "../../generated/types/account/team/team.pb";
import {User} from "../../generated/types/account/user/user.pb";
import {AppError, AuthData, ErrorCode} from "../../generated/types/common.pb";
import {
  GetOrgSignupResponse,
  WriteOrgSignupRequest,
} from "../../generated/types/logic/signup/org-signup.api.pb";
import {
  DBEntity,
  PermissionOp,
  WritePermissionRequest,
} from "../../generated/types/permission.pb";
import {guard} from "../../shared/authentication/auth";
import {getDataParsers} from "../../shared/database/firestore-utils";
import {buildRes} from "../../shared/https/response";
import {
  DB_ROOT_ID,
  setPermission,
} from "../../shared/permission/permission.data";

import {ORG_SIGNUP_SCHEMA, USER_SIGNUP_SCHEMA} from "./org-signup.schema";

/** Controller for Org Signup. */
@Controller({
  path: "org-signup",
  runHttpAfter: [guard],
})
export class OrgSignupController {
  constructor(
    readonly clientDataService: ClientDataService,
    readonly teamDataService: TeamDataService,
    readonly userDataService: UserDataService
  ) {}

  @post({path: "/"})
  async createUser(req: Request, res: Response) {
    const sendError = (args: {at: string; appError: AppError}) => {
      const resData = buildRes({
        appError: AppError.fromPartial({
          errorCode: args.appError.errorCode,
          details: [args.at, args.appError.details],
        }),
      });
      return res.status(500).json(resData);
    };

    // Validate client inputs.
    const parser = getDataParsers({schema: USER_SIGNUP_SCHEMA});
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

    const userId = (req.body.authData as AuthData).user!.id;
    const orgSignupData = WriteOrgSignupRequest.fromPartial(req.body);

    // create new user
    const userData = User.fromPartial({
      id: userId,
      email: orgSignupData.email,
      photoUrl: orgSignupData.photoUrl,
      fullName: orgSignupData.userFullName,
    });
    const newUser = await this.userDataService.createOrReplaceUser({
      id: userId,
      userData,
    });
    if (newUser.$type === AppError.$type)
      return sendError({at: "create new user", appError: newUser});

    const userPermission = setPermission(
      WritePermissionRequest.fromPartial({
        operation: PermissionOp.WRITE,
        accessor: DBEntity.USER,
        accessorId: userId,
        resource: DBEntity.USER,
        resourceId: newUser.id,
      })
    );

    await userPermission;

    const response = GetOrgSignupResponse.fromPartial({
      user: newUser,
    });
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  /** @deprecated Use {@link createUser} instead. */
  async createClientAndUser(req: Request, res: Response) {
    const sendError = (args: {at: string; appError: AppError}) => {
      const resData = buildRes({
        appError: AppError.fromPartial({
          errorCode: args.appError.errorCode,
          details: [args.at, args.appError.details],
        }),
      });
      return res.status(500).json(resData);
    };

    // Validate client inputs.
    const parser = getDataParsers({schema: ORG_SIGNUP_SCHEMA});
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

    const userId = (req.body.authData as AuthData).user!.id;
    const orgSignupData = WriteOrgSignupRequest.fromPartial(req.body);

    // create new client
    const clientData = Client.fromPartial({
      name: orgSignupData.clientName,
      rootId: DB_ROOT_ID,
    });
    const newClient = await this.clientDataService.createClient({clientData});
    if (newClient.$type === AppError.$type)
      return sendError({at: "create new client", appError: newClient});

    // create new team
    const teamData = Team.fromPartial({
      parent: {clientId: newClient.id, $case: "clientId"},
    });
    const newTeam = await this.teamDataService.createTeam({teamData});
    if (newTeam.$type === AppError.$type)
      return sendError({at: "create new team", appError: newTeam});

    // create new user
    const userData = User.fromPartial({
      id: userId,
      email: orgSignupData.email,
      photoUrl: orgSignupData.photoUrl,
      role: orgSignupData.userRole,
      fullName: orgSignupData.userFullName,
      teamId: newTeam.id,
    });
    const newUser = await this.userDataService.createOrReplaceUser({
      id: userId,
      userData,
    });
    if (newUser.$type === AppError.$type)
      return sendError({at: "create new user", appError: newUser});

    const clientPermission = setPermission(
      WritePermissionRequest.fromPartial({
        operation: PermissionOp.WRITE,
        accessor: DBEntity.USER,
        accessorId: userId,
        resource: DBEntity.CLIENT,
        resourceId: newClient.id,
      })
    );
    const teamPermission = setPermission(
      WritePermissionRequest.fromPartial({
        operation: PermissionOp.WRITE,
        accessor: DBEntity.USER,
        accessorId: userId,
        resource: DBEntity.TEAM,
        resourceId: newTeam.id,
      })
    );
    const userPermission = setPermission(
      WritePermissionRequest.fromPartial({
        operation: PermissionOp.WRITE,
        accessor: DBEntity.USER,
        accessorId: userId,
        resource: DBEntity.USER,
        resourceId: newUser.id,
      })
    );

    await clientPermission;
    await teamPermission;
    await userPermission;

    const response = GetOrgSignupResponse.fromPartial({
      user: newUser,
      team: newTeam,
      client: newClient,
    });
    const resData = buildRes({data: response});
    return res.json(resData);
  }
}
