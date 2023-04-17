import { Request, Response } from "@dimetrail/firebase/core/https";
import { DistributionOutletDataService } from "../distribution-outlet/dist-outlet.data";
import { DistributionOutletPermissionService } from "../distribution-outlet/dist-outlet.permission";
import { OutletAddressDataService } from "./outlet-address.data";
import { OutletAddressPermissionService } from "./outlet-address.permission";
/** Controller for Outlet Address. */
export declare class OutletAddressController {
    private readonly outletAddressPermissionService;
    private readonly outletAddressDataService;
    private readonly distOutletDataService;
    private readonly distOutletPermissionService;
    readonly db: any;
    constructor(outletAddressPermissionService: OutletAddressPermissionService, outletAddressDataService: OutletAddressDataService, distOutletDataService: DistributionOutletDataService, distOutletPermissionService: DistributionOutletPermissionService);
    getOutletAddress(req: Request, res: Response): Promise<any>;
    createOutletAddress(req: Request, res: Response): Promise<any>;
    updateOutletAddressFields(req: Request, res: Response): Promise<any>;
    private buildGetOutletAddressResponse;
}
