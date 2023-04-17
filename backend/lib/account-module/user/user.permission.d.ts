import { DBEntity, PermissionOp } from "../../generated/types/permission.pb";
import { TeamPermissionService } from "../team/team.permission";
import { UserDataService } from "./user.data";
/** Manages permissions related to user data. */
export declare class UserPermissionService {
    private readonly userDataService;
    private readonly teamPermissionService;
    constructor(userDataService: UserDataService, teamPermissionService: TeamPermissionService);
    /** Gets highest permission operation that apply to a targeted user. */
    getPermissionOp(args: {
        accessor: DBEntity.USER;
        accessorId: string;
        resource: DBEntity.USER;
        resourceId: string;
    }): Promise<PermissionOp>;
}
