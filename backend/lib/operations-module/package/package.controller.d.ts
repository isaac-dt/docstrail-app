import { Request, Response } from "@dimetrail/firebase/core/https";
import { ClientPermissionService } from "../../account-module/client/client.permission";
import { ClientDataService } from "../../account-module/client/client.data";
import { RootPermissionService } from "../../account-module/root/root.permission";
import { PackageDataService } from "./package.data";
import { PackagePermissionService } from "./package.permission";
import { OpenDefinitionDataService } from "../../catalog-module/open-definition/open-definition.data";
import { OpenDefinitionPermissionService } from "../../catalog-module/open-definition/open-definition.permission";
/** Controller for package requests. */
export declare class PackageController {
    private readonly packageDataService;
    private readonly packagePermissionService;
    private readonly clientPermissionService;
    private readonly clientDataService;
    private readonly rootPermissionService;
    private readonly openDefDataService;
    private readonly openDefPermissionService;
    readonly db: FirebaseFirestore.Firestore;
    constructor(packageDataService: PackageDataService, packagePermissionService: PackagePermissionService, clientPermissionService: ClientPermissionService, clientDataService: ClientDataService, rootPermissionService: RootPermissionService, openDefDataService: OpenDefinitionDataService, openDefPermissionService: OpenDefinitionPermissionService);
    getPackage(req: Request, res: Response): Promise<Response>;
    createPackage(req: Request, res: Response): Promise<Response>;
    updatePackageFields(req: Request, res: Response): Promise<Response>;
    addOpenDef(req: Request, res: Response): Promise<Response>;
    deletePackage(req: Request, res: Response): Promise<Response>;
    shareAccess(req: Request, res: Response): Promise<Response>;
    private buildGetPackageResponse;
}
