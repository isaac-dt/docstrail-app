import {DtModule} from "@dimetrail/firebase/core/utils";
import {ProposalController} from "./proposal/proposal.controller";
import {ProposalDataService} from "./proposal/proposal.data";
import {ProposalPermissionService} from "./proposal/proposal.permission";
import {ProposalReviewController} from "./review/review.controller";
import {ProposalReviewDataService} from "./review/review.data";
import {ProposalReviewPermissionService} from "./review/review.permission";

/**
 * Module for Proposal management.
 */
@DtModule({
  path: "proposal",
  controllers: [ProposalController, ProposalReviewController],
  providers: [
    ProposalDataService,
    ProposalPermissionService,
    ProposalReviewDataService,
    ProposalReviewPermissionService,
  ],
})
export class ProposalModule {}
