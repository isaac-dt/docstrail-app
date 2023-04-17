import { RootPermissionService } from "../../account-module/root/root.permission";
import { UserDataService } from "../../account-module/user/user.data";
import { DBEntity, PermissionOp } from "../../generated/types/permission.pb";
import { OrderDataService } from "./order.data";
/**
 * Manages authorizations for accessing order data.
 */
export declare class OrderPermissionService {
    private readonly userDataService;
    private readonly rootPermissionService;
    private readonly orderDataService;
    constructor(userDataService: UserDataService, rootPermissionService: RootPermissionService, orderDataService: OrderDataService);
    /** Gets permission operations that apply to a targeted order. */
    getPermissionOp(args: {
        accessor: DBEntity.USER;
        accessorId: string;
        resource: DBEntity.ORDER;
        resourceId: string;
    }): Promise<PermissionOp>;
}
