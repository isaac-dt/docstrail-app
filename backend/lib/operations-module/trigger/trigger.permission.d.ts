import { DBEntity, PermissionOp } from "../../generated/types/permission.pb";
import { UserDataService } from "../../account-module/user/user.data";
import { RootPermissionService } from "../../account-module/root/root.permission";
import { TriggerDataService } from "./trigger.data";
/**
 * Manages authorizations for accessing trigger data.
 */
export declare class TriggerPermissionService {
    private readonly triggerDataService;
    private readonly userDataService;
    private readonly rootPermissionService;
    constructor(triggerDataService: TriggerDataService, userDataService: UserDataService, rootPermissionService: RootPermissionService);
    /** Gets highest permission operation that apply to a targeted trigger. */
    getPermissionOp(args: {
        accessor: DBEntity.USER;
        accessorId: string;
        resource: DBEntity.TRIGGER;
        resourceId: string;
    }): Promise<PermissionOp>;
}
