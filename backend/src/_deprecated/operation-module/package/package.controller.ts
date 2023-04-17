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
import {DBEntity, PermissionOp} from "../../../generated/types/permission.pb";
import {ClientPermissionService} from "../../../account-module/client/client.permission";
import {ClientDataService} from "../../../account-module/client/client.data";
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
import {RootPermissionService} from "../../../account-module/root/root.permission";
import {PackageDataService} from "./package.data";
import {PackagePermissionService} from "./package.permission";
import {Package} from "../../../generated/types/operation/package/package.pb";
import {
  GetPackageResponse,
  WritePackageRequest,
} from "../../../generated/types/operation/package/package.api.pb";
import {OpenDefinitionDataService} from "../../catalog-module/open-definition/open-definition.data";
import {
  JOIN_PACKAGE_OPEN_DEF_COLLECTION_SCHEMA,
  PACKAGE_COLLECTION_SCHEMA,
} from "./package.schema";
import {JoinPackageOpenDefinitionRequest} from "../../../generated/types/join/package-open-def.pb";
import {OpenDefinitionPermissionService} from "../../catalog-module/open-definition/open-definition.permission";

/** Controller for package requests. */
@Controller({
  path: "package",
  runHttpAfter: [guard],
})
export class PackageController {
  readonly db = getFirestore();

  constructor(
    private readonly packageDataService: PackageDataService,
    private readonly packagePermissionService: PackagePermissionService,
    private readonly clientPermissionService: ClientPermissionService,
    private readonly clientDataService: ClientDataService,
    private readonly rootPermissionService: RootPermissionService,
    private readonly openDefDataService: OpenDefinitionDataService,
    private readonly openDefPermissionService: OpenDefinitionPermissionService
  ) {}

  @get({path: "/:packageId"})
  async getPackage(req: Request, res: Response) {
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const permissionOp = await this.packagePermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.PACKAGE,
      resourceId: req.params.packageId,
    });
    if (!canReadWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const packageObj = await this.packageDataService.getPackage({
      packageId: req.params.packageId,
    });
    if (packageObj.$type === AppError.$type) {
      const resData = buildRes({appError: packageObj});
      return res.status(404).json(resData);
    }
    const response = await this.buildGetPackageResponse(packageObj);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @post({path: "/"})
  async createPackage(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({schema: PACKAGE_COLLECTION_SCHEMA});
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
    const reqPackage = WritePackageRequest.fromPartial(req.body);
    if (reqPackage.parent?.$case === "rootId") {
      const parentRoot = await this.packageDataService.getPackage({
        packageId: reqPackage.parent.rootId,
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
    } else if (reqPackage.parent?.$case === "clientId") {
      const parentClient = await this.clientDataService.getClient({
        clientId: reqPackage.parent.clientId,
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
    const packageObj = await this.packageDataService.createPackage({
      packageData: req.body,
    });
    if (packageObj.$type === AppError.$type) {
      const appError = packageObj;
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
    const response = await this.buildGetPackageResponse(packageObj);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @patch({path: "/:packageId"})
  async updatePackageFields(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({
      schema: PACKAGE_COLLECTION_SCHEMA,
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
    const reqPackage = await this.packageDataService.getPackage({
      packageId: req.params.packageId,
    });
    if (reqPackage.$type === AppError.$type) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    if (reqPackage.parent?.$case === "rootId") {
      permissionOp = await this.rootPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.ROOT,
        resourceId: reqPackage.parent.rootId,
      });
    } else if (reqPackage.parent?.$case === "clientId") {
      permissionOp = await this.clientPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.CLIENT,
        resourceId: reqPackage.parent.clientId,
      });
    }
    if (!canWriteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const packageObj = await this.packageDataService.updatePackageFields({
      id: req.params.packageId,
      packageData: req.body,
    });
    if (packageObj.$type === AppError.$type) {
      const appError = packageObj;
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
    const response = this.buildGetPackageResponse(packageObj);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @put({path: "/open-definition"})
  async addOpenDef(req: Request, res: Response) {
    const writeJoinReq = JoinPackageOpenDefinitionRequest.fromPartial(req.body);
    // Validate client inputs.
    const parser = getDataParsers({
      schema: JOIN_PACKAGE_OPEN_DEF_COLLECTION_SCHEMA,
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
    const packagePermissionOp =
      await this.packagePermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.PACKAGE,
        resourceId: writeJoinReq.packageId,
      });
    const openDef = await this.openDefDataService.getOpenDefinition({
      openDefinitionId: writeJoinReq.openDefinitionId,
    });
    if (openDef.$type === AppError.$type) {
      const resData = buildRes({appError: openDef});
      return res.status(404).json(resData);
    }
    const openDefPermissionOp =
      await this.openDefPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.OPEN_DEFINITION,
        resourceId: writeJoinReq.packageId,
      });

    if (
      !canWriteWith(packagePermissionOp) ||
      !canReadWith(openDefPermissionOp)
    ) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const response = await this.packageDataService.addOpenDefToPackage(
      writeJoinReq
    );
    if (response.$type === AppError.$type) {
      const resData = buildRes({error: ErrorCode.UNKNOWN});
      return res.status(500).json(resData);
    }
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @dtDelete({path: "/open-definition/:packageId/:openDefinitionId"})
  async deletePackage(req: Request, res: Response) {
    const deleteJoinReq = JoinPackageOpenDefinitionRequest.fromPartial({
      packageId: req.params.packageId,
      openDefinitionId: req.params.openDefinitionId,
    });
    // Verify if request is Permitted to set permission.
    const authData = AuthData.fromPartial(req.body.authData);
    const packagePermissionOp =
      await this.packagePermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.PACKAGE,
        resourceId: deleteJoinReq.packageId,
      });
    const openDef = await this.openDefDataService.getOpenDefinition({
      openDefinitionId: deleteJoinReq.openDefinitionId,
    });
    if (openDef.$type === AppError.$type) {
      const resData = buildRes({appError: openDef});
      return res.status(404).json(resData);
    }
    const openDefPermissionOp =
      await this.openDefPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.OPEN_DEFINITION,
        resourceId: deleteJoinReq.packageId,
      });

    if (
      !canWriteWith(packagePermissionOp) ||
      !canReadWith(openDefPermissionOp)
    ) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const response = await this.packageDataService.deleteOpenDefFromPackage(
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
    const permissionOp = await this.packagePermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.PACKAGE,
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

  private async buildGetPackageResponse(
    packageObj: Package
  ): Promise<GetPackageResponse> {
    const openDefs = this.openDefDataService.getOpenDefsOfPackage({
      packageId: packageObj.id,
    });
    const response = GetPackageResponse.fromPartial({
      package: packageObj,
      openDefinitions: await openDefs,
    });
    return response;
  }
}
