import { DistributionOutlet } from "../../../generated/types/catalog/distribution/distribution.pb";
/**
 * Contains openrations that could be used by several data services.
 */
export declare class DistributionOutletSharedService {
    readonly db: any;
    getDistOutletsFromIds(args: {
        distOutletIds: string[];
    }): Promise<readonly DistributionOutlet[]>;
}
