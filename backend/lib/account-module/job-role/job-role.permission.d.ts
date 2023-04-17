import { DBEntity, PermissionOp } from "../../generated/types/permission.pb";
import { UserDataService } from "../user/user.data";
import { ClientPermissionService } from "../client/client.permission";
import { RootPermissionService } from "../root/root.permission";
import { JobRoleDataService } from "./job-role.data";
/**
 * Manages authorizations for accessing job role data.
 */
export declare class JobRolePermissionService {
    private readonly jobRoleDataService;
    private readonly userDataService;
    private readonly clientPermissionService;
    private readonly rootPermissionService;
    constructor(jobRoleDataService: JobRoleDataService, userDataService: UserDataService, clientPermissionService: ClientPermissionService, rootPermissionService: RootPermissionService);
    /** Gets highest permission operation that apply to a targeted job role. */
    getPermissionOp(args: {
        accessor: DBEntity.USER;
        accessorId: string;
        resource: DBEntity.JOB_ROLE;
        resourceId: string;
    }): Promise<PermissionOp>;
}
