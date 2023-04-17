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
import {ClientPermissionService} from "../../../account-module/client/client.permission";
import {AppError} from "../../../generated/types/common.pb";
import {RootPermissionService} from "../../../account-module/root/root.permission";
import {BundleDataService} from "./bundle.data";

/**
 * Manages authorizations for accessing bundle data.
 */
@Injectable()
export class BundlePermissionService {
  constructor(
    private readonly bundleDataService: BundleDataService,
    private readonly userDataService: UserDataService,
    private readonly clientPermissionService: ClientPermissionService,
    private readonly rootPermissionService: RootPermissionService
  ) {}

  /** Gets highest permission operation that apply to a targeted bundle. */
  async getPermissionOp(args: {
    accessor: DBEntity.USER;
    accessorId: string;
    resource: DBEntity.BUNDLE;
    resourceId: string;
  }): Promise<PermissionOp> {
    const resourceAsBundlePromise = this.bundleDataService.getBundle({
      bundleId: args.resourceId,
    });
    const accessorAsUserPromise = this.userDataService.getUser({
      userId: args.accessorId,
    });
    const permissionOps: PermissionOp[] = [];
    const resourceAsBundle = await resourceAsBundlePromise;
    const accessorAsUser = await accessorAsUserPromise;
    if (resourceAsBundle.$type === AppError.$type) return PermissionOp.NONE;
    if (accessorAsUser.$type === AppError.$type) return PermissionOp.NONE;

    const permissionOfUser: Promise<Permission> = getPermission({
      accessor: DBEntity.USER,
      accessorId: args.accessorId,
      resource: DBEntity.BUNDLE,
      resourceId: args.resourceId,
    });

    if (resourceAsBundle.parent?.$case === "clientId") {
      const inheritedPermissionOp =
        this.clientPermissionService.getPermissionOp({
          accessor: DBEntity.USER,
          accessorId: args.accessorId,
          resource: DBEntity.CLIENT,
          resourceId: resourceAsBundle.parent.clientId,
        });
      permissionOps.push(await inheritedPermissionOp);
    } else if (resourceAsBundle.parent?.$case === "rootId") {
      const inheritedPermissionOp = this.rootPermissionService.getPermissionOp({
        accessor: DBEntity.USER,
        accessorId: args.accessorId,
        resource: DBEntity.ROOT,
        resourceId: resourceAsBundle.parent.rootId,
      });
      permissionOps.push(await inheritedPermissionOp);
    }

    if (accessorAsUser.teamId) {
      const permissionOfTeam: Promise<Permission> = getPermission({
        accessor: DBEntity.TEAM,
        accessorId: accessorAsUser.teamId,
        resource: DBEntity.BUNDLE,
        resourceId: args.resourceId,
      });
      permissionOps.push((await permissionOfTeam).operation);
    }

    permissionOps.push((await permissionOfUser).operation);

    return getHighestPermissionOp(permissionOps);
  }
}
