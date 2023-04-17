import { UserDataService } from "../../account-module/user/user.data";
import { DBEntity, PermissionOp } from "../../generated/types/permission.pb";
import { ProposalPermissionService } from "../../proposal-module/proposal/proposal.permission";
import { ProposalReviewDataService } from "./review.data";
/**
 * Manages authorizations for accessing proposal review data.
 */
export declare class ProposalReviewPermissionService {
    private readonly userDataService;
    private readonly proposalPermissionService;
    private readonly proposalReviewData;
    constructor(userDataService: UserDataService, proposalPermissionService: ProposalPermissionService, proposalReviewData: ProposalReviewDataService);
    /** Gets permission operations that apply to a targeted proposal. */
    getPermissionOp(args: {
        accessor: DBEntity.USER;
        accessorId: string;
        resource: DBEntity.PROPOSAL_REVIEW;
        resourceId: string;
    }): Promise<PermissionOp>;
}
