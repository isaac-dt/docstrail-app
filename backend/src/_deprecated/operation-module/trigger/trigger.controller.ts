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
import {RootPermissionService} from "../../../account-module/root/root.permission";
import {TriggerDataService} from "./trigger.data";
import {TriggerPermissionService} from "./trigger.permission";
import {GetTriggerResponse} from "../../../generated/types/operation/trigger/trigger.api.pb";
import {Trigger} from "../../../generated/types/operation/trigger/trigger.pb";
import {TRIGGER_COLLECTION_SCHEMA} from "./trigger.schema";
import {RootDataService} from "../../../account-module/root/root.data";

/** Controller for Trigger requests. */
@Controller({
  path: "trigger",
  runHttpAfter: [guard],
})
export class TriggerController {
  readonly db = getFirestore();

  constructor(
    private readonly triggerDataService: TriggerDataService,
    private readonly triggerPermissionService: TriggerPermissionService,
    private readonly rootDataService: RootDataService,
    private readonly rootPermissionService: RootPermissionService
  ) {}

  @get({path: "/:triggerId"})
  async getTrigger(req: Request, res: Response) {
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const permissionOp = await this.triggerPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.TRIGGER,
      resourceId: req.params.triggerId,
    });
    if (!canReadWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const trigger = await this.triggerDataService.getTrigger({
      triggerId: req.params.triggerId,
    });
    if (trigger.$type === AppError.$type) {
      const resData = buildRes({appError: trigger});
      return res.status(404).json(resData);
    }
    const response = await this.buildGetTriggerResponse(trigger);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @post({path: "/"})
  async createTrigger(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({schema: TRIGGER_COLLECTION_SCHEMA});
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
    const trigger = await this.triggerDataService.createTrigger({
      triggerData: req.body,
    });
    if (trigger.$type === AppError.$type) {
      const appError = trigger;
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
    const response = await this.buildGetTriggerResponse(trigger);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @patch({path: "/:triggerId"})
  async updateTriggerFields(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({
      schema: TRIGGER_COLLECTION_SCHEMA,
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
    const targetTrigger = await this.triggerDataService.getTrigger({
      triggerId: req.params.triggerId,
    });
    if (targetTrigger.$type === AppError.$type) {
      const resData = buildRes({appError: targetTrigger});
      return res.status(404).json(resData);
    }
    const permissionOp = await this.triggerPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.TRIGGER,
      resourceId: targetTrigger.id,
    });
    if (!canWriteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const trigger = await this.triggerDataService.updateTriggerFields({
      triggerId: req.params.triggerId,
      triggerData: req.body,
    });
    if (trigger.$type === AppError.$type) {
      const appError = trigger;
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
    const response = this.buildGetTriggerResponse(trigger);
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
    const permissionOp = await this.triggerPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.TRIGGER,
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

  private async buildGetTriggerResponse(
    trigger: Trigger
  ): Promise<GetTriggerResponse> {
    const response = GetTriggerResponse.fromPartial({
      trigger,
    });
    return response;
  }
}
