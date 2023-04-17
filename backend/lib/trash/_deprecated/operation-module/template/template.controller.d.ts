import { Request, Response } from "@dimetrail/firebase/core/https";
import { BundleDataService } from "../bundle/bundle.data";
import { BundlePermissionService } from "../bundle/bundle.permission";
import { PackageDataService } from "../package/package.data";
import { PackagePermissionService } from "../package/package.permission";
import { TargetDataService } from "../target/target.data";
import { TargetPermissionService } from "../target/target.permission";
import { TriggerDataService } from "../trigger/trigger.data";
import { TriggerPermissionService } from "../trigger/trigger.permission";
import { TemplateDataService } from "./template.data";
import { TemplatePermissionService } from "./template.permission";
/** Controller for Template. */
export declare class TemplateController {
    private readonly templateDataService;
    private readonly templatePermissionService;
    private readonly bundleDataService;
    private readonly bundlePermissionService;
    private readonly packageDataService;
    private readonly packagePermissionService;
    private readonly triggerDataService;
    private readonly triggerPermissionService;
    private readonly targetDataService;
    private readonly targetPermissionService;
    readonly db: any;
    constructor(templateDataService: TemplateDataService, templatePermissionService: TemplatePermissionService, bundleDataService: BundleDataService, bundlePermissionService: BundlePermissionService, packageDataService: PackageDataService, packagePermissionService: PackagePermissionService, triggerDataService: TriggerDataService, triggerPermissionService: TriggerPermissionService, targetDataService: TargetDataService, targetPermissionService: TargetPermissionService);
    getTemplate(req: Request, res: Response): Promise<any>;
    createTemplate(req: Request, res: Response): Promise<any>;
    updateTemplateFields(req: Request, res: Response): Promise<any>;
    addPackage(req: Request, res: Response): Promise<any>;
    deletePackage(req: Request, res: Response): Promise<any>;
    addTrigger(req: Request, res: Response): Promise<any>;
    deleteTrigger(req: Request, res: Response): Promise<any>;
    addTarget(req: Request, res: Response): Promise<any>;
    deleteTarget(req: Request, res: Response): Promise<any>;
    private buildGetTemplateResponse;
}
