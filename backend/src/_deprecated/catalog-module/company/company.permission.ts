import {Injectable} from "@dimetrail/firebase/core/utils";
import {RootPermissionService} from "../../../account-module/root/root.permission";
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
import {CompanyDataService} from "./company.data";

/**
 * Manages authorizations for accessing company data.
 */
@Injectable()
export class CompanyPermissionService {
  constructor(
    private readonly userDataService: UserDataService,
    private readonly rootPermissionService: RootPermissionService,
    private readonly companyDataService: CompanyDataService
  ) {}

  /** Gets permission operations that apply to a targeted company. */
  async getPermissionOp(args: {
    accessor: DBEntity.USER;
    accessorId: string;
    resource: DBEntity.COMPANY;
    resourceId: string;
  }): Promise<PermissionOp> {
    const resourceAsCompanyPromise = this.companyDataService.getCompany({
      companyId: args.resourceId,
    });
    const accessorAsUserPromise = this.userDataService.getUser({
      userId: args.accessorId,
    });
    const resourceAsCompany = await resourceAsCompanyPromise;
    const accessorAsUser = await accessorAsUserPromise;
    if (resourceAsCompany.$type === AppError.$type) return PermissionOp.NONE;
    if (accessorAsUser.$type === AppError.$type) return PermissionOp.NONE;

    const permissionOfUser: Promise<Permission> = getPermission({
      accessor: DBEntity.USER,
      accessorId: args.accessorId,
      resource: DBEntity.COMPANY,
      resourceId: args.resourceId,
    });

    const inheritedPermissionOp = this.rootPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: args.accessorId,
      resource: DBEntity.ROOT,
      resourceId: resourceAsCompany.rootId,
    });

    if (accessorAsUser.teamId) {
      const permissionOfTeam: Promise<Permission> = getPermission({
        accessor: DBEntity.TEAM,
        accessorId: accessorAsUser.teamId,
        resource: DBEntity.COMPANY,
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
