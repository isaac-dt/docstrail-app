import { AppError } from "../../../generated/types/common.pb";
import { OutletAddress } from "../../../generated/types/catalog/distribution/address.pb";
import { DistributionOutletDataService } from "../distribution-outlet/dist-outlet.data";
/** Outlet Address service. */
export declare class OutletAddressDataService {
    private readonly distOutletDataService;
    readonly db: any;
    constructor(distOutletDataService: DistributionOutletDataService);
    getOutletAddress(args: {
        outletAddressId: string;
    }): Promise<OutletAddress | AppError>;
    createOutletAddress(args: {
        outletAddressData: Partial<OutletAddress>;
    }): Promise<OutletAddress | AppError>;
    updateOutletAddressFields(args: {
        outletAddressId: string;
        outletAddressData: Partial<OutletAddress>;
    }): Promise<OutletAddress | AppError>;
}
