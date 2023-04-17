import { Request, Response } from "@dimetrail/firebase/core/https";
import { TargetDataService } from "./target.data";
import { TargetPermissionService } from "./target.permission";
import { ClientDataService } from "../../account-module/client/client.data";
import { ClientPermissionService } from "../../account-module/client/client.permission";
import { UserDataService } from "../../account-module/user/user.data";
import { TeamDataService } from "../../account-module/team/team.data";
import { UserPermissionService } from "../../account-module/user/user.permission";
import { TeamPermissionService } from "../../account-module/team/team.permission";
import { JobRoleDataService } from "../../account-module/job-role/job-role.data";
import { JobRolePermissionService } from "../../account-module/job-role/job-role.permission";
/** Controller for Target requests. */
export declare class TargetController {
    private readonly targetDataService;
    private readonly targetPermissionService;
    private readonly clientDataService;
    private readonly clientPermissionService;
    private readonly userDataService;
    private readonly userPermissionService;
    private readonly teamDataService;
    private readonly teamPermissionService;
    private readonly jobRolePermissionService;
    private readonly jobRoleDataService;
    readonly db: FirebaseFirestore.Firestore;
    constructor(targetDataService: TargetDataService, targetPermissionService: TargetPermissionService, clientDataService: ClientDataService, clientPermissionService: ClientPermissionService, userDataService: UserDataService, userPermissionService: UserPermissionService, teamDataService: TeamDataService, teamPermissionService: TeamPermissionService, jobRolePermissionService: JobRolePermissionService, jobRoleDataService: JobRoleDataService);
    getTarget(req: Request, res: Response): Promise<Response>;
    createTarget(req: Request, res: Response): Promise<Response>;
    updateTargetFields(req: Request, res: Response): Promise<Response>;
    addUser(req: Request, res: Response): Promise<Response>;
    deleteUser(req: Request, res: Response): Promise<Response>;
    addTeam(req: Request, res: Response): Promise<Response>;
    deleteTeam(req: Request, res: Response): Promise<Response>;
    addJobRole(req: Request, res: Response): Promise<Response>;
    deleteJobRole(req: Request, res: Response): Promise<Response>;
    shareAccess(req: Request, res: Response): Promise<Response>;
    private buildGetTargetResponse;
}
