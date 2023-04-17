import { DBEntity, PermissionOp } from "../../generated/types/permission.pb";
import { UserDataService } from "../../account-module/user/user.data";
import { TargetDataService } from "./target.data";
import { ClientPermissionService } from "../../account-module/client/client.permission";
/**
 * Manages authorizations for accessing target data.
 */
export declare class TargetPermissionService {
    private readonly targetDataService;
    private readonly userDataService;
    private readonly clientPermissionService;
    constructor(targetDataService: TargetDataService, userDataService: UserDataService, clientPermissionService: ClientPermissionService);
    /** Gets highest permission operation that apply to a targeted target. */
    getPermissionOp(args: {
        accessor: DBEntity.USER;
        accessorId: string;
        resource: DBEntity.TARGET;
        resourceId: string;
    }): Promise<PermissionOp>;
}
