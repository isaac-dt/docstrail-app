import { Request, Response } from "@dimetrail/firebase/core/https";
import { ClientPermissionService } from "../../account-module/client/client.permission";
import { ClientDataService } from "../../account-module/client/client.data";
import { BundleDataService } from "./bundle.data";
import { BundlePermissionService } from "./bundle.permission";
import { RootPermissionService } from "../../account-module/root/root.permission";
import { TemplateDataService } from "../template/template.data";
/** Controller for Bundle requests. */
export declare class BundleController {
    private readonly bundleDataService;
    private readonly bundlePermissionService;
    private readonly clientPermissionService;
    private readonly clientDataService;
    private readonly templateDataService;
    private readonly rootPermissionService;
    readonly db: FirebaseFirestore.Firestore;
    constructor(bundleDataService: BundleDataService, bundlePermissionService: BundlePermissionService, clientPermissionService: ClientPermissionService, clientDataService: ClientDataService, templateDataService: TemplateDataService, rootPermissionService: RootPermissionService);
    getBundle(req: Request, res: Response): Promise<Response>;
    createBundle(req: Request, res: Response): Promise<Response>;
    updateBundleFields(req: Request, res: Response): Promise<Response>;
    shareAccess(req: Request, res: Response): Promise<Response>;
    private buildGetBundleResponse;
}
