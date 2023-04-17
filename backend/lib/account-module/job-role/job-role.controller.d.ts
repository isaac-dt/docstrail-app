import { Request, Response } from "../../../framework/core/https";
import { ClientPermissionService } from "../client/client.permission";
import { ClientDataService } from "../client/client.data";
import { JobRoleDataService } from "./job-role.data";
import { JobRolePermissionService } from "./job-role.permission";
import { RootPermissionService } from "../root/root.permission";
import { RootDataService } from "../root/root.data";
/** Controller for Job role requests. */
export declare class JobRoleController {
    private readonly jobRoleDataService;
    private readonly jobRolePermissionService;
    private readonly clientPermissionService;
    private readonly rootPermissionService;
    private readonly rootDataService;
    private readonly clientDataService;
    readonly db: FirebaseFirestore.Firestore;
    constructor(jobRoleDataService: JobRoleDataService, jobRolePermissionService: JobRolePermissionService, clientPermissionService: ClientPermissionService, rootPermissionService: RootPermissionService, rootDataService: RootDataService, clientDataService: ClientDataService);
    getJobRole(req: Request, res: Response): Promise<Response>;
    getJobRolesAtRoot(req: Request, res: Response): Promise<Response>;
    getJobRolesAtClient(req: Request, res: Response): Promise<Response>;
    private getJobRoles;
    createJobRole(req: Request, res: Response): Promise<Response>;
    updateJobRoleFields(req: Request, res: Response): Promise<Response>;
    shareAccess(req: Request, res: Response): Promise<Response>;
    private buildGetJobRoleResponse;
}
