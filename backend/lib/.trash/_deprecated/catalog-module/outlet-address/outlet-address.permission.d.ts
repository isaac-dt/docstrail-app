import { UserDataService } from "../../../account-module/user/user.data";
import { DBEntity, PermissionOp } from "../../../generated/types/permission.pb";
import { DistributionOutletPermissionService } from "../distribution-outlet/dist-outlet.permission";
import { OutletAddressDataService } from "./outlet-address.data";
/**
 * Manages authorizations for accessing outlet address data.
 */
export declare class OutletAddressPermissionService {
    private readonly userDataService;
    private readonly distOutletPermissionService;
    private readonly outletAddressDataService;
    constructor(userDataService: UserDataService, distOutletPermissionService: DistributionOutletPermissionService, outletAddressDataService: OutletAddressDataService);
    /** Gets permission operations that apply to a targeted outlet address. */
    getPermissionOp(args: {
        accessor: DBEntity.USER;
        accessorId: string;
        resource: DBEntity.OUTLET_ADDRESS;
        resourceId: string;
    }): Promise<PermissionOp>;
}
