import { RootPermissionService } from "../../account-module/root/root.permission";
import { UserDataService } from "../../account-module/user/user.data";
import { DBEntity, PermissionOp } from "../../generated/types/permission.pb";
import { CoreDefinitionDataService } from "./core-def.data";
/**
 * Manages authorizations for accessing core definition data.
 */
export declare class CoreDefinitionPermissionService {
    private readonly rootPermissionService;
    private readonly userDataService;
    private readonly coreDefinitionDataService;
    constructor(rootPermissionService: RootPermissionService, userDataService: UserDataService, coreDefinitionDataService: CoreDefinitionDataService);
    /** Gets permission operations that apply to a targeted core definition. */
    getPermissionOp(args: {
        accessor: DBEntity.USER;
        accessorId: string;
        resource: DBEntity.CORE_DEFINITION;
        resourceId: string;
    }): Promise<PermissionOp>;
}
