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

/**
 * Manages authorizations for accessing root data.
 */
@Injectable()
export class RootPermissionService {
  constructor(private readonly userDataService: UserDataService) {}
  /** Gets permission operations that apply to a targeted root. */
  async getPermissionOp(args: {
    accessor: DBEntity.USER;
    accessorId: string;
    resource: DBEntity.ROOT;
    resourceId: string;
  }): Promise<PermissionOp> {
    const accessorAsUser = await this.userDataService.getUser({
      userId: args.accessorId,
    });
    if (accessorAsUser.$type === AppError.$type) return PermissionOp.NONE;

    const permissionOfUser: Promise<Permission> = getPermission({
      accessor: DBEntity.USER,
      accessorId: args.accessorId,
      resource: DBEntity.ROOT,
      resourceId: args.resourceId,
    });

    if (accessorAsUser.teamId) {
      const permissionOfTeam: Promise<Permission> = getPermission({
        accessor: DBEntity.TEAM,
        accessorId: accessorAsUser.teamId,
        resource: DBEntity.ROOT,
        resourceId: args.resourceId,
      });
      return getHighestPermissionOp([
        (await permissionOfUser).operation,
        (await permissionOfTeam).operation,
      ]);
    }

    return getHighestPermissionOp([(await permissionOfUser).operation]);
  }
}
