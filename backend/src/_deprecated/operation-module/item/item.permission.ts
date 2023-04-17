import {Injectable} from "@dimetrail/firebase/core/utils";
import {UserDataService} from "../../../account-module/user/user.data";
import {AppError} from "../../../generated/types/common.pb";
import {
  DBEntity,
  Permission,
  PermissionOp,
} from "../../../generated/types/permission.pb";
import {
  getHighestPermissionOp,
  getPermission,
} from "../../../shared/permission/permission.data";
import {OrderPermissionService} from "../order/order.permission";
import {DeliveryItemDataService} from "./item.data";

/**
 * Manages authorizations for accessing delivery item data.
 */
@Injectable()
export class DeliveryItemPermissionService {
  constructor(
    private readonly userDataService: UserDataService,
    private readonly orderPermissionService: OrderPermissionService,
    private readonly itemDataService: DeliveryItemDataService
  ) {}

  /** Gets permission operations that apply to a targeted item. */
  async getPermissionOp(args: {
    accessor: DBEntity.USER;
    accessorId: string;
    resource: DBEntity.DELIVERY_ITEM;
    resourceId: string;
  }): Promise<PermissionOp> {
    const resourceAsItemPromise = this.itemDataService.getItem({
      itemId: args.resourceId,
    });
    const accessorAsUserPromise = this.userDataService.getUser({
      userId: args.accessorId,
    });
    const resourceAsItem = await resourceAsItemPromise;
    const accessorAsUser = await accessorAsUserPromise;
    if (resourceAsItem.$type === AppError.$type) return PermissionOp.NONE;
    if (accessorAsUser.$type === AppError.$type) return PermissionOp.NONE;

    const permissionOfUser: Promise<Permission> = getPermission({
      accessor: DBEntity.USER,
      accessorId: args.accessorId,
      resource: DBEntity.DELIVERY_ITEM,
      resourceId: args.resourceId,
    });

    const inheritedPermissionOp = this.orderPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: args.accessorId,
      resource: DBEntity.ORDER,
      resourceId: resourceAsItem.orderId,
    });

    if (accessorAsUser.teamId) {
      const permissionOfTeam: Promise<Permission> = getPermission({
        accessor: DBEntity.TEAM,
        accessorId: accessorAsUser.teamId,
        resource: DBEntity.DELIVERY_ITEM,
        resourceId: args.resourceId,
      });
      return getHighestPermissionOp([
        (await permissionOfUser).operation,
        (await permissionOfTeam).operation,
        await inheritedPermissionOp,
      ]);
    }

    return getHighestPermissionOp([
      (await permissionOfUser).operation,
      await inheritedPermissionOp,
    ]);
  }
}
