import {Injectable} from "@dimetrail/firebase/core/utils";
import {AppError} from "../../generated/types/common.pb";
import {
  DBEntity,
  Permission,
  PermissionOp,
} from "../../generated/types/permission.pb";
import {
  getHighestPermissionOp,
  getPermission,
} from "../../shared/permission/permission.data";
import {UserDataService} from "../user/user.data";
import {UserPermissionService} from "../user/user.permission";
import {AddressDataService} from "./address.data";

/**
 * Manages authorizations for accessing address data.
 */
@Injectable()
export class AddressPermissionService {
  constructor(
    private readonly userDataService: UserDataService,
    private readonly userPermissionService: UserPermissionService,
    private readonly addressDataService: AddressDataService
  ) {}

  /** Gets permission operations that apply to a targeted address. */
  async getPermissionOp(args: {
    accessor: DBEntity.USER;
    accessorId: string;
    resource: DBEntity.ADDRESS;
    resourceId: string;
  }): Promise<PermissionOp> {
    const resourceAsAddressPromise = this.addressDataService.getAddress({
      addressId: args.resourceId,
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
      resource: DBEntity.ADDRESS,
      resourceId: args.resourceId,
    });

    const inheritedPermissionOp = this.userPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: args.accessorId,
      resource: DBEntity.USER,
      resourceId: resourceAsAddress.userId,
    });

    if (accessorAsUser.teamId) {
      const permissionOfTeam: Promise<Permission> = getPermission({
        accessor: DBEntity.TEAM,
        accessorId: accessorAsUser.teamId,
        resource: DBEntity.ADDRESS,
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
