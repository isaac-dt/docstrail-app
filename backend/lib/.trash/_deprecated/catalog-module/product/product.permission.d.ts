import { UserDataService } from "../../../account-module/user/user.data";
import { DBEntity, PermissionOp } from "../../../generated/types/permission.pb";
import { DistributionOutletPermissionService } from "../distribution-outlet/dist-outlet.permission";
import { ProductDataService } from "./product.data";
/**
 * Manages authorizations for accessing product data.
 */
export declare class ProductPermissionService {
    private readonly userDataService;
    private readonly distOutletPermissionService;
    private readonly productDataService;
    constructor(userDataService: UserDataService, distOutletPermissionService: DistributionOutletPermissionService, productDataService: ProductDataService);
    /** Gets permission operations that apply to a targeted product. */
    getPermissionOp(args: {
        accessor: DBEntity.USER;
        accessorId: string;
        resource: DBEntity.PRODUCT;
        resourceId: string;
    }): Promise<PermissionOp>;
}
