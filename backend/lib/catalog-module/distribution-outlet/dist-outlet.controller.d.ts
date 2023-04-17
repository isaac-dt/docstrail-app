import { Request, Response } from "@dimetrail/firebase/core/https";
import { CompanyDataService } from "../company/company.data";
import { CompanyPermissionService } from "../company/company.permission";
import { CoreDefinitionDataService } from "../core-definition/core-def.data";
import { CoreDefinitionPermissionService } from "../core-definition/core-def.permission";
import { OutletAddressDataService } from "../outlet-address/outlet-address.data";
import { DistributionOutletDataService } from "./dist-outlet.data";
import { DistributionOutletPermissionService } from "./dist-outlet.permission";
/** Controller for Distribution Outlet. */
export declare class DistributionOutletController {
    private readonly distOutletDataService;
    private readonly distOutletPermissionService;
    private readonly coreDefDataService;
    private readonly coreDefPermissionService;
    private readonly companyDataService;
    private readonly companyPermissionService;
    private readonly outletAddressDataService;
    readonly db: FirebaseFirestore.Firestore;
    constructor(distOutletDataService: DistributionOutletDataService, distOutletPermissionService: DistributionOutletPermissionService, coreDefDataService: CoreDefinitionDataService, coreDefPermissionService: CoreDefinitionPermissionService, companyDataService: CompanyDataService, companyPermissionService: CompanyPermissionService, outletAddressDataService: OutletAddressDataService);
    getDistOutlet(req: Request, res: Response): Promise<Response>;
    createDistOutlet(req: Request, res: Response): Promise<Response>;
    updateDistOutletFields(req: Request, res: Response): Promise<Response>;
    addCoreDef(req: Request, res: Response): Promise<Response>;
    deleteCoreDef(req: Request, res: Response): Promise<Response>;
    private buildGetDistOutletResponse;
}
