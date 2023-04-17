import { Request, Response } from "@dimetrail/firebase/core/https";
import { ClientDataService } from "../../account-module/client/client.data";
import { TeamDataService } from "../../account-module/team/team.data";
import { UserDataService } from "../../account-module/user/user.data";
/** Controller for Org Signup. */
export declare class OrgSignupController {
    readonly clientDataService: ClientDataService;
    readonly teamDataService: TeamDataService;
    readonly userDataService: UserDataService;
    constructor(clientDataService: ClientDataService, teamDataService: TeamDataService, userDataService: UserDataService);
    createUser(req: Request, res: Response): Promise<Response>;
    /** @deprecated Use {@link createUser} instead. */
    createClientAndUser(req: Request, res: Response): Promise<Response>;
}
