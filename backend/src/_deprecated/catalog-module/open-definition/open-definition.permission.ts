import {Injectable} from "@dimetrail/firebase/core/utils";
import {ClientPermissionService} from "../../../account-module/client/client.permission";
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
import {OpenDefinitionDataService} from "./open-definition.data";

/**
 * Manages authorizations for accessing open definition data.
 */
@Injectable()
export class OpenDefinitionPermissionService {
  constructor(
    private readonly rootPermissionService: RootPermissionService,
    private readonly userDataService: UserDataService,
    private readonly openDefinitionData: OpenDefinitionDataService,
    private readonly clientPermissionService: ClientPermissionService
  ) {}
  /** Gets permission operations that apply to a targeted open definition. */
  async getPermissionOp(args: {
    accessor: DBEntity.USER;
    accessorId: string;
    resource: DBEntity.OPEN_DEFINITION;
    resourceId: string;
  }): Promise<PermissionOp> {
    const resourceAsOpenDefPromise = this.openDefinitionData.getOpenDefinition({
      openDefinitionId: args.resourceId,
    });
    const accessorAsUserPromise = this.userDataService.getUser({
      userId: args.accessorId,
    });
    const resourceAsOpenDef = await resourceAsOpenDefPromise;
    const accessorAsUser = await accessorAsUserPromise;
    if (resourceAsOpenDef.$type === AppError.$type) return PermissionOp.NONE;
    if (accessorAsUser.$type === AppError.$type) return PermissionOp.NONE;

    const permissionOps: PermissionOp[] = [];

    const permissionOfUser: Promise<Permission> = getPermission({
      accessor: DBEntity.USER,
      accessorId: args.accessorId,
      resource: DBEntity.OPEN_DEFINITION,
      resourceId: args.resourceId,
    });

    if (resourceAsOpenDef.parent?.$case === "rootId") {
      const inheritedPermissionOp =
        await this.rootPermissionService.getPermissionOp({
          accessor: DBEntity.USER,
          accessorId: args.accessorId,
          resource: DBEntity.ROOT,
          resourceId: resourceAsOpenDef.parent.rootId,
        });
      permissionOps.push(await inheritedPermissionOp);
    } else if (resourceAsOpenDef.parent?.$case === "clientId") {
      const inheritedPermissionOp =
        await this.clientPermissionService.getPermissionOp({
          accessor: DBEntity.USER,
          accessorId: args.accessorId,
          resource: DBEntity.CLIENT,
          resourceId: resourceAsOpenDef.parent.clientId,
        });
      permissionOps.push(await inheritedPermissionOp);
    }

    if (accessorAsUser.teamId) {
      const permissionOfTeam: Promise<Permission> = getPermission({
        accessor: DBEntity.TEAM,
        accessorId: accessorAsUser.teamId,
        resource: DBEntity.OPEN_DEFINITION,
        resourceId: args.resourceId,
      });
      permissionOps.push((await permissionOfTeam).operation);
    }

    permissionOps.push((await permissionOfUser).operation);

    return getHighestPermissionOp(permissionOps);
  }
}
