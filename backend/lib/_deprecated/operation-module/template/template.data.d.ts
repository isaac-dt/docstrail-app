import { AppError } from "../../../generated/types/common.pb";
import { Template } from "../../../generated/types/operation/template/template.pb";
import { JoinTemplatePackageRequest, JoinTemplatePackageResponse } from "../../../generated/types/join/template-package.pb";
import { PackageDataService } from "../package/package.data";
import { JoinTemplateTriggerRequest, JoinTemplateTriggerResponse } from "../../../generated/types/join/template-trigger.pb";
import { TriggerDataService } from "../trigger/trigger.data";
import { JoinTemplateTargetRequest, JoinTemplateTargetResponse } from "../../../generated/types/join/template-target.pb";
import { TargetDataService } from "../target/target.data";
/** Template data service. */
export declare class TemplateDataService {
    private readonly packageDataService;
    private readonly triggerDataService;
    private readonly targetDataService;
    readonly db: FirebaseFirestore.Firestore;
    constructor(packageDataService: PackageDataService, triggerDataService: TriggerDataService, targetDataService: TargetDataService);
    getTemplate(args: {
        templateId: string;
    }): Promise<Template | AppError>;
    getTemplatesInBundle(args: {
        bundleId: string;
    }): Promise<readonly Template[]>;
    createTemplate(args: {
        templateData: Partial<Template>;
    }): Promise<Template | AppError>;
    updateTemplateFields(args: {
        templateId: string;
        templateData: Partial<Template>;
    }): Promise<Template | AppError>;
    addPackageToTemplate(args: JoinTemplatePackageRequest): Promise<JoinTemplatePackageResponse | AppError>;
    deletePackageFromTemplate(args: JoinTemplatePackageRequest): Promise<Date | AppError>;
    addTriggerToTemplate(args: JoinTemplateTriggerRequest): Promise<JoinTemplateTriggerResponse | AppError>;
    deleteTriggerFromTemplate(args: JoinTemplateTriggerRequest): Promise<Date | AppError>;
    addTargetToTemplate(args: JoinTemplateTargetRequest): Promise<JoinTemplateTargetResponse | AppError>;
    deleteTargetFromTemplate(args: JoinTemplateTargetRequest): Promise<Date | AppError>;
}
