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
import {RootPermissionService} from "../../../account-module/root/root.permission";
import {TriggerDataService} from "./trigger.data";

/**
 * Manages authorizations for accessing trigger data.
 */
@Injectable()
export class TriggerPermissionService {
  constructor(
    private readonly triggerDataService: TriggerDataService,
    private readonly userDataService: UserDataService,
    private readonly rootPermissionService: RootPermissionService
  ) {}

  /** Gets highest permission operation that apply to a targeted trigger. */
  async getPermissionOp(args: {
    accessor: DBEntity.USER;
    accessorId: string;
    resource: DBEntity.TRIGGER;
    resourceId: string;
  }): Promise<PermissionOp> {
    const resourceAsTriggerPromise = this.triggerDataService.getTrigger({
      triggerId: args.resourceId,
    });
    const accessorAsUserPromise = this.userDataService.getUser({
      userId: args.accessorId,
    });
    const resourceAsTrigger = await resourceAsTriggerPromise;
    const accessorAsUser = await accessorAsUserPromise;
    if (resourceAsTrigger.$type === AppError.$type) return PermissionOp.NONE;
    if (accessorAsUser.$type === AppError.$type) return PermissionOp.NONE;

    const permissionOfUser: Promise<Permission> = getPermission({
      accessor: DBEntity.USER,
      accessorId: args.accessorId,
      resource: DBEntity.TRIGGER,
      resourceId: args.resourceId,
    });

    const inheritedPermissionOp = this.rootPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: args.accessorId,
      resource: DBEntity.ROOT,
      resourceId: resourceAsTrigger.rootId,
    });

    if (accessorAsUser.teamId) {
      const permissionOfTeam: Promise<Permission> = getPermission({
        accessor: DBEntity.TEAM,
        accessorId: accessorAsUser.teamId,
        resource: DBEntity.TRIGGER,
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
