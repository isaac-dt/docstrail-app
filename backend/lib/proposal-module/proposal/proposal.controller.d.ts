import { Request, Response } from "../../../framework/core/https";
import { ProposalPermissionService } from "./proposal.permission";
import { ProposalDataService } from "./proposal.data";
import { UserDataService } from "../../account-module/user/user.data";
/** Controller for proposal requests. */
export declare class ProposalController {
    private readonly proposalDataService;
    private readonly proposalPermissionService;
    private readonly userDataService;
    readonly db: FirebaseFirestore.Firestore;
    constructor(proposalDataService: ProposalDataService, proposalPermissionService: ProposalPermissionService, userDataService: UserDataService);
    getProposal(req: Request, res: Response): Promise<Response>;
    getProposals(req: Request, res: Response): Promise<Response>;
    createProposal(req: Request, res: Response): Promise<Response>;
    updateProposalFields(req: Request, res: Response): Promise<Response>;
    deleteProposal(req: Request, res: Response): Promise<Response>;
    setPermission(req: Request, res: Response): Promise<Response>;
    private buildGetProposalResponse;
}
