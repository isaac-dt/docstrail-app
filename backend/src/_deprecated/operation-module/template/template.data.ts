import {Injectable} from "@dimetrail/firebase/core/utils";
import {getDataParsers} from "../../../shared/database/firestore-utils";
import {getFirestore, FieldValue, DocumentData} from "firebase-admin/firestore";
import {AppError, ErrorCode} from "../../../generated/types/common.pb";
import {Template} from "../../../generated/types/operation/template/template.pb";
import {
  JOIN_TEMPLATE_PACKAGE_COLLECTION_NAME,
  JOIN_TEMPLATE_TARGET_COLLECTION_NAME,
  JOIN_TEMPLATE_TRIGGER_COLLECTION_NAME,
  TEMPLATE_COLLECTION_NAME,
  TEMPLATE_COLLECTION_SCHEMA,
} from "./template.schema";
import {WriteTemplateRequest} from "../../../generated/types/operation/template/template.api.pb";
import {
  JoinTemplatePackageRequest,
  JoinTemplatePackageResponse,
} from "../../../generated/types/join/template-package.pb";
import {PackageDataService} from "../package/package.data";
import {
  JoinTemplateTriggerRequest,
  JoinTemplateTriggerResponse,
} from "../../../generated/types/join/template-trigger.pb";
import {TriggerDataService} from "../trigger/trigger.data";
import {
  JoinTemplateTargetRequest,
  JoinTemplateTargetResponse,
} from "../../../generated/types/join/template-target.pb";
import {TargetDataService} from "../target/target.data";

/** Template data service. */
@Injectable()
export class TemplateDataService {
  readonly db = getFirestore();

  constructor(
    private readonly packageDataService: PackageDataService,
    private readonly triggerDataService: TriggerDataService,
    private readonly targetDataService: TargetDataService
  ) {}

