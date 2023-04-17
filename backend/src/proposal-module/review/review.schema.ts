import {ProposalReview_Status} from "../../generated/types/trail/proposal/review.pb";
import {CollectionSchema} from "../../shared/database/firestore-utils";
import validator from "validator";

/** Collection reference for firestore. */
export const PROPOSAL_REVIEW_COLLECTION_NAME = "proposal-reviews";

/** Collection reference for firestore. */
export const PROPOSAL_REVIEW_DELETED_COLLECTION_NAME =
  "proposal-reviews-deleted";

/** Validation schema for the collection. */
export const PROPOSAL_REVIEW_COLLECTION_SCHEMA: CollectionSchema = {
  proposalId: {
    description: "proposal id using ascii",
    pattern: validator.isAlphanumeric,
  },
  status: {
    description:
      "proposal review status, following the ProposalReview_Status format",
    pattern: (data: any) => {
      return Object.keys(ProposalReview_Status).includes(data);
    },
  },
  note: {
    description: "review note using ascii",
    isOptional: true,
    pattern: (data: any) => {
      if (data === undefined) return true;
      return validator.isAscii(data);
    },
  },
};
