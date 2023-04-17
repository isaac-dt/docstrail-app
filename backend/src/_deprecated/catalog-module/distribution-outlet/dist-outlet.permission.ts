import {Injectable} from "@dimetrail/firebase/core/utils";
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
import {CompanyPermissionService} from "../company/company.permission";
import {DistributionOutletDataService} from "./dist-outlet.data";

/**
 * Manages authorizations for accessing distribution outlet data.
 */
@Injectable()
export class DistributionOutletPermissionService {
  constructor(
    private readonly companyPermissionService: CompanyPermissionService,
    private readonly userDataService: UserDataService,
    private readonly distOutletDataService: DistributionOutletDataService
  ) {}
  /** Gets permission operations that apply to a targeted distribution outlet. */
  async getPermissionOp(args: {
    accessor: DBEntity.USER;
    accessorId: string;
    resource: DBEntity.DISTRIBUTION_OUTLET;
    resourceId: string;
  }): Promise<PermissionOp> {
    const resourceAsDistOutletPromise =
      this.distOutletDataService.getDistOutlet({
        distOutletId: args.resourceId,
      });
    const accessorAsUserPromise = this.userDataService.getUser({
      userId: args.accessorId,
    });
    const resourceAsDistOutlet = await resourceAsDistOutletPromise;
    const accessorAsUser = await accessorAsUserPromise;
    if (resourceAsDistOutlet.$type === AppError.$type) return PermissionOp.NONE;
    if (accessorAsUser.$type === AppError.$type) return PermissionOp.NONE;

    const permissionOfUser: Promise<Permission> = getPermission({
      accessor: DBEntity.USER,
      accessorId: args.accessorId,
      resource: DBEntity.DISTRIBUTION_OUTLET,
      resourceId: args.resourceId,
    });

    const inheritedPermissionOp = this.companyPermissionService.getPermissionOp(
      {
        accessor: DBEntity.USER,
        accessorId: args.accessorId,
        resource: DBEntity.COMPANY,
        resourceId: resourceAsDistOutlet.companyId,
      }
    );

    if (accessorAsUser.teamId) {
      const permissionOfTeam: Promise<Permission> = getPermission({
        accessor: DBEntity.TEAM,
        accessorId: accessorAsUser.teamId,
        resource: DBEntity.DISTRIBUTION_OUTLET,
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
