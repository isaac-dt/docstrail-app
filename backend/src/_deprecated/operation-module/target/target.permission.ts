import {Injectable} from "@dimetrail/firebase/core/utils";
import {
  DBEntity,
  Permission,
  PermissionOp,
} from "../../../generated/types/permission.pb";
import {
  getHighestPermissionOp,
  getPermission,
} from "../../../shared/permission/permission.data";
import {UserDataService} from "../../../account-module/user/user.data";
import {AppError} from "../../../generated/types/common.pb";
import {TargetDataService} from "./target.data";
import {ClientPermissionService} from "../../../account-module/client/client.permission";

/**
 * Manages authorizations for accessing target data.
 */
@Injectable()
export class TargetPermissionService {
  constructor(
    private readonly targetDataService: TargetDataService,
    private readonly userDataService: UserDataService,
    private readonly clientPermissionService: ClientPermissionService
  ) {}

  /** Gets highest permission operation that apply to a targeted target. */
  async getPermissionOp(args: {
    accessor: DBEntity.USER;
    accessorId: string;
    resource: DBEntity.TARGET;
    resourceId: string;
  }): Promise<PermissionOp> {
    const resourceAsTargetPromise = this.targetDataService.getTarget({
      targetId: args.resourceId,
    });
    const accessorAsUserPromise = this.userDataService.getUser({
      userId: args.accessorId,
    });
    const resourceAsTarget = await resourceAsTargetPromise;
    const accessorAsUser = await accessorAsUserPromise;
    if (resourceAsTarget.$type === AppError.$type) return PermissionOp.NONE;
    if (accessorAsUser.$type === AppError.$type) return PermissionOp.NONE;

    const permissionOfUser: Promise<Permission> = getPermission({
      accessor: DBEntity.USER,
      accessorId: args.accessorId,
      resource: DBEntity.TARGET,
      resourceId: args.resourceId,
    });

    const inheritedPermissionOp = this.clientPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: args.accessorId,
      resource: DBEntity.CLIENT,
      resourceId: resourceAsTarget.clientId,
    });

    if (accessorAsUser.teamId) {
      const permissionOfTeam: Promise<Permission> = getPermission({
        accessor: DBEntity.TEAM,
        accessorId: accessorAsUser.teamId,
        resource: DBEntity.TARGET,
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
