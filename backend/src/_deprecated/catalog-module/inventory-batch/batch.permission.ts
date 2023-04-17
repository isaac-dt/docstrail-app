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
import {ProductPermissionService} from "../product/product.permission";
import {InventoryBatchDataService} from "./batch.data";

/**
 * Manages authorizations for accessing inventory batch data.
 */
@Injectable()
export class InventoryBatchPermissionService {
  constructor(
    private readonly userDataService: UserDataService,
    private readonly productPermissionService: ProductPermissionService,
    private readonly batchDataService: InventoryBatchDataService
  ) {}

  /** Gets permission operations that apply to a targeted inventory batch. */
  async getPermissionOp(args: {
    accessor: DBEntity.USER;
    accessorId: string;
    resource: DBEntity.INVENTORY_BATCH;
    resourceId: string;
  }): Promise<PermissionOp> {
    const resourceAsBatchPromise = this.batchDataService.getBatch({
      batchId: args.resourceId,
    });
    const accessorAsUserPromise = this.userDataService.getUser({
      userId: args.accessorId,
    });
    const resourceAsBatch = await resourceAsBatchPromise;
    const accessorAsUser = await accessorAsUserPromise;
    if (resourceAsBatch.$type === AppError.$type) return PermissionOp.NONE;
    if (accessorAsUser.$type === AppError.$type) return PermissionOp.NONE;

    const permissionOfUser: Promise<Permission> = getPermission({
      accessor: DBEntity.USER,
      accessorId: args.accessorId,
      resource: DBEntity.INVENTORY_BATCH,
      resourceId: args.resourceId,
    });

    const inheritedPermissionOp = this.productPermissionService.getPermissionOp(
      {
        accessor: DBEntity.USER,
        accessorId: args.accessorId,
        resource: DBEntity.PRODUCT,
        resourceId: resourceAsBatch.productId,
      }
    );

    if (accessorAsUser.teamId) {
      const permissionOfTeam: Promise<Permission> = getPermission({
        accessor: DBEntity.TEAM,
        accessorId: accessorAsUser.teamId,
        resource: DBEntity.INVENTORY_BATCH,
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
