import { AppError } from "../../generated/types/common.pb";
import { ProposalReview } from "../../generated/types/trail/proposal/review.pb";
import { WriteProposalReviewRequest } from "../../generated/types/trail/proposal/review.api.pb";
/**
 * Manages operations on proposal review data.
 */
export declare class ProposalReviewDataService {
    readonly db: FirebaseFirestore.Firestore;
    getProposalReview(args: {
        proposalReviewId: string;
    }): Promise<ProposalReview | AppError>;
    getProposalReviewsOfProposal(args: {
        proposalId: string;
    }): Promise<readonly ProposalReview[]>;
    createProposalReview(args: {
        proposalReviewData: WriteProposalReviewRequest;
        userId: string;
    }): Promise<ProposalReview | AppError>;
    updateProposalReviewFields(args: {
        proposalReviewId: string;
        proposalReviewData: WriteProposalReviewRequest;
    }): Promise<ProposalReview | AppError>;
    deleteProposalReview(args: {
        proposalReviewId: string;
    }): Promise<ProposalReview | AppError>;
}
