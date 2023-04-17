import { DBEntity, PermissionOp } from "../../generated/types/permission.pb";
import { UserDataService } from "../user/user.data";
import { ClientPermissionService } from "../client/client.permission";
import { TeamDataService } from "./team.data";
/**
 * Manages authorizations for accessing team data.
 */
export declare class TeamPermissionService {
    private readonly teamDataService;
    private readonly userDataService;
    private readonly clientPermissionService;
    constructor(teamDataService: TeamDataService, userDataService: UserDataService, clientPermissionService: ClientPermissionService);
    /** Gets highest permission operation that apply to a targeted team. */
    getPermissionOp(args: {
        accessor: DBEntity.USER;
        accessorId: string;
        resource: DBEntity.TEAM;
        resourceId: string;
    }): Promise<PermissionOp>;
}
