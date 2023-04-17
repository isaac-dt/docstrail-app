import {
  get,
  patch,
  post,
  put,
  Request,
  Response,
  dtDelete,
} from "@dimetrail/firebase/core/https";
import {Controller} from "@dimetrail/firebase/core/utils";
import {getFirestore} from "firebase-admin/firestore";
import {
  AppError,
  AuthData,
  ErrorCode,
} from "../../../generated/types/common.pb";
import {JoinTemplatePackageRequest} from "../../../generated/types/join/template-package.pb";
import {JoinTemplateTargetRequest} from "../../../generated/types/join/template-target.pb";
import {JoinTemplateTriggerRequest} from "../../../generated/types/join/template-trigger.pb";
import {GetTemplateResponse} from "../../../generated/types/operation/template/template.api.pb";
import {Template} from "../../../generated/types/operation/template/template.pb";
import {DBEntity} from "../../../generated/types/permission.pb";
import {guard} from "../../../shared/authentication/auth";
import {getDataParsers} from "../../../shared/database/firestore-utils";
import {buildRes} from "../../../shared/https/response";
import {
  canReadWith,
  canWriteWith,
} from "../../../shared/permission/permission.data";
import {BundleDataService} from "../bundle/bundle.data";
import {BundlePermissionService} from "../bundle/bundle.permission";
import {PackageDataService} from "../package/package.data";
import {PackagePermissionService} from "../package/package.permission";
import {TargetDataService} from "../target/target.data";
import {TargetPermissionService} from "../target/target.permission";
import {TriggerDataService} from "../trigger/trigger.data";
import {TriggerPermissionService} from "../trigger/trigger.permission";
import {TemplateDataService} from "./template.data";
import {TemplatePermissionService} from "./template.permission";
import {
  JOIN_TEMPLATE_PACKAGE_COLLECTION_SCHEMA,
  JOIN_TEMPLATE_TARGET_COLLECTION_SCHEMA,
  JOIN_TEMPLATE_TRIGGER_COLLECTION_SCHEMA,
  TEMPLATE_COLLECTION_SCHEMA,
} from "./template.schema";

/** Controller for Template. */
@Controller({
  path: "template",
  runHttpAfter: [guard],
})
export class TemplateController {
  readonly db = getFirestore();

  constructor(
    private readonly templateDataService: TemplateDataService,
    private readonly templatePermissionService: TemplatePermissionService,
    private readonly bundleDataService: BundleDataService,
    private readonly bundlePermissionService: BundlePermissionService,
    private readonly packageDataService: PackageDataService,
    private readonly packagePermissionService: PackagePermissionService,
    private readonly triggerDataService: TriggerDataService,
    private readonly triggerPermissionService: TriggerPermissionService,
    private readonly targetDataService: TargetDataService,
    private readonly targetPermissionService: TargetPermissionService
  ) {}

