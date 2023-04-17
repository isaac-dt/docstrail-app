import { AppError } from "../../../generated/types/common.pb";
import { DistributionOutlet } from "../../../generated/types/catalog/distribution/distribution.pb";
import { WriteDistributionOutletRequest } from "../../../generated/types/catalog/distribution/distribution.api.pb";
import { JoinCoreDefDistOutletRequest, JoinCoreDefDistOutletResponse } from "../../../generated/types/join/core-def-dist-outlet.pb";
import { Product } from "../../../generated/types/catalog/product/product.pb";
import { DistributionOutletSharedService } from "./dist-outlet.shared";
import { CoreDefinitionDataService } from "../core-definition/core-def.data";
/**
 * Manages operations on distribution outlet data.
 */
export declare class DistributionOutletDataService {
    private readonly distributionOutletSharedService;
    private readonly coreDefDataService;
    readonly db: any;
    constructor(distributionOutletSharedService: DistributionOutletSharedService, coreDefDataService: CoreDefinitionDataService);
    getDistOutlet(args: {
        distOutletId: string;
    }): Promise<DistributionOutlet | AppError>;
    getDistributionOutletsOfCoreDef(args: {
        coreDefinitionId: string;
    }): Promise<readonly DistributionOutlet[]>;
    getProducts(args: {
        distOutletId: string;
    }): Promise<readonly Product[]>;
    addCoreDefToDistOutlet(args: JoinCoreDefDistOutletRequest): Promise<JoinCoreDefDistOutletResponse | AppError>;
    deleteCoreDefFromDistOutlet(args: JoinCoreDefDistOutletRequest): Promise<Date | AppError>;
    createDistOutlet(args: {
        distOutletData: Partial<DistributionOutlet>;
    }): Promise<DistributionOutlet | AppError>;
    updateDistOutletFields(args: {
        distOutletId: string;
        distOutletData: WriteDistributionOutletRequest;
    }): Promise<DistributionOutlet | AppError>;
}
