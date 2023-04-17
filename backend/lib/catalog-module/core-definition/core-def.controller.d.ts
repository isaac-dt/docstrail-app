import { Request, Response } from "@dimetrail/firebase/core/https";
import { RootDataService } from "../../account-module/root/root.data";
import { RootPermissionService } from "../../account-module/root/root.permission";
import { DistributionOutletDataService } from "../distribution-outlet/dist-outlet.data";
import { CoreDefinitionDataService } from "./core-def.data";
import { CoreDefinitionPermissionService } from "./core-def.permission";
/** Controller for Core Definition. */
export declare class CoreDefinitionController {
    private readonly coreDefinitionDataService;
    private readonly coreDefinitionPermissionService;
    private readonly distributionOutletDataService;
    private readonly rootDataService;
    private readonly rootPermissionService;
    readonly db: FirebaseFirestore.Firestore;
    constructor(coreDefinitionDataService: CoreDefinitionDataService, coreDefinitionPermissionService: CoreDefinitionPermissionService, distributionOutletDataService: DistributionOutletDataService, rootDataService: RootDataService, rootPermissionService: RootPermissionService);
    getCoreDefinition(req: Request, res: Response): Promise<Response>;
    createCoreDefinition(req: Request, res: Response): Promise<Response>;
    updateCoreDefinitionFields(req: Request, res: Response): Promise<Response>;
    private buildGetCoreDefResponse;
}