  @get({path: "/:templateId"})
  async getTemplate(req: Request, res: Response) {
    // Verify permissions.
    const authData = AuthData.fromPartial(req.body.authData);
    const permissionOp = await this.templatePermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.TEMPLATE,
      resourceId: req.params.templateId,
    });
    if (!canReadWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const template = await this.templateDataService.getTemplate({
      templateId: req.params.templateId,
    });
    if (template.$type === AppError.$type) {
      const resData = buildRes({appError: template});
      return res.status(404).json(resData);
    }
    const response = await this.buildGetTemplateResponse(template);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @post({path: "/"})
  async createTemplate(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({schema: TEMPLATE_COLLECTION_SCHEMA});
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
    const targetBundle = await this.bundleDataService.getBundle({
      bundleId: req.body.bundleId,
    });
    if (targetBundle.$type === AppError.$type) {
      const resData = buildRes({appError: targetBundle});
      return res.status(404).json(resData);
    }
    const permissionOp = await this.bundlePermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.BUNDLE,
      resourceId: targetBundle.id,
    });
    if (!canWriteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const template = await this.templateDataService.createTemplate({
      templateData: req.body,
    });
    if (template.$type === AppError.$type) {
      const appError = template;
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
    const response = await this.buildGetTemplateResponse(template);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @patch({path: "/:templateId"})
  async updateTemplateFields(req: Request, res: Response) {
    // Validate client inputs.
    const parser = getDataParsers({
      schema: TEMPLATE_COLLECTION_SCHEMA,
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
    const targetTemplate = await this.templateDataService.getTemplate({
      templateId: req.params.templateId,
    });
    if (targetTemplate.$type === AppError.$type) {
      const resData = buildRes({appError: targetTemplate});
      return res.status(404).json(resData);
    }
    const permissionOp = await this.templatePermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: authData.user!.id,
      resource: DBEntity.TEMPLATE,
      resourceId: targetTemplate.id,
    });
    if (!canWriteWith(permissionOp)) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const template = await this.templateDataService.updateTemplateFields({
      templateId: req.params.templateId,
      templateData: req.body,
    });
    if (template.$type === AppError.$type) {
      const appError = template;
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
    const response = await this.buildGetTemplateResponse(template);
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @put({path: "/package"})
  async addPackage(req: Request, res: Response) {
    const writeJoinReq = JoinTemplatePackageRequest.fromPartial(req.body);
    // Validate client inputs.
    const parser = getDataParsers({
      schema: JOIN_TEMPLATE_PACKAGE_COLLECTION_SCHEMA,
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
    const templatePermissionOp =
      await this.templatePermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.TEMPLATE,
        resourceId: writeJoinReq.templateId,
      });
    const packageObj = await this.packageDataService.getPackage({
      packageId: writeJoinReq.packageId,
    });
    if (packageObj.$type === AppError.$type) {
      const resData = buildRes({appError: packageObj});
      return res.status(404).json(resData);
    }
    const packagePermissionOp =
      await this.packagePermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.PACKAGE,
        resourceId: writeJoinReq.packageId,
      });

    if (
      !canWriteWith(templatePermissionOp) ||
      !canReadWith(packagePermissionOp)
    ) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const response = await this.templateDataService.addPackageToTemplate(
      writeJoinReq
    );
    if (response.$type === AppError.$type) {
      const resData = buildRes({error: ErrorCode.UNKNOWN});
      return res.status(500).json(resData);
    }
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @dtDelete({path: "/package/:templateId/:packageId"})
  async deletePackage(req: Request, res: Response) {
    const deleteJoinReq = JoinTemplatePackageRequest.fromPartial({
      templateId: req.params.templateId,
      packageId: req.params.packageId,
    });
    // Verify if request is Permitted to set permission.
    const authData = AuthData.fromPartial(req.body.authData);
    const templatePermissionOp =
      await this.templatePermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.TEMPLATE,
        resourceId: deleteJoinReq.templateId,
      });
    const packageObj = await this.packageDataService.getPackage({
      packageId: deleteJoinReq.packageId,
    });
    if (packageObj.$type === AppError.$type) {
      const resData = buildRes({appError: packageObj});
      return res.status(404).json(resData);
    }
    const packagePermissionOp =
      await this.packagePermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.PACKAGE,
        resourceId: deleteJoinReq.packageId,
      });

    if (
      !canWriteWith(templatePermissionOp) ||
      !canReadWith(packagePermissionOp)
    ) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const response = await this.templateDataService.deletePackageFromTemplate(
      deleteJoinReq
    );
    if (response instanceof Date) {
      const resData = buildRes({data: {deletedAt: response}});
      return res.json(resData);
    }
    const resData = buildRes({error: ErrorCode.UNKNOWN});
    return res.status(500).json(resData);
  }

  @put({path: "/trigger"})
  async addTrigger(req: Request, res: Response) {
    const writeJoinReq = JoinTemplateTriggerRequest.fromPartial(req.body);
    // Validate client inputs.
    const parser = getDataParsers({
      schema: JOIN_TEMPLATE_TRIGGER_COLLECTION_SCHEMA,
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
    const templatePermissionOp =
      await this.templatePermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.TEMPLATE,
        resourceId: writeJoinReq.templateId,
      });
    const trigger = await this.triggerDataService.getTrigger({
      triggerId: writeJoinReq.triggerId,
    });
    if (trigger.$type === AppError.$type) {
      const resData = buildRes({appError: trigger});
      return res.status(404).json(resData);
    }
    const triggerPermissionOp =
      await this.triggerPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.TRIGGER,
        resourceId: writeJoinReq.triggerId,
      });

    if (
      !canWriteWith(templatePermissionOp) ||
      !canWriteWith(triggerPermissionOp)
    ) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const response = await this.templateDataService.addTriggerToTemplate(
      writeJoinReq
    );
    if (response.$type === AppError.$type) {
      const resData = buildRes({error: ErrorCode.UNKNOWN});
      return res.status(500).json(resData);
    }
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @dtDelete({path: "/trigger/:templateId/:triggerId"})
  async deleteTrigger(req: Request, res: Response) {
    const deleteJoinReq = JoinTemplateTriggerRequest.fromPartial({
      templateId: req.params.templateId,
      triggerId: req.params.triggerId,
    });
    // Verify if request is Permitted to set permission.
    const authData = AuthData.fromPartial(req.body.authData);
    const templatePermissionOp =
      await this.templatePermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.TEMPLATE,
        resourceId: deleteJoinReq.templateId,
      });
    const trigger = await this.triggerDataService.getTrigger({
      triggerId: deleteJoinReq.triggerId,
    });
    if (trigger.$type === AppError.$type) {
      const resData = buildRes({appError: trigger});
      return res.status(404).json(resData);
    }
    const triggerPermissionOp =
      await this.triggerPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.TRIGGER,
        resourceId: deleteJoinReq.triggerId,
      });

    if (
      !canWriteWith(templatePermissionOp) ||
      !canReadWith(triggerPermissionOp)
    ) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const response = await this.templateDataService.deleteTriggerFromTemplate(
      deleteJoinReq
    );
    if (response instanceof Date) {
      const resData = buildRes({data: {deletedAt: response}});
      return res.json(resData);
    }
    const resData = buildRes({error: ErrorCode.UNKNOWN});
    return res.status(500).json(resData);
  }

  @put({path: "/target"})
  async addTarget(req: Request, res: Response) {
    const writeJoinReq = JoinTemplateTargetRequest.fromPartial(req.body);
    // Validate client inputs.
    const parser = getDataParsers({
      schema: JOIN_TEMPLATE_TARGET_COLLECTION_SCHEMA,
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
    const templatePermissionOp =
      await this.templatePermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.TEMPLATE,
        resourceId: writeJoinReq.templateId,
      });
    const target = await this.targetDataService.getTarget({
      targetId: writeJoinReq.targetId,
    });
    if (target.$type === AppError.$type) {
      const resData = buildRes({appError: target});
      return res.status(404).json(resData);
    }
    const targetPermissionOp =
      await this.targetPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.TARGET,
        resourceId: writeJoinReq.targetId,
      });

    if (
      !canWriteWith(templatePermissionOp) ||
      !canWriteWith(targetPermissionOp)
    ) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const response = await this.templateDataService.addTargetToTemplate(
      writeJoinReq
    );
    if (response.$type === AppError.$type) {
      const resData = buildRes({error: ErrorCode.UNKNOWN});
      return res.status(500).json(resData);
    }
    const resData = buildRes({data: response});
    return res.json(resData);
  }

  @dtDelete({path: "/target/:templateId/:targetId"})
  async deleteTarget(req: Request, res: Response) {
    const deleteJoinReq = JoinTemplateTargetRequest.fromPartial({
      templateId: req.params.templateId,
      targetId: req.params.targetId,
    });
    // Verify if request is Permitted to set permission.
    const authData = AuthData.fromPartial(req.body.authData);
    const templatePermissionOp =
      await this.templatePermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.TEMPLATE,
        resourceId: deleteJoinReq.templateId,
      });
    const target = await this.targetDataService.getTarget({
      targetId: deleteJoinReq.targetId,
    });
    if (target.$type === AppError.$type) {
      const resData = buildRes({appError: target});
      return res.status(404).json(resData);
    }
    const targetPermissionOp =
      await this.targetPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: authData.user!.id,
        resource: DBEntity.TARGET,
        resourceId: deleteJoinReq.targetId,
      });

    if (
      !canWriteWith(templatePermissionOp) ||
      !canReadWith(targetPermissionOp)
    ) {
      const resData = buildRes({error: ErrorCode.MISSING_PERMISSION});
      return res.status(403).json(resData);
    }
    // Handle request.
    const response = await this.templateDataService.deleteTargetFromTemplate(
      deleteJoinReq
    );
    if (response instanceof Date) {
      const resData = buildRes({data: {deletedAt: response}});
      return res.json(resData);
    }
    const resData = buildRes({error: ErrorCode.UNKNOWN});
    return res.status(500).json(resData);
  }

  private async buildGetTemplateResponse(
    template: Template
  ): Promise<GetTemplateResponse> {
    const bundle = this.bundleDataService.getBundle({
      bundleId: template.bundleId,
    });
    const packages = this.packageDataService.getPackagesOfTemplate({
      templateId: template.id,
    });
    const triggers = this.triggerDataService.getTriggersOfTemplate({
      templateId: template.id,
    });
    const targets = this.targetDataService.getTargetsOfTemplate({
      templateId: template.id,
    });
    const response = GetTemplateResponse.fromPartial({
      template,
      bundle: await bundle,
      packages: await packages,
      triggers: await triggers,
      targets: await targets,
    });
    return response;
  }
}
