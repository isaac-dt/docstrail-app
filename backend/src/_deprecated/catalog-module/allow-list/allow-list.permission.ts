import {Injectable} from "@dimetrail/firebase/core/utils";
import {ClientPermissionService} from "../../../account-module/client/client.permission";
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
import {AllowListDataService} from "./allow-list.data";

/**
 * Manages authorizations for accessing allow list data.
 */
@Injectable()
export class AllowListPermissionService {
  constructor(
    private readonly userDataService: UserDataService,
    private readonly clientPermissionService: ClientPermissionService,
    private readonly allowListDataService: AllowListDataService
  ) {}

  /** Gets permission operations that apply to a targeted allow list. */
  async getPermissionOp(args: {
    accessor: DBEntity.USER;
    accessorId: string;
    resource: DBEntity.ALLOW_LIST;
    resourceId: string;
  }): Promise<PermissionOp> {
    const resourceAsAllowListPromise = this.allowListDataService.getAllowList({
      allowListId: args.resourceId,
    });
    const accessorAsUserPromise = this.userDataService.getUser({
      userId: args.accessorId,
    });
    const resourceAsAllowList = await resourceAsAllowListPromise;
    const accessorAsUser = await accessorAsUserPromise;
    if (resourceAsAllowList.$type === AppError.$type) return PermissionOp.NONE;
    if (accessorAsUser.$type === AppError.$type) return PermissionOp.NONE;

    const permissionOfUser: Promise<Permission> = getPermission({
      accessor: DBEntity.USER,
      accessorId: args.accessorId,
      resource: DBEntity.ALLOW_LIST,
      resourceId: args.resourceId,
    });

    const inheritedPermissionOp = this.clientPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: args.accessorId,
      resource: DBEntity.CLIENT,
      resourceId: resourceAsAllowList.clientId,
    });

    if (accessorAsUser.teamId) {
      const permissionOfTeam: Promise<Permission> = getPermission({
        accessor: DBEntity.TEAM,
        accessorId: accessorAsUser.teamId,
        resource: DBEntity.ALLOW_LIST,
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
