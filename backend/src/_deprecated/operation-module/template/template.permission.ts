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
// import {BundlePermissionService} from "../bundle/bundle.permission";
import {TemplateDataService} from "./template.data";

/**
 * Manages authorizations for accessing template data.
 */
@Injectable()
export class TemplatePermissionService {
  constructor(
    private readonly userDataService: UserDataService,
    // private readonly bundlePermissionService: BundlePermissionService,
    private readonly templateDataService: TemplateDataService
  ) {}

  /** Gets permission operations that apply to a targeted template. */
  async getPermissionOp(args: {
    accessor: DBEntity.USER;
    accessorId: string;
    resource: DBEntity.TEMPLATE;
    resourceId: string;
  }): Promise<PermissionOp> {
    const resourceAsTemplatePromise = this.templateDataService.getTemplate({
      templateId: args.resourceId,
    });
    const accessorAsUserPromise = this.userDataService.getUser({
      userId: args.accessorId,
    });
    const resourceAsTemplate = await resourceAsTemplatePromise;
    const accessorAsUser = await accessorAsUserPromise;
    if (resourceAsTemplate.$type === AppError.$type) return PermissionOp.NONE;
    if (accessorAsUser.$type === AppError.$type) return PermissionOp.NONE;

    const permissionOfUser: Promise<Permission> = getPermission({
      accessor: DBEntity.USER,
      accessorId: args.accessorId,
      resource: DBEntity.TEMPLATE,
      resourceId: args.resourceId,
    });
    return getHighestPermissionOp([(await permissionOfUser).operation]);
    // const permissionOfTeam: Promise<Permission> = getPermission({
    //   accessor: DBEntity.TEAM,
    //   accessorId: accessorAsUser.teamId,
    //   resource: DBEntity.TEMPLATE,
    //   resourceId: args.resourceId,
    // });

    // const inheritedPermissionOp = this.bundlePermissionService.getPermissionOp({
    //   accessor: DBEntity.USER,
    //   accessorId: args.accessorId,
    //   resource: DBEntity.BUNDLE,
    //   resourceId: resourceAsTemplate.bundleId,
    // });

    // return getHighestPermissionOp([
    //   (await permissionOfUser).operation,
    //   (await permissionOfTeam).operation,
    //   await inheritedPermissionOp,
    // ]);
  }
}
