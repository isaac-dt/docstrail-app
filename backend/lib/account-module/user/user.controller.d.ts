import { Request, Response } from "@dimetrail/firebase/core/https";
import { UserPermissionService } from "./user.permission";
import { UserDataService } from "./user.data";
import { TeamPermissionService } from "../team/team.permission";
import { TeamDataService } from "../team/team.data";
import { RootPermissionService } from "../root/root.permission";
import { ClientPermissionService } from "../client/client.permission";
import { JobRolePermissionService } from "../job-role/job-role.permission";
import { JobRoleDataService } from "../job-role/job-role.data";
/** Controller for User requests. */
export declare class UserController {
    private readonly userDataService;
    private readonly userPermissionService;
    private readonly teamPermissionService;
    private readonly teamDataService;
    private readonly jobRoleDataService;
    private readonly rootPermissionService;
    private readonly clientPermissionService;
    private readonly jobRolePermissionService;
    readonly db: FirebaseFirestore.Firestore;
    constructor(userDataService: UserDataService, userPermissionService: UserPermissionService, teamPermissionService: TeamPermissionService, teamDataService: TeamDataService, jobRoleDataService: JobRoleDataService, rootPermissionService: RootPermissionService, clientPermissionService: ClientPermissionService, jobRolePermissionService: JobRolePermissionService);
    getUser(req: Request, res: Response): Promise<Response>;
    /** Requires that a userId be already created via Firebase auth. */
    createOrReplaceUser(req: Request, res: Response): Promise<Response>;
    updateUserFields(req: Request, res: Response): Promise<Response>;
    addJobRole(req: Request, res: Response): Promise<Response>;
    deleteJobRole(req: Request, res: Response): Promise<Response>;
    shareAccess(req: Request, res: Response): Promise<Response>;
    private buildGetUserResponse;
}
