import { UserDataService } from "../../account-module/user/user.data";
import { DBEntity, PermissionOp } from "../../generated/types/permission.pb";
import { OrderPermissionService } from "../order/order.permission";
import { DeliveryItemDataService } from "./item.data";
/**
 * Manages authorizations for accessing delivery item data.
 */
export declare class DeliveryItemPermissionService {
    private readonly userDataService;
    private readonly orderPermissionService;
    private readonly itemDataService;
    constructor(userDataService: UserDataService, orderPermissionService: OrderPermissionService, itemDataService: DeliveryItemDataService);
    /** Gets permission operations that apply to a targeted item. */
    getPermissionOp(args: {
        accessor: DBEntity.USER;
        accessorId: string;
        resource: DBEntity.DELIVERY_ITEM;
        resourceId: string;
    }): Promise<PermissionOp>;
}
