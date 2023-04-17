import { DBEntity, PermissionOp } from "../../generated/types/permission.pb";
import { UserDataService } from "../user/user.data";
/**
 * Manages authorizations for accessing root data.
 */
export declare class RootPermissionService {
    private readonly userDataService;
    constructor(userDataService: UserDataService);
    /** Gets permission operations that apply to a targeted root. */
    getPermissionOp(args: {
        accessor: DBEntity.USER;
        accessorId: string;
        resource: DBEntity.ROOT;
        resourceId: string;
    }): Promise<PermissionOp>;
}
