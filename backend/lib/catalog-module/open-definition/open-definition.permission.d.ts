import { ClientPermissionService } from "../../account-module/client/client.permission";
import { RootPermissionService } from "../../account-module/root/root.permission";
import { UserDataService } from "../../account-module/user/user.data";
import { DBEntity, PermissionOp } from "../../generated/types/permission.pb";
import { OpenDefinitionDataService } from "./open-definition.data";
/**
 * Manages authorizations for accessing open definition data.
 */
export declare class OpenDefinitionPermissionService {
    private readonly rootPermissionService;
    private readonly userDataService;
    private readonly openDefinitionData;
    private readonly clientPermissionService;
    constructor(rootPermissionService: RootPermissionService, userDataService: UserDataService, openDefinitionData: OpenDefinitionDataService, clientPermissionService: ClientPermissionService);
    /** Gets permission operations that apply to a targeted open definition. */
    getPermissionOp(args: {
        accessor: DBEntity.USER;
        accessorId: string;
        resource: DBEntity.OPEN_DEFINITION;
        resourceId: string;
    }): Promise<PermissionOp>;
}
