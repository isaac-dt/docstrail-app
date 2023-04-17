import {
  get,
  patch,
  post,
  Request,
  Response,
} from "../../../framework/core/https";
import {Controller} from "../../../framework/core/utils";
import {getFirestore} from "firebase-admin/firestore";
import {GetClientResponse} from "../../generated/types/account/client/client.api.pb";
import {Client} from "../../generated/types/account/client/client.pb";
import {AppError, AuthData, ErrorCode} from "../../generated/types/common.pb";
import {DBEntity} from "../../generated/types/permission.pb";
import {guard} from "../../shared/authentication/auth";
import {getDataParsers} from "../../shared/database/firestore-utils";
import {buildRes} from "../../shared/https/response";
import {
  canReadWith,
  canWriteWith,
} from "../../shared/permission/permission.data";
import {RootDataService} from "../root/root.data";
import {RootPermissionService} from "../root/root.permission";
import {ClientDataService} from "./client.data";
import {ClientPermissionService} from "./client.permission";
import {CLIENT_COLLECTION_SCHEMA} from "./client.schema";

/** Controller for Client. */
@Controller({
  path: "client",
  runHttpAfter: [guard],
})
export class ClientController {
  readonly db = getFirestore();

  constructor(
    private readonly clientDataService: ClientDataService,
    private readonly clientPermissionService: ClientPermissionService,
    private readonly rootDataService: RootDataService,
    private readonly rootPermissionService: RootPermissionService
  ) {}

  @get({path: "/:clientId"})
  async getClient(req: Request, res: Response) {
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const permissionOp = await this.clientPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.CLIENT,
      resourceId: req.params.clientId,
    });
    if (!canReadWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const client = await this.clientDataService.getClient({
      clientId: req.params.clientId,
    });
    if (client.$type === AppError.$type) {
      const resData = buildRes({appError: client});
      return res.status(404).json(resData);
    }
    const response = await this.buildGetClientResponse(client);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @post({path: "/"})
  async createClient(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({schema: CLIENT_COLLECTION_SCHEMA});
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
    const targetRoot = await this.rootDataService.getRoot({
      rootId: req.body.rootId,
    });
    if (targetRoot.$type === AppError.$type) {
      const resData = buildRes({appError: targetRoot});
      return res.status(404).json(resData);
    }
    const permissionOp = await this.rootPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.ROOT,
      resourceId: targetRoot.id,
    });
    if (!canWriteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const client = await this.clientDataService.createClient({
      clientData: req.body,
    });
    if (client.$type === AppError.$type) {
      const appError = client;
      switch (appError.errorCode) {
        case ErrorCode.DUPLICATE_ENTRY: {
          const resData = buildRes({appError});
          return res.status(400).json(resData);
        }
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
    const response = await this.buildGetClientResponse(client);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @patch({path: "/:clientId"})
  async updateClientFields(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({
      schema: CLIENT_COLLECTION_SCHEMA,
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
    const targetClient = await this.clientDataService.getClient({
      clientId: req.params.clientId,
    });
    if (targetClient.$type === AppError.$type) {
      const resData = buildRes({appError: targetClient});
      return res.status(404).json(resData);
    }
    const permissionOp = await this.clientPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.CLIENT,
      resourceId: targetClient.id,
    });
    if (!canWriteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const client = await this.clientDataService.updateClientFields({
      id: req.params.clientId,
      clientData: req.body,
    });
    if (client.$type === AppError.$type) {
      const appError = client;
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
    const response = await this.buildGetClientResponse(client);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  private async buildGetClientResponse(
    client: Client
  ): Promise<GetClientResponse> {
    const jobRoles = this.clientDataService.getJobRoles({clientId: client.id});
    const childrenTeams = this.clientDataService.getChildrenTeams({
      parentClientId: client.id,
    });
    return GetClientResponse.fromPartial({
      client,
      childrenTeams: await childrenTeams,
      jobRoles: await jobRoles,
    });
  }
}
