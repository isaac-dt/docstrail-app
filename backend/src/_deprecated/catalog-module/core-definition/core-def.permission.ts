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
import {CoreDefinitionDataService} from "./core-def.data";

/**
 * Manages authorizations for accessing core definition data.
 */
@Injectable()
export class CoreDefinitionPermissionService {
  constructor(
    private readonly rootPermissionService: RootPermissionService,
    private readonly userDataService: UserDataService,
    private readonly coreDefinitionDataService: CoreDefinitionDataService
  ) {}
  /** Gets permission operations that apply to a targeted core definition. */
  async getPermissionOp(args: {
    accessor: DBEntity.USER;
    accessorId: string;
    resource: DBEntity.CORE_DEFINITION;
    resourceId: string;
  }): Promise<PermissionOp> {
    const resourceAsCoreDefPromise =
      this.coreDefinitionDataService.getCoreDefinition({
        coreDefinitionId: args.resourceId,
      });
    const accessorAsUserPromise = this.userDataService.getUser({
      userId: args.accessorId,
    });
    const resourceAsCoreDef = await resourceAsCoreDefPromise;
    const accessorAsUser = await accessorAsUserPromise;
    if (resourceAsCoreDef.$type === AppError.$type) return PermissionOp.NONE;
    if (accessorAsUser.$type === AppError.$type) return PermissionOp.NONE;

    const permissionOfUser: Promise<Permission> = getPermission({
      accessor: DBEntity.USER,
      accessorId: args.accessorId,
      resource: DBEntity.CORE_DEFINITION,
      resourceId: args.resourceId,
    });

    const inheritedPermissionOp = this.rootPermissionService.getPermissionOp({
      accessor: DBEntity.USER,
      accessorId: args.accessorId,
      resource: DBEntity.ROOT,
      resourceId: resourceAsCoreDef.rootId,
    });

    if (accessorAsUser.teamId) {
      const permissionOfTeam: Promise<Permission> = getPermission({
        accessor: DBEntity.TEAM,
        accessorId: accessorAsUser.teamId,
        resource: DBEntity.CORE_DEFINITION,
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