  async getTemplate(args: {templateId: string}): Promise<Template | AppError> {
    const templateSnap = await this.db
      .collection(TEMPLATE_COLLECTION_NAME)
      .doc(args.templateId)
      .get();
    const template: Partial<Template> | undefined = templateSnap.data();
    if (!template) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {collection: TEMPLATE_COLLECTION_NAME, id: args.templateId},
      });
    }
    return Template.fromPartial({...template, id: templateSnap.id});
  }

  async getTemplatesInBundle(args: {
    bundleId: string;
  }): Promise<readonly Template[]> {
    const data = await this.db
      .collection(TEMPLATE_COLLECTION_NAME)
      .where("bundleId", "==", args.bundleId)
      .get();
    const templates = data.docs.map((doc) =>
      Template.fromPartial({
        ...(doc.data() as Partial<Template>),
        id: doc.id,
      })
    );
    return templates;
  }

  async createTemplate(args: {
    templateData: Partial<Template>;
  }): Promise<Template | AppError> {
    const parser = getDataParsers({schema: TEMPLATE_COLLECTION_SCHEMA});
    const validationErrors = parser.validate(args.templateData);
    if (validationErrors.length) {
      throw AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedTemplateData = WriteTemplateRequest.fromPartial(
      parser.sanitize({
        ...args.templateData,
        createdAt: timestamp,
        updatedAt: timestamp,
      })
    );
    const templateRef = await this.db
      .collection(TEMPLATE_COLLECTION_NAME)
      .add(WriteTemplateRequest.toJSON(sanitizedTemplateData) as DocumentData);
    const template = await this.getTemplate({templateId: templateRef.id});
    if (!template) return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return template;
  }

  async updateTemplateFields(args: {
    templateId: string;
    templateData: Partial<Template>;
  }): Promise<Template | AppError> {
    const template = await this.getTemplate({templateId: args.templateId});
    if (!template) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {collection: TEMPLATE_COLLECTION_NAME, id: args.templateId},
      });
    }
    const parser = getDataParsers({
      schema: TEMPLATE_COLLECTION_SCHEMA,
      onlyFields: Object.keys(args.templateData),
    });
    const validationErrors = parser.validate(args.templateData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const sanitizedTemplateData = WriteTemplateRequest.fromPartial(
      parser.sanitize({
        ...args.templateData,
        updatedAt: timestamp,
      })
    );
    await this.db
      .collection(TEMPLATE_COLLECTION_NAME)
      .doc(args.templateId)
      .update(
        WriteTemplateRequest.toJSON(sanitizedTemplateData) as DocumentData
      );
    const updatedTemplate = await this.getTemplate({
      templateId: args.templateId,
    });
    if (!updatedTemplate)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return updatedTemplate;
  }

  async addPackageToTemplate(
    args: JoinTemplatePackageRequest
  ): Promise<JoinTemplatePackageResponse | AppError> {
    const packages = await this.packageDataService.getPackagesOfTemplate({
      templateId: args.templateId,
    });
    const duplicatePackage = packages.find(
      (packageObj) => packageObj.id === args.packageId
    );
    if (duplicatePackage) {
      return AppError.fromPartial({errorCode: ErrorCode.DUPLICATE_ENTRY});
    }

    const timestamp = FieldValue.serverTimestamp();
    const join = {...args, createdAt: timestamp, updatedAt: timestamp};
    const joinRef = await this.db
      .collection(JOIN_TEMPLATE_PACKAGE_COLLECTION_NAME)
      .add(JoinTemplatePackageRequest.toJSON(join) as DocumentData);
    if (!joinRef.id)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    const template = await this.getTemplate({templateId: args.templateId});
    const packageObj = await this.packageDataService.getPackage({
      packageId: args.packageId,
    });
    if ([template.$type, packageObj.$type].includes(AppError.$type)) {
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    }
    return JoinTemplatePackageResponse.fromPartial({
      template,
      package: packageObj,
    });
  }

  async deletePackageFromTemplate(
    args: JoinTemplatePackageRequest
  ): Promise<Date | AppError> {
    const join = await this.db
      .collection(JOIN_TEMPLATE_PACKAGE_COLLECTION_NAME)
      .where("packageId", "==", args.packageId)
      .where("templateId", "==", args.templateId)
      .get();
    if (join.empty) {
      return AppError.fromPartial({errorCode: ErrorCode.NOT_FOUND_IN_DB});
    }
    const joinRef = join.docs[0].ref;
    const res = await this.db
      .collection(JOIN_TEMPLATE_PACKAGE_COLLECTION_NAME)
      .doc(joinRef.path)
      .delete();
    return res.writeTime.toDate();
  }

  async addTriggerToTemplate(
    args: JoinTemplateTriggerRequest
  ): Promise<JoinTemplateTriggerResponse | AppError> {
    const triggers = await this.triggerDataService.getTriggersOfTemplate({
      templateId: args.templateId,
    });
    const duplicateTrigger = triggers.find(
      (trigger) => trigger.id === args.triggerId
    );
    if (duplicateTrigger) {
      return AppError.fromPartial({errorCode: ErrorCode.DUPLICATE_ENTRY});
    }

    const timestamp = FieldValue.serverTimestamp();
    const join = {...args, createdAt: timestamp, updatedAt: timestamp};
    const joinRef = await this.db
      .collection(JOIN_TEMPLATE_TRIGGER_COLLECTION_NAME)
      .add(JoinTemplateTriggerRequest.toJSON(join) as DocumentData);
    if (!joinRef.id)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    const template = await this.getTemplate({templateId: args.templateId});
    const trigger = await this.triggerDataService.getTrigger({
      triggerId: args.triggerId,
    });
    if ([template.$type, trigger.$type].includes(AppError.$type)) {
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    }
    return JoinTemplateTriggerResponse.fromPartial({
      template,
      trigger,
    });
  }

  async deleteTriggerFromTemplate(
    args: JoinTemplateTriggerRequest
  ): Promise<Date | AppError> {
    const join = await this.db
      .collection(JOIN_TEMPLATE_TRIGGER_COLLECTION_NAME)
      .where("triggerId", "==", args.triggerId)
      .where("templateId", "==", args.templateId)
      .get();
    if (join.empty) {
      return AppError.fromPartial({errorCode: ErrorCode.NOT_FOUND_IN_DB});
    }
    const joinRef = join.docs[0].ref;
    const res = await this.db
      .collection(JOIN_TEMPLATE_TRIGGER_COLLECTION_NAME)
      .doc(joinRef.path)
      .delete();
    return res.writeTime.toDate();
  }

  async addTargetToTemplate(
    args: JoinTemplateTargetRequest
  ): Promise<JoinTemplateTargetResponse | AppError> {
    const targets = await this.targetDataService.getTargetsOfTemplate({
      templateId: args.templateId,
    });
    const duplicateTarget = targets.find(
      (target) => target.id === args.targetId
    );
    if (duplicateTarget) {
      return AppError.fromPartial({errorCode: ErrorCode.DUPLICATE_ENTRY});
    }

    const timestamp = FieldValue.serverTimestamp();
    const join = {...args, createdAt: timestamp, updatedAt: timestamp};
    const joinRef = await this.db
      .collection(JOIN_TEMPLATE_TARGET_COLLECTION_NAME)
      .add(JoinTemplateTargetRequest.toJSON(join) as DocumentData);
    if (!joinRef.id)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    const template = await this.getTemplate({templateId: args.templateId});
    const target = await this.targetDataService.getTarget({
      targetId: args.targetId,
    });
    if ([template.$type, target.$type].includes(AppError.$type)) {
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    }
    return JoinTemplateTargetResponse.fromPartial({
      template,
      target,
    });
  }

  async deleteTargetFromTemplate(
    args: JoinTemplateTargetRequest
  ): Promise<Date | AppError> {
    const join = await this.db
      .collection(JOIN_TEMPLATE_TARGET_COLLECTION_NAME)
      .where("targetId", "==", args.targetId)
      .where("templateId", "==", args.templateId)
      .get();
    if (join.empty) {
      return AppError.fromPartial({errorCode: ErrorCode.NOT_FOUND_IN_DB});
    }
    const joinRef = join.docs[0].ref;
    const res = await this.db
      .collection(JOIN_TEMPLATE_TARGET_COLLECTION_NAME)
      .doc(joinRef.path)
      .delete();
    return res.writeTime.toDate();
  }
}
