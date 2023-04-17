import {Controller} from "@dimetrail/firebase/core/utils";
import {
  get,
  put,
  patch,
  Request,
  Response,
  post,
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
import {BundleDataService} from "./bundle.data";
import {BundlePermissionService} from "./bundle.permission";
import {Bundle} from "../../../generated/types/operation/bundle/bundle.pb";
import {
  GetBundleResponse,
  WriteBundleRequest,
} from "../../../generated/types/operation/bundle/bundle.api.pb";
import {BUNDLE_COLLECTION_SCHEMA} from "./bundle.schema";
import {RootPermissionService} from "../../../account-module/root/root.permission";
import {TemplateDataService} from "../template/template.data";

/** Controller for Bundle requests. */
@Controller({
  path: "bundle",
  runHttpAfter: [guard],
})
export class BundleController {
  readonly db = getFirestore();

  constructor(
    private readonly bundleDataService: BundleDataService,
    private readonly bundlePermissionService: BundlePermissionService,
    private readonly clientPermissionService: ClientPermissionService,
    private readonly clientDataService: ClientDataService,
    private readonly templateDataService: TemplateDataService,
    private readonly rootPermissionService: RootPermissionService
  ) {}

  @get({path: "/:bundleId"})
  async getBundle(req: Request, res: Response) {
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const permissionOp = await this.bundlePermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.BUNDLE,
      resourceId: req.params.bundleId,
    });
    if (!canReadWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const bundle = await this.bundleDataService.getBundle({
      bundleId: req.params.bundleId,
    });
    if (bundle.$type === AppError.$type) {
      const resData = buildRes({appError: bundle});
      return res.status(404).json(resData);
    }
    const response = await this.buildGetBundleResponse(bundle);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @post({path: "/"})
  async createBundle(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({schema: BUNDLE_COLLECTION_SCHEMA});
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
    const reqBundle = WriteBundleRequest.fromPartial(req.body);
    if (reqBundle.parent?.$case === "rootId") {
      const parentRoot = await this.bundleDataService.getBundle({
        bundleId: reqBundle.parent.rootId,
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
    } else if (reqBundle.parent?.$case === "clientId") {
      const parentClient = await this.clientDataService.getClient({
        clientId: reqBundle.parent.clientId,
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
    const bundle = await this.bundleDataService.createBundle({
      bundleData: req.body,
    });
    if (bundle.$type === AppError.$type) {
      const appError = bundle;
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
    const response = await this.buildGetBundleResponse(bundle);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @patch({path: "/:bundleId"})
  async updateBundleFields(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({
      schema: BUNDLE_COLLECTION_SCHEMA,
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
    const reqBundle = await this.bundleDataService.getBundle({
      bundleId: req.params.bundleId,
    });
    if (reqBundle.$type === AppError.$type) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    if (reqBundle.parent?.$case === "rootId") {
      permissionOp = await this.rootPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.ROOT,
        resourceId: reqBundle.parent.rootId,
      });
    } else if (reqBundle.parent?.$case === "clientId") {
      permissionOp = await this.clientPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.CLIENT,
        resourceId: reqBundle.parent.clientId,
      });
    }
    if (!canWriteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const bundle = await this.bundleDataService.updateBundleFields({
      id: req.params.bundleId,
      bundleData: req.body,
    });
    if (bundle.$type === AppError.$type) {
      const appError = bundle;
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
    const response = this.buildGetBundleResponse(bundle);
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
    const permissionOp = await this.bundlePermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.BUNDLE,
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

  private async buildGetBundleResponse(
    bundle: Bundle
  ): Promise<GetBundleResponse> {
    const templates = this.templateDataService.getTemplatesInBundle({
      bundleId: bundle.id,
    });
    const response = GetBundleResponse.fromPartial({
      templates: await templates,
      bundle,
    });
    return response;
  }
}
