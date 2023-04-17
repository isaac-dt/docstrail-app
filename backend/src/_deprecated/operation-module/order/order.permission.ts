import {Injectable} from "@dimetrail/firebase/core/utils";
// import {RootPermissionService} from "../../../account-module/root/root.permission";
import {UserDataService} from "../../../account-module/user/user.data";
import {AppError} from "../../../generated/types/common.pb";
import {
  DBEntity,
  Permission,
  PermissionOp,
} from "../../../generated/types/permission.pb";
import {
  // getHighestPermissionOp,
  getPermission,
} from "../../../shared/permission/permission.data";
import {OrderDataService} from "./order.data";

/**
 * Manages authorizations for accessing order data.
 */
@Injectable()
export class OrderPermissionService {
  constructor(
    private readonly userDataService: UserDataService,
    // private readonly rootPermissionService: RootPermissionService,
    private readonly orderDataService: OrderDataService
  ) {}

  /** Gets permission operations that apply to a targeted order. */
  async getPermissionOp(args: {
    accessor: DBEntity.USER;
    accessorId: string;
    resource: DBEntity.ORDER;
    resourceId: string;
  }): Promise<PermissionOp> {
    const resourceAsOrderPromise = this.orderDataService.getOrder({
      orderId: args.resourceId,
    });
    const accessorAsUserPromise = this.userDataService.getUser({
      userId: args.accessorId,
    });
    const resourceAsOrder = await resourceAsOrderPromise;
    const accessorAsUser = await accessorAsUserPromise;
    if (resourceAsOrder.$type === AppError.$type) return PermissionOp.NONE;
    if (accessorAsUser.$type === AppError.$type) return PermissionOp.NONE;

    // Checks permissions against order.

    const permissionOfUser: Promise<Permission> = getPermission({
      accessor: DBEntity.USER,
      accessorId: args.accessorId,
      resource: DBEntity.ORDER,
      resourceId: args.resourceId,
    });
    return (await permissionOfUser).operation;

    // const permissionOfTeam: Promise<Permission> = getPermission({
    //   accessor: DBEntity.TEAM,
    //   accessorId: accessorAsUser.teamId,
    //   resource: DBEntity.ORDER,
    //   resourceId: args.resourceId,
    // });

    // // Checks permissions against beneficiary user.

    // const permissionOfUserOnBeneficiary: Promise<Permission> = getPermission({
    //   accessor: DBEntity.USER,
    //   accessorId: args.accessorId,
    //   resource: DBEntity.USER,
    //   resourceId: resourceAsOrder.user!.id,
    // });
    // const permissionOfTeamOnBeneficiary: Promise<Permission> = getPermission({
    //   accessor: DBEntity.TEAM,
    //   accessorId: accessorAsUser.teamId,
    //   resource: DBEntity.USER,
    //   resourceId: resourceAsOrder.user!.id,
    // });

    // // Checks for inherited permissions.

    // const inheritedPermissionOp = this.rootPermissionService.getPermissionOp({
    //   accessor: DBEntity.USER,
    //   accessorId: args.accessorId,
    //   resource: DBEntity.ROOT,
    //   resourceId: resourceAsOrder.rootId,
    // });

    // return getHighestPermissionOp([
    //   (await permissionOfUser).operation,
    //   (await permissionOfUserOnBeneficiary).operation,
    //   (await permissionOfTeam).operation,
    //   (await permissionOfTeamOnBeneficiary).operation,
    //   await inheritedPermissionOp,
    // ]);
  }
}
