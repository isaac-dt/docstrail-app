import { Request, Response } from "../../../framework/core/https";
import { ProposalPermissionService } from "../../proposal-module/proposal/proposal.permission";
import { ProposalDataService } from "../../proposal-module/proposal/proposal.data";
import { UserDataService } from "../../account-module/user/user.data";
import { ProposalReviewPermissionService } from "./review.permission";
import { ProposalReviewDataService } from "./review.data";
/** Controller for proposal review requests. */
export declare class ProposalReviewController {
    private readonly proposalReviewPermissionService;
    private readonly proposalReviewDataService;
    private readonly proposalPermissionService;
    private readonly proposalDataService;
    private readonly userDataService;
    readonly db: FirebaseFirestore.Firestore;
    constructor(proposalReviewPermissionService: ProposalReviewPermissionService, proposalReviewDataService: ProposalReviewDataService, proposalPermissionService: ProposalPermissionService, proposalDataService: ProposalDataService, userDataService: UserDataService);
    getProposalReview(req: Request, res: Response): Promise<Response>;
    getProposalReviews(req: Request, res: Response): Promise<Response>;
    createProposalReview(req: Request, res: Response): Promise<Response>;
    updateProposalReviewFields(req: Request, res: Response): Promise<Response>;
    deleteProposalReview(req: Request, res: Response): Promise<Response>;
    private buildGetProposalReviewResponse;
}
