import { ClientPermissionService } from "../../../account-module/client/client.permission";
import { UserDataService } from "../../../account-module/user/user.data";
import { DBEntity, PermissionOp } from "../../../generated/types/permission.pb";
import { AllowListDataService } from "./allow-list.data";
/**
 * Manages authorizations for accessing allow list data.
 */
export declare class AllowListPermissionService {
    private readonly userDataService;
    private readonly clientPermissionService;
    private readonly allowListDataService;
    constructor(userDataService: UserDataService, clientPermissionService: ClientPermissionService, allowListDataService: AllowListDataService);
    /** Gets permission operations that apply to a targeted allow list. */
    getPermissionOp(args: {
        accessor: DBEntity.USER;
        accessorId: string;
        resource: DBEntity.ALLOW_LIST;
        resourceId: string;
    }): Promise<PermissionOp>;
}
