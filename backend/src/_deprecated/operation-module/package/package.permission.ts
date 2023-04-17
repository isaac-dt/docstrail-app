import {Injectable} from "@dimetrail/firebase/core/utils";
import {
  DBEntity,
  Permission,
  PermissionOp,
} from "../../../generated/types/permission.pb";
import {
  // getHighestPermissionOp,
  getPermission,
} from "../../../shared/permission/permission.data";
import {UserDataService} from "../../../account-module/user/user.data";
// import {ClientPermissionService} from "../../../account-module/client/client.permission";
import {AppError} from "../../../generated/types/common.pb";
// import {RootPermissionService} from "../../../account-module/root/root.permission";
import {PackageDataService} from "./package.data";

/**
 * Manages authorizations for accessing package data.
 */
@Injectable()
export class PackagePermissionService {
  constructor(
    private readonly packageDataService: PackageDataService,
    private readonly userDataService: UserDataService
  ) // private readonly clientPermissionService: ClientPermissionService,
  // private readonly rootPermissionService: RootPermissionService
  {}

  /** Gets highest permission operation that apply to a targeted package. */
  async getPermissionOp(args: {
    accessor: DBEntity.USER;
    accessorId: string;
    resource: DBEntity.PACKAGE;
    resourceId: string;
  }): Promise<PermissionOp> {
    const resourceAsPackagePromise = this.packageDataService.getPackage({
      packageId: args.resourceId,
    });
    const accessorAsUserPromise = this.userDataService.getUser({
      userId: args.accessorId,
    });
    // const permissionOps: PermissionOp[] = [];
    const resourceAsPackage = await resourceAsPackagePromise;
    const accessorAsUser = await accessorAsUserPromise;
    if (resourceAsPackage.$type === AppError.$type) return PermissionOp.NONE;
    if (accessorAsUser.$type === AppError.$type) return PermissionOp.NONE;

    const permissionOfUser: Promise<Permission> = getPermission({
      accessor: DBEntity.USER,
      accessorId: args.accessorId,
      resource: DBEntity.PACKAGE,
      resourceId: args.resourceId,
    });

    return (await permissionOfUser).operation;

    // const permissionOfTeam: Promise<Permission> = getPermission({
    //   accessor: DBEntity.TEAM,
    //   accessorId: accessorAsUser.teamId,
    //   resource: DBEntity.PACKAGE,
    //   resourceId: args.resourceId,
    // });

    // if (resourceAsPackage.parent?.$case === "clientId") {
    //   const inheritedPermissionOp =
    //     this.clientPermissionService.getPermissionOp({
    //       accessor: DBEntity.USER,
    //       accessorId: args.accessorId,
    //       resource: DBEntity.CLIENT,
    //       resourceId: resourceAsPackage.parent.clientId,
    //     });
    //   permissionOps.push(await inheritedPermissionOp);
    // } else if (resourceAsPackage.parent?.$case === "rootId") {
    //   const inheritedPermissionOp = this.rootPermissionService.getPermissionOp({
    //     accessor: DBEntity.USER,
    //     accessorId: args.accessorId,
    //     resource: DBEntity.ROOT,
    //     resourceId: resourceAsPackage.parent.rootId,
    //   });
    //   permissionOps.push(await inheritedPermissionOp);
    // }

    // permissionOps.push((await permissionOfUser).operation);
    // permissionOps.push((await permissionOfTeam).operation);

    // return getHighestPermissionOp(permissionOps);
  }
}
