import { UserDataService } from "../../../account-module/user/user.data";
import { DBEntity, PermissionOp } from "../../../generated/types/permission.pb";
import { ProductPermissionService } from "../product/product.permission";
import { InventoryBatchDataService } from "./batch.data";
/**
 * Manages authorizations for accessing inventory batch data.
 */
export declare class InventoryBatchPermissionService {
    private readonly userDataService;
    private readonly productPermissionService;
    private readonly batchDataService;
    constructor(userDataService: UserDataService, productPermissionService: ProductPermissionService, batchDataService: InventoryBatchDataService);
    /** Gets permission operations that apply to a targeted inventory batch. */
    getPermissionOp(args: {
        accessor: DBEntity.USER;
        accessorId: string;
        resource: DBEntity.INVENTORY_BATCH;
        resourceId: string;
    }): Promise<PermissionOp>;
}
