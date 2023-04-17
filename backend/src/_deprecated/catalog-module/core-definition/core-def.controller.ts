import {
  get,
  patch,
  post,
  Request,
  Response,
} from "@dimetrail/firebase/core/https";
import {Controller} from "@dimetrail/firebase/core/utils";
import {getFirestore} from "firebase-admin/firestore";
import {RootDataService} from "../../../account-module/root/root.data";
import {RootPermissionService} from "../../../account-module/root/root.permission";
import {GetCoreDefinitionResponse} from "../../../generated/types/catalog/core-definition/core-definition.api.pb";
import {CoreDefinition} from "../../../generated/types/catalog/core-definition/core-definition.pb";
import {
  AppError,
  AuthData,
  ErrorCode,
} from "../../../generated/types/common.pb";
import {DBEntity} from "../../../generated/types/permission.pb";
import {guard} from "../../../shared/authentication/auth";
import {getDataParsers} from "../../../shared/database/firestore-utils";
import {buildRes} from "../../../shared/https/response";
import {
  canReadWith,
  canWriteWith,
} from "../../../shared/permission/permission.data";
import {DistributionOutletDataService} from "../distribution-outlet/dist-outlet.data";
import {CoreDefinitionDataService} from "./core-def.data";
import {CoreDefinitionPermissionService} from "./core-def.permission";
import {CORE_DEFINITION_COLLECTION_SCHEMA} from "./core-def.schema";

/** Controller for Core Definition. */
@Controller({
  path: "core-definition",
  runHttpAfter: [guard],
})
export class CoreDefinitionController {
  readonly db = getFirestore();

  constructor(
    private readonly coreDefinitionDataService: CoreDefinitionDataService,
    private readonly coreDefinitionPermissionService: CoreDefinitionPermissionService,
    private readonly distributionOutletDataService: DistributionOutletDataService,
    private readonly rootDataService: RootDataService,
    private readonly rootPermissionService: RootPermissionService
  ) {}

  @get({path: "/:coreDefId"})
  async getCoreDefinition(req: Request, res: Response) {
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const permissionOp =
      await this.coreDefinitionPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.CORE_DEFINITION,
        resourceId: req.params.coreDefId,
      });
    if (!canReadWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const coreDef = await this.coreDefinitionDataService.getCoreDefinition({
      coreDefinitionId: req.params.coreDefId,
    });
    if (coreDef.$type === AppError.$type) {
      const resData = buildRes({appError: coreDef});
      return res.status(404).json(resData);
    }
    const response = await this.buildGetCoreDefResponse(coreDef);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @post({path: "/"})
  async createCoreDefinition(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({schema: CORE_DEFINITION_COLLECTION_SCHEMA});
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
    const coreDef = await this.coreDefinitionDataService.createCoreDefinition({
      coreDefData: req.body,
    });
    if (coreDef.$type === AppError.$type) {
      const appError = coreDef;
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
    const response = await this.buildGetCoreDefResponse(coreDef);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @patch({path: "/:coreDefId"})
  async updateCoreDefinitionFields(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({
      schema: CORE_DEFINITION_COLLECTION_SCHEMA,
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
    const targetCoreDef =
      await this.coreDefinitionDataService.getCoreDefinition({
        coreDefinitionId: req.params.coreDefId,
      });
    if (targetCoreDef.$type === AppError.$type) {
      const resData = buildRes({appError: targetCoreDef});
      return res.status(404).json(resData);
    }
    const permissionOp =
      await this.coreDefinitionPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.CORE_DEFINITION,
        resourceId: targetCoreDef.id,
      });
    if (!canWriteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const coreDef =
      await this.coreDefinitionDataService.updateCoreDefinitionFields({
        coreDefinitionId: req.params.coreDefId,
        coreDefinitionData: req.body,
      });
    if (coreDef.$type === AppError.$type) {
      const appError = coreDef;
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
    const response = await this.buildGetCoreDefResponse(coreDef);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  private async buildGetCoreDefResponse(
    coreDefinition: CoreDefinition
  ): Promise<GetCoreDefinitionResponse> {
    const distributionOutlets =
      await this.distributionOutletDataService.getDistributionOutletsOfCoreDef({
        coreDefinitionId: coreDefinition.id,
      });
    return GetCoreDefinitionResponse.fromPartial({
      distributionOutlets,
      coreDefinition,
    });
  }
}
