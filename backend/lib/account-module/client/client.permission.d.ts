import { DBEntity, PermissionOp } from "../../generated/types/permission.pb";
import { RootPermissionService } from "../root/root.permission";
import { UserDataService } from "../user/user.data";
import { ClientDataService } from "./client.data";
/**
 * Manages authorizations for accessing client data.
 */
export declare class ClientPermissionService {
    private readonly rootPermissionService;
    private readonly userDataService;
    private readonly clientDataService;
    constructor(rootPermissionService: RootPermissionService, userDataService: UserDataService, clientDataService: ClientDataService);
    /** Gets permission operations that apply to a targeted client. */
    getPermissionOp(args: {
        accessor: DBEntity.USER;
        accessorId: string;
        resource: DBEntity.CLIENT;
        resourceId: string;
    }): Promise<PermissionOp>;
}
