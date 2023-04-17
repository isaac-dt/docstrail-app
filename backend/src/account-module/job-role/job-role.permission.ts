import {Injectable} from "@dimetrail/firebase/core/utils";
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
import {AppError} from "../../generated/types/common.pb";
import {RootPermissionService} from "../root/root.permission";
import {JobRoleDataService} from "./job-role.data";

/**
 * Manages authorizations for accessing job role data.
 */
@Injectable()
export class JobRolePermissionService {
  constructor(
    private readonly jobRoleDataService: JobRoleDataService,
    private readonly userDataService: UserDataService,
    private readonly clientPermissionService: ClientPermissionService,
    private readonly rootPermissionService: RootPermissionService
  ) {}

  /** Gets highest permission operation that apply to a targeted job role. */
  async getPermissionOp(args: {
    accessor: DBEntity.USER;
    accessorId: string;
    resource: DBEntity.JOB_ROLE;
    resourceId: string;
  }): Promise<PermissionOp> {
    const resourceAsJobRolePromise = this.jobRoleDataService.getJobRole({
      jobRoleId: args.resourceId,
    });
    const accessorAsUserPromise = this.userDataService.getUser({
      userId: args.accessorId,
    });
    const permissionOps: PermissionOp[] = [];
    const resourceAsJobRole = await resourceAsJobRolePromise;
    const accessorAsUser = await accessorAsUserPromise;
    if (resourceAsJobRole.$type === AppError.$type) return PermissionOp.NONE;
    if (accessorAsUser.$type === AppError.$type) return PermissionOp.NONE;

    const permissionOfUser: Promise<Permission> = getPermission({
      accessor: DBEntity.USER,
      accessorId: args.accessorId,
      resource: DBEntity.JOB_ROLE,
      resourceId: args.resourceId,
    });

    if (resourceAsJobRole.parent?.$case === "clientId") {
      const inheritedPermissionOp =
        this.clientPermissionService.getPermissionOp({
          accessor: DBEntity.USER,
          accessorId: args.accessorId,
          resource: DBEntity.CLIENT,
          resourceId: resourceAsJobRole.parent.clientId,
        });
      permissionOps.push(await inheritedPermissionOp);
    } else if (resourceAsJobRole.parent?.$case === "rootId") {
      const inheritedPermissionOp = this.rootPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: args.accessorId,
        resource: DBEntity.ROOT,
        resourceId: resourceAsJobRole.parent.rootId,
      });
      permissionOps.push(await inheritedPermissionOp);
    }

    if (accessorAsUser.teamId) {
      const permissionOfTeam: Promise<Permission> = getPermission({
        accessor: DBEntity.TEAM,
        accessorId: accessorAsUser.teamId,
        resource: DBEntity.JOB_ROLE,
        resourceId: args.resourceId,
      });
      permissionOps.push((await permissionOfTeam).operation);
    }

    permissionOps.push((await permissionOfUser).operation);

    return getHighestPermissionOp(permissionOps);
  }
}
