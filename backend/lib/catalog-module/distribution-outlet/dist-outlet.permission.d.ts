import { UserDataService } from "../../account-module/user/user.data";
import { DBEntity, PermissionOp } from "../../generated/types/permission.pb";
import { CompanyPermissionService } from "../company/company.permission";
import { DistributionOutletDataService } from "./dist-outlet.data";
/**
 * Manages authorizations for accessing distribution outlet data.
 */
export declare class DistributionOutletPermissionService {
    private readonly companyPermissionService;
    private readonly userDataService;
    private readonly distOutletDataService;
    constructor(companyPermissionService: CompanyPermissionService, userDataService: UserDataService, distOutletDataService: DistributionOutletDataService);
    /** Gets permission operations that apply to a targeted distribution outlet. */
    getPermissionOp(args: {
        accessor: DBEntity.USER;
        accessorId: string;
        resource: DBEntity.DISTRIBUTION_OUTLET;
        resourceId: string;
    }): Promise<PermissionOp>;
}
