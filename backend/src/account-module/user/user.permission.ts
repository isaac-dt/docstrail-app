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
import {TeamPermissionService} from "../team/team.permission";
import {UserDataService} from "./user.data";

/** Manages permissions related to user data. */
@Injectable()
export class UserPermissionService {
  constructor(
    private readonly userDataService: UserDataService,
    private readonly teamPermissionService: TeamPermissionService
  ) {}

  /** Gets highest permission operation that apply to a targeted user. */
  async getPermissionOp(args: {
    accessor: DBEntity.USER; // accessor can be team as well! TODO.
    accessorId: string;
    resource: DBEntity.USER;
    resourceId: string;
  }): Promise<PermissionOp> {
    const accessorAsUserPromise = this.userDataService.getUser({
      userId: args.accessorId,
    });
    const resourceAsUserPromise = this.userDataService.getUser({
      userId: args.resourceId,
    });
    const accessorAsUser = await accessorAsUserPromise;
    const resourceAsUser = await resourceAsUserPromise;
    if (resourceAsUser.$type === AppError.$type) return PermissionOp.NONE;
    if (accessorAsUser.$type === AppError.$type) return PermissionOp.NONE;

    const permissionOfUser: Promise<Permission> = getPermission({
      accessor: DBEntity.USER,
      accessorId: args.accessorId,
      resource: DBEntity.USER,
      resourceId: args.resourceId,
    });

    if (accessorAsUser.teamId && resourceAsUser.teamId) {
      const permissionOfTeam: Promise<Permission> = getPermission({
        accessor: DBEntity.TEAM,
        accessorId: accessorAsUser.teamId,
        resource: DBEntity.USER,
        resourceId: args.resourceId,
      });

      const inheritedPermissionOp = this.teamPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: args.accessorId,
        resource: DBEntity.TEAM,
        resourceId: resourceAsUser.teamId,
      });

      return getHighestPermissionOp([
        (await permissionOfUser).operation,
        (await permissionOfTeam).operation,
        await inheritedPermissionOp,
      ]);
    }

    return getHighestPermissionOp([(await permissionOfUser).operation]);
  }
}
