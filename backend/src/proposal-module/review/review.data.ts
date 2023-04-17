import {Injectable} from "../../../framework/core/utils";
import {getDataParsers} from "../../shared/database/firestore-utils";
import {getFirestore, DocumentData, FieldValue} from "firebase-admin/firestore";
import {AppError, ErrorCode} from "../../generated/types/common.pb";
import {getDateFromFireTimestamp} from "../../shared/utils";
import {
  PROPOSAL_REVIEW_COLLECTION_NAME,
  PROPOSAL_REVIEW_COLLECTION_SCHEMA,
} from "./review.schema";
import {ProposalReview} from "../../generated/types/trail/proposal/review.pb";
import {WriteProposalReviewRequest} from "../../generated/types/trail/proposal/review.api.pb";

/**
 * Manages operations on proposal review data.
 */
@Injectable()
export class ProposalReviewDataService {
  readonly db = getFirestore();

  async getProposalReview(args: {
    proposalReviewId: string;
  }): Promise<ProposalReview | AppError> {
    const proposalReviewSnap = await this.db
      .collection(PROPOSAL_REVIEW_COLLECTION_NAME)
      .doc(args.proposalReviewId)
      .get();
    const proposalReview: Partial<ProposalReview> | undefined =
      proposalReviewSnap.data();
    if (!proposalReview) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {
          collection: PROPOSAL_REVIEW_COLLECTION_NAME,
          id: args.proposalReviewId,
        },
      });
    }
    return ProposalReview.fromPartial({
      ...proposalReview,
      id: proposalReviewSnap.id,
      createdAt: getDateFromFireTimestamp(proposalReview.createdAt),
      updatedAt: getDateFromFireTimestamp(proposalReview.updatedAt),
      deletedAt: getDateFromFireTimestamp(proposalReview.deletedAt),
    });
  }

  async getProposalReviewsOfProposal(args: {
    proposalId: string;
  }): Promise<readonly ProposalReview[]> {
    const data = await this.db
      .collection(PROPOSAL_REVIEW_COLLECTION_NAME)
      .where("proposalId", "==", args.proposalId)
      .get();
    const proposalReviews = data.docs.map((doc) =>
      ProposalReview.fromPartial({
        ...(doc.data() as Partial<ProposalReview>),
        id: doc.id,
      })
    );
    return proposalReviews.map((proposalReview) =>
      ProposalReview.fromPartial({
        ...proposalReview,
        createdAt: getDateFromFireTimestamp(proposalReview.createdAt),
        updatedAt: getDateFromFireTimestamp(proposalReview.updatedAt),
        deletedAt: getDateFromFireTimestamp(proposalReview.deletedAt),
      })
    );
  }

  async createProposalReview(args: {
    proposalReviewData: WriteProposalReviewRequest;
    userId: string;
  }): Promise<ProposalReview | AppError> {
    const parser = getDataParsers({schema: PROPOSAL_REVIEW_COLLECTION_SCHEMA});
    const validationErrors = parser.validate(args.proposalReviewData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }

    const timestamp = FieldValue.serverTimestamp();
    const proposalReviewDbData = ProposalReview.fromPartial({
      ...parser.sanitize(args.proposalReviewData),
      createdBy: args.userId,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
    const proposalReviewRef = await this.db
      .collection(PROPOSAL_REVIEW_COLLECTION_NAME)
      .add(proposalReviewDbData as DocumentData);
    const proposalReview = await this.getProposalReview({
      proposalReviewId: proposalReviewRef.id,
    });
    if (!proposalReview)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return proposalReview;
  }

  async updateProposalReviewFields(args: {
    proposalReviewId: string;
    proposalReviewData: WriteProposalReviewRequest;
  }): Promise<ProposalReview | AppError> {
    const proposalReview = await this.getProposalReview({
      proposalReviewId: args.proposalReviewId,
    });
    if (!proposalReview) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {
          collection: PROPOSAL_REVIEW_COLLECTION_NAME,
          id: args.proposalReviewId,
        },
      });
    }
    const parser = getDataParsers({
      schema: PROPOSAL_REVIEW_COLLECTION_SCHEMA,
      onlyFields: Object.keys(args.proposalReviewData),
    });
    const validationErrors = parser.validate(args.proposalReviewData);
    if (validationErrors.length) {
      return AppError.fromPartial({
        details: validationErrors,
        errorCode: ErrorCode.INVALID_DATA,
      });
    }
    const timestamp = FieldValue.serverTimestamp();
    const proposalReviewDbData = ProposalReview.fromPartial({
      ...parser.sanitize({
        ...args.proposalReviewData,
      }),
      updatedAt: timestamp,
    });
    await this.db
      .collection(PROPOSAL_REVIEW_COLLECTION_NAME)
      .doc(args.proposalReviewId)
      .update(proposalReviewDbData as DocumentData);
    const updatedProposalReview = await this.getProposalReview({
      proposalReviewId: args.proposalReviewId,
    });
    if (!updatedProposalReview)
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    return updatedProposalReview;
  }

  async deleteProposalReview(args: {
    proposalReviewId: string;
  }): Promise<ProposalReview | AppError> {
    const proposalReview = await this.getProposalReview({
      proposalReviewId: args.proposalReviewId,
    });
    if (!proposalReview) {
      return AppError.fromPartial({
        errorCode: ErrorCode.NOT_FOUND_IN_DB,
        details: {
          collection: PROPOSAL_REVIEW_COLLECTION_NAME,
          id: args.proposalReviewId,
        },
      });
    }

    // Copy item to deletion collection.
    const timestamp = FieldValue.serverTimestamp();
    const proposalReviewDbData = ProposalReview.fromPartial({
      ...proposalReview,
      updatedAt: timestamp as any,
    });
    const proposalReviewCopyResult = await this.db
      .collection(PROPOSAL_REVIEW_COLLECTION_NAME)
      .doc(args.proposalReviewId)
      .set(proposalReviewDbData as DocumentData);
    if (!proposalReviewCopyResult.writeTime) {
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    }

    // Delete item from regular collection.
    const deletionResult = await this.db
      .collection(PROPOSAL_REVIEW_COLLECTION_NAME)
      .doc(args.proposalReviewId)
      .delete();
    if (!deletionResult.writeTime) {
      return AppError.fromPartial({errorCode: ErrorCode.UNKNOWN});
    }

    return proposalReview;
  }
}
