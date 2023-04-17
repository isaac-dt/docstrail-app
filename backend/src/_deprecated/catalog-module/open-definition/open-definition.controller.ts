import {
  get,
  patch,
  post,
  Request,
  Response,
} from "@dimetrail/firebase/core/https";
import {Controller} from "@dimetrail/firebase/core/utils";
import {getFirestore} from "firebase-admin/firestore";
import {ClientDataService} from "../../../account-module/client/client.data";
import {ClientPermissionService} from "../../../account-module/client/client.permission";
import {RootDataService} from "../../../account-module/root/root.data";
import {RootPermissionService} from "../../../account-module/root/root.permission";
import {
  GetOpenDefinitionResponse,
  WriteOpenDefinitionRequest,
} from "../../../generated/types/catalog/open-definition/open-definition.api.pb";
import {OpenDefinition} from "../../../generated/types/catalog/open-definition/open-definition.pb";
import {
  AppError,
  AuthData,
  ErrorCode,
} from "../../../generated/types/common.pb";
import {DBEntity, PermissionOp} from "../../../generated/types/permission.pb";
import {guard} from "../../../shared/authentication/auth";
import {getDataParsers} from "../../../shared/database/firestore-utils";
import {buildRes} from "../../../shared/https/response";
import {
  canReadWith,
  canWriteWith,
} from "../../../shared/permission/permission.data";
import {CoreDefinitionDataService} from "../core-definition/core-def.data";
import {OpenDefinitionDataService} from "./open-definition.data";
import {OpenDefinitionPermissionService} from "./open-definition.permission";
import {OPEN_DEFINITION_COLLECTION_SCHEMA} from "./open-definition.schema";

/** Controller for Open Definition. */
@Controller({
  path: "open-definition",
  runHttpAfter: [guard],
})
export class OpenDefinitionController {
  readonly db = getFirestore();

  constructor(
    private readonly openDefinitionDataService: OpenDefinitionDataService,
    private readonly openDefinitionPermissionService: OpenDefinitionPermissionService,
    private readonly rootDataService: RootDataService,
    private readonly rootPermissionService: RootPermissionService,
    private readonly clientPermissionService: ClientPermissionService,
    private readonly clientDataService: ClientDataService,
    private readonly coreDefinitionDataService: CoreDefinitionDataService
  ) {}

  @get({path: "/:openDefId"})
  async getOpenDefinition(req: Request, res: Response) {
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const permissionOp =
      await this.openDefinitionPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.OPEN_DEFINITION,
        resourceId: req.params.openDefId,
      });
    if (!canReadWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const openDef = await this.openDefinitionDataService.getOpenDefinition({
      openDefinitionId: req.params.openDefId,
    });
    if (openDef.$type === AppError.$type) {
      const resData = buildRes({appError: openDef});
      return res.status(404).json(resData);
    }
    const response = await this.buildGetOpenDefResponse(openDef);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @post({path: "/"})
  async createOpenDefinition(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({schema: OPEN_DEFINITION_COLLECTION_SCHEMA});
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
    const reqOpenDef = WriteOpenDefinitionRequest.fromPartial(req.body);
    if (reqOpenDef.parent?.$case === "rootId") {
      const parentRoot = await this.rootDataService.getRoot({
        rootId: reqOpenDef.parent.rootId,
      });
      if (parentRoot.$type === AppError.$type) {
        const resData = buildRes({appError: parentRoot});
        return res.status(404).json(resData);
      }
      permissionOp = await this.rootPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.ROOT,
        resourceId: parentRoot.id,
      });
    } else if (reqOpenDef.parent?.$case === "clientId") {
      const parentClient = await this.clientDataService.getClient({
        clientId: reqOpenDef.parent.clientId,
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
    const openDef = await this.openDefinitionDataService.createOpenDefinition({
      openDefData: req.body,
    });
    if (openDef.$type === AppError.$type) {
      const appError = openDef;
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
    const response = await this.buildGetOpenDefResponse(openDef);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @patch({path: "/:openDefId"})
  async updateOpenDefinitionFields(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({
      schema: OPEN_DEFINITION_COLLECTION_SCHEMA,
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
    const reqOpenDef = await this.openDefinitionDataService.getOpenDefinition({
      openDefinitionId: req.params.openDefId,
    });
    if (reqOpenDef.$type === AppError.$type) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    if (reqOpenDef.parent?.$case === "rootId") {
      permissionOp = await this.rootPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.ROOT,
        resourceId: reqOpenDef.parent.rootId,
      });
    } else if (reqOpenDef.parent?.$case === "clientId") {
      permissionOp = await this.clientPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.CLIENT,
        resourceId: reqOpenDef.parent.clientId,
      });
    }
    if (!canWriteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const openDef =
      await this.openDefinitionDataService.updateOpenDefinitionFields({
        openDefinitionId: req.params.openDefId,
        openDefinitionData: req.body,
      });
    if (openDef.$type === AppError.$type) {
      const appError = openDef;
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
    const response = this.buildGetOpenDefResponse(openDef);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  private async buildGetOpenDefResponse(
    openDefinition: OpenDefinition
  ): Promise<GetOpenDefinitionResponse> {
    const coreDefinition =
      await this.coreDefinitionDataService.getCoreDefinition({
        coreDefinitionId: openDefinition.coreDefinitionId,
      });
    return GetOpenDefinitionResponse.fromPartial({
      openDefinition,
      coreDefinition:
        coreDefinition.$type === AppError.$type ? undefined : coreDefinition,
    });
  }
}
