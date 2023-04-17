import {Injectable} from "../../../framework/core/utils";
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
import {ClientPermissionService} from "../client/client.permission";
import {TeamDataService} from "./team.data";
import {AppError} from "../../generated/types/common.pb";

/**
 * Manages authorizations for accessing team data.
 */
@Injectable()
export class TeamPermissionService {
  constructor(
    private readonly teamDataService: TeamDataService,
    private readonly userDataService: UserDataService,
    private readonly clientPermissionService: ClientPermissionService
  ) {}

  /** Gets highest permission operation that apply to a targeted team. */
  async getPermissionOp(args: {
    accessor: DBEntity.USER;
    accessorId: string;
    resource: DBEntity.TEAM;
    resourceId: string;
  }): Promise<PermissionOp> {
    const resourceAsTeamPromise = this.teamDataService.getTeam({
      teamId: args.resourceId,
    });
    const accessorAsUserPromise = this.userDataService.getUser({
      userId: args.accessorId,
    });
    const resourceAsTeam = await resourceAsTeamPromise;
    const accessorAsUser = await accessorAsUserPromise;
    if (resourceAsTeam.$type === AppError.$type) return PermissionOp.NONE;
    if (accessorAsUser.$type === AppError.$type) return PermissionOp.NONE;

    const permissionOps: PermissionOp[] = [];

    const permissionOfUser: Promise<Permission> = getPermission({
      accessor: DBEntity.USER,
      accessorId: args.accessorId,
      resource: DBEntity.TEAM,
      resourceId: args.resourceId,
    });

    if (resourceAsTeam.parent?.$case === "teamId") {
      const inheritedPermissionOp = this.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: args.accessorId,
        resource: DBEntity.TEAM,
        resourceId: resourceAsTeam.parent.teamId,
      });
      permissionOps.push(await inheritedPermissionOp);
    } else if (resourceAsTeam.parent?.$case === "clientId") {
      const inheritedPermissionOp =
        this.clientPermissionService.getPermissionOp({
          accessor: DBEntity.USER,
          accessorId: args.accessorId,
          resource: DBEntity.CLIENT,
          resourceId: resourceAsTeam.parent.clientId,
        });
      permissionOps.push(await inheritedPermissionOp);
    }

    if (accessorAsUser.teamId) {
      const permissionOfTeam: Promise<Permission> = getPermission({
        accessor: DBEntity.TEAM,
        accessorId: accessorAsUser.teamId,
        resource: DBEntity.TEAM,
        resourceId: args.resourceId,
      });
      permissionOps.push((await permissionOfTeam).operation);
    }

    permissionOps.push((await permissionOfUser).operation);

    return getHighestPermissionOp(permissionOps);
  }
}
