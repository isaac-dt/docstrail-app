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
    readonly db: FirebaseFirestore.Firestore;
    constructor(templateDataService: TemplateDataService, templatePermissionService: TemplatePermissionService, bundleDataService: BundleDataService, bundlePermissionService: BundlePermissionService, packageDataService: PackageDataService, packagePermissionService: PackagePermissionService, triggerDataService: TriggerDataService, triggerPermissionService: TriggerPermissionService, targetDataService: TargetDataService, targetPermissionService: TargetPermissionService);
    getTemplate(req: Request, res: Response): Promise<Response>;
    createTemplate(req: Request, res: Response): Promise<Response>;
    updateTemplateFields(req: Request, res: Response): Promise<Response>;
    addPackage(req: Request, res: Response): Promise<Response>;
    deletePackage(req: Request, res: Response): Promise<Response>;
    addTrigger(req: Request, res: Response): Promise<Response>;
    deleteTrigger(req: Request, res: Response): Promise<Response>;
    addTarget(req: Request, res: Response): Promise<Response>;
    deleteTarget(req: Request, res: Response): Promise<Response>;
    private buildGetTemplateResponse;
}
