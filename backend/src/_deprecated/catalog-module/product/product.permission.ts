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
import {ProductDataService} from "./product.data";

/**
 * Manages authorizations for accessing product data.
 */
@Injectable()
export class ProductPermissionService {
  constructor(
    private readonly userDataService: UserDataService,
    private readonly distOutletPermissionService: DistributionOutletPermissionService,
    private readonly productDataService: ProductDataService
  ) {}

  /** Gets permission operations that apply to a targeted product. */
  async getPermissionOp(args: {
    accessor: DBEntity.USER;
    accessorId: string;
    resource: DBEntity.PRODUCT;
    resourceId: string;
  }): Promise<PermissionOp> {
    const resourceAsProductPromise = this.productDataService.getProduct({
      productId: args.resourceId,
    });
    const accessorAsUserPromise = this.userDataService.getUser({
      userId: args.accessorId,
    });
    const resourceAsProduct = await resourceAsProductPromise;
    const accessorAsUser = await accessorAsUserPromise;
    if (resourceAsProduct.$type === AppError.$type) return PermissionOp.NONE;
    if (accessorAsUser.$type === AppError.$type) return PermissionOp.NONE;

    const permissionOfUser: Promise<Permission> = getPermission({
      accessor: DBEntity.USER,
      accessorId: args.accessorId,
      resource: DBEntity.PRODUCT,
      resourceId: args.resourceId,
    });

    const inheritedPermissionOp =
      this.distOutletPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: args.accessorId,
        resource: DBEntity.DISTRIBUTION_OUTLET,
        resourceId: resourceAsProduct.distributionOutletId,
      });

    if (accessorAsUser.teamId) {
      const permissionOfTeam: Promise<Permission> = getPermission({
        accessor: DBEntity.TEAM,
        accessorId: accessorAsUser.teamId,
        resource: DBEntity.PRODUCT,
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
