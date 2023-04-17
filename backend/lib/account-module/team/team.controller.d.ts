import { Request, Response } from "../../../framework/core/https";
import { TeamDataService } from "./team.data";
import { TeamPermissionService } from "./team.permission";
import { ClientPermissionService } from "../client/client.permission";
import { ClientDataService } from "../client/client.data";
import { UserDataService } from "../user/user.data";
/** Controller for Team requests. */
export declare class TeamController {
    private readonly teamDataService;
    private readonly teamPermissionService;
    private readonly clientPermissionService;
    private readonly clientDataService;
    private readonly userDataService;
    readonly db: FirebaseFirestore.Firestore;
    constructor(teamDataService: TeamDataService, teamPermissionService: TeamPermissionService, clientPermissionService: ClientPermissionService, clientDataService: ClientDataService, userDataService: UserDataService);
    getTeam(req: Request, res: Response): Promise<Response>;
    createTeam(req: Request, res: Response): Promise<Response>;
    updateTeamFields(req: Request, res: Response): Promise<Response>;
    shareAccess(req: Request, res: Response): Promise<Response>;
    private buildGetTeamResponse;
}
