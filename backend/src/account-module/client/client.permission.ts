import {Injectable} from "../../../framework/core/utils";
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
import {RootPermissionService} from "../root/root.permission";
import {UserDataService} from "../user/user.data";
import {ClientDataService} from "./client.data";

/**
 * Manages authorizations for accessing client data.
 */
@Injectable()
export class ClientPermissionService {
  constructor(
    private readonly rootPermissionService: RootPermissionService,
    private readonly userDataService: UserDataService,
    private readonly clientDataService: ClientDataService
  ) {}
  /** Gets permission operations that apply to a targeted client. */
  async getPermissionOp(args: {
    accessor: DBEntity.USER;
    accessorId: string;
    resource: DBEntity.CLIENT;
    resourceId: string;
  }): Promise<PermissionOp> {
    const resourceAsClientPromise = this.clientDataService.getClient({
      clientId: args.resourceId,
    });
    const accessorAsUserPromise = this.userDataService.getUser({
      userId: args.accessorId,
    });
    const resourceAsClient = await resourceAsClientPromise;
    const accessorAsUser = await accessorAsUserPromise;
    if (resourceAsClient.$type === AppError.$type) return PermissionOp.NONE;
    if (accessorAsUser.$type === AppError.$type) return PermissionOp.NONE;

    const permissionOfUser: Promise<Permission> = getPermission({
      accessor: DBEntity.USER,
      accessorId: args.accessorId,
      resource: DBEntity.CLIENT,
      resourceId: args.resourceId,
    });

    const inheritedPermissionOp = this.rootPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: args.accessorId,
      resource: DBEntity.ROOT,
      resourceId: resourceAsClient.rootId,
    });

    if (accessorAsUser.teamId) {
      const permissionOfTeam: Promise<Permission> = getPermission({
        accessor: DBEntity.TEAM,
        accessorId: accessorAsUser.teamId,
        resource: DBEntity.CLIENT,
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
