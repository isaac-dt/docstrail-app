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
import {DistributionOutletPermissionService} from "../distribution-outlet/dist-outlet.permission";
import {OutletAddressDataService} from "./outlet-address.data";

/**
 * Manages authorizations for accessing outlet address data.
 */
@Injectable()
export class OutletAddressPermissionService {
  constructor(
    private readonly userDataService: UserDataService,
    private readonly distOutletPermissionService: DistributionOutletPermissionService,
    private readonly outletAddressDataService: OutletAddressDataService
  ) {}

  /** Gets permission operations that apply to a targeted outlet address. */
  async getPermissionOp(args: {
    accessor: DBEntity.USER;
    accessorId: string;
    resource: DBEntity.OUTLET_ADDRESS;
    resourceId: string;
  }): Promise<PermissionOp> {
    const resourceAsAddressPromise =
      this.outletAddressDataService.getOutletAddress({
        outletAddressId: args.resourceId,
      });
    const accessorAsUserPromise = this.userDataService.getUser({
      userId: args.accessorId,
    });
    const resourceAsAddress = await resourceAsAddressPromise;
    const accessorAsUser = await accessorAsUserPromise;
    if (resourceAsAddress.$type === AppError.$type) return PermissionOp.NONE;
    if (accessorAsUser.$type === AppError.$type) return PermissionOp.NONE;

    const permissionOfUser: Promise<Permission> = getPermission({
      accessor: DBEntity.USER,
      accessorId: args.accessorId,
      resource: DBEntity.OUTLET_ADDRESS,
      resourceId: args.resourceId,
    });

    const inheritedPermissionOp =
      this.distOutletPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: args.accessorId,
        resource: DBEntity.DISTRIBUTION_OUTLET,
        resourceId: resourceAsAddress.distributionOutletId,
      });

    if (accessorAsUser.teamId) {
      const permissionOfTeam: Promise<Permission> = getPermission({
        accessor: DBEntity.TEAM,
        accessorId: accessorAsUser.teamId,
        resource: DBEntity.OUTLET_ADDRESS,
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
