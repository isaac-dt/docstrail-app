import { Request, Response } from "@dimetrail/firebase/core/https";
import { ClientPermissionService } from "../../../account-module/client/client.permission";
import { ClientDataService } from "../../../account-module/client/client.data";
import { BundleDataService } from "./bundle.data";
import { BundlePermissionService } from "./bundle.permission";
import { RootPermissionService } from "../../../account-module/root/root.permission";
import { TemplateDataService } from "../template/template.data";
/** Controller for Bundle requests. */
export declare class BundleController {
    private readonly bundleDataService;
    private readonly bundlePermissionService;
    private readonly clientPermissionService;
    private readonly clientDataService;
    private readonly templateDataService;
    private readonly rootPermissionService;
    readonly db: any;
    constructor(bundleDataService: BundleDataService, bundlePermissionService: BundlePermissionService, clientPermissionService: ClientPermissionService, clientDataService: ClientDataService, templateDataService: TemplateDataService, rootPermissionService: RootPermissionService);
    getBundle(req: Request, res: Response): Promise<any>;
    createBundle(req: Request, res: Response): Promise<any>;
    updateBundleFields(req: Request, res: Response): Promise<any>;
    shareAccess(req: Request, res: Response): Promise<any>;
    private buildGetBundleResponse;
}
