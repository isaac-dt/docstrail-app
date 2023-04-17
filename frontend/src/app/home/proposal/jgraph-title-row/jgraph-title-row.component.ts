import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { QueryParamKey } from 'src/app/shared/route/query-params';
import {
  openJGraphRenameProposal,
  refreshSelectedProposal,
  uploadNewProposalReview,
  uploadUpdatedProposalReview,
} from 'src/app/store/app.actions/proposal.actions';
import { ProposalViewMode } from 'src/app/store/app.model';
import {
  selectDtUser,
  selectIsCreatePage,
  selectIsProposalReviewMode,
  selectIsSaving,
  selectIsUserOnwerOfSelectedProposal,
  selectIsUserReviewerOfSelectedProposal,
  selectSelectedPoposalReviews,
  selectSelectedProposalInfo,
  selectSelectedProposalOwners,
  selectSelectedProposalReviewers,
} from 'src/app/store/app.reducer';
import { WriteProposalReviewRequest } from 'src/app/generated/types/trail/proposal/review.api.pb';
import { ProposalReview_Status } from 'src/app/generated/types/trail/proposal/review.pb';
import { Proposal } from 'src/app/generated/types/trail/proposal/proposal.pb';
import { combineLatest, withLatestFrom } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TextAreaContext } from '../../common-components/trail-text-area/trail-text-area.component';
import { PermissionOp } from 'src/app/generated/types/permission.pb';

@Component({
  selector: 'app-jgraph-title-row',
  templateUrl: './jgraph-title-row.component.html',
  styleUrls: ['./jgraph-title-row.component.scss'],
})
export class JgraphTitleRowComponent {
  readonly PermissionOp = PermissionOp;
  readonly ReviewStatus = ProposalReview_Status;
  readonly dtUser$ = this.store.select(selectDtUser);
  readonly isSaving$ = this.store.select(selectIsSaving);
  readonly selectedProposalInfo$ = this.store.select(
    selectSelectedProposalInfo
  );
  readonly isCreatePage$ = this.store.select(selectIsCreatePage).pipe(
    map((isCreatePage) => {
      return isCreatePage;
    })
  );
  readonly isProposalReviewMode$ = this.store.select(
    selectIsProposalReviewMode
  );
  readonly isCurrentUserOwner$ = this.store.select(
    selectIsUserOnwerOfSelectedProposal
  );
  readonly isCurrentUserReviewer$ = this.store.select(
    selectIsUserReviewerOfSelectedProposal
  );
  readonly selectedProposalReviewers$ = this.store.select(
    selectSelectedProposalReviewers
  );
  readonly selectedProposalReviews$ = this.store.select(
    selectSelectedPoposalReviews
  );
  readonly hasReviewerApproved$ = this.selectedProposalReviews$.pipe(
    withLatestFrom(this.selectedProposalReviewers$),
    map(([reviews, reviewers]) => {
      if (!reviews || !reviewers) return undefined;
      return !!reviews?.find((review) => {
        const isApproved = review.status === ProposalReview_Status.LGTM;
        const isReviewer = !!reviewers?.find(
          (reviewer) => reviewer.id === review.createdBy
        );
        return isReviewer && isApproved;
      });
    })
  );
  readonly hasOwnerEndedReview$ = this.selectedProposalReviews$.pipe(
    withLatestFrom(this.store.select(selectSelectedProposalOwners)),
    map(([reviews, owners]) => {
      if (!reviews || !owners) return undefined;
      const ownerReviews = reviews.filter((review) =>
        owners.map((owner) => owner.id!).includes(review.createdBy!)
      );
      return !!ownerReviews.find(
        (review) => review.status === ProposalReview_Status.END_REVIEW
      );
    })
  );
  readonly currentUserReview$ = this.selectedProposalReviews$.pipe(
    withLatestFrom(this.dtUser$),
    map(([reviews, user]) => {
      if (!reviews || !user) return undefined;
      return reviews.find((review) => user.id === review.createdBy!);
    })
  );
  readonly currentUserPendingReviewId$ = this.selectedProposalReviews$.pipe(
    withLatestFrom(this.dtUser$),
    map(([reviews, user]) => {
      if (!reviews || !user) return undefined;
      const userReviews = reviews.filter(
        (review) => user.id === review.createdBy!
      );
      return (
        userReviews.find(
          (review) => review.status === ProposalReview_Status.PENDING
        )?.id || null
      );
    })
  );
  readonly currentUserEndReviewId$ = this.selectedProposalReviews$.pipe(
    withLatestFrom(this.dtUser$),
    map(([reviews, user]) => {
      if (!reviews || !user) return undefined;
      const userReviews = reviews.filter(
        (review) => user.id === review.createdBy!
      );
      return (
        userReviews.find(
          (review) => review.status === ProposalReview_Status.END_REVIEW
        )?.id || null
      );
    })
  );

  endReviewTextAreaContext!: TextAreaContext;
  reviewerReviewTextAreaContext!: TextAreaContext;

  constructor(
    readonly store: Store,
    readonly router: Router,
    readonly activeRoute: ActivatedRoute
  ) {}

  toggleProposalViewMode(isReviewMode: boolean | null) {
    const newViewMode = isReviewMode
      ? ProposalViewMode.EDIT
      : ProposalViewMode.REVIEW;
    this.router.navigate([], {
      relativeTo: this.activeRoute,
      queryParamsHandling: 'merge',
      queryParams: { [QueryParamKey.PROPOSAL_VIEW_MODE]: newViewMode },
    });
  }

  refresh() {
    this.store.dispatch(refreshSelectedProposal({ showAlert: true }));
  }

  saveEndReviewTextAreaContext(context: TextAreaContext) {
    this.endReviewTextAreaContext = context;
  }
  saveReviewerReviewTextAreaContext(context: TextAreaContext) {
    this.reviewerReviewTextAreaContext = context;
  }

  submitReviewerReview(
    proposal: Proposal,
    status: ProposalReview_Status,
    reviewId?: string | null
  ) {
    const note = this.reviewerReviewTextAreaContext.control.value;
    if (!reviewId) {
      const reviewRequest = WriteProposalReviewRequest.fromPartial({
        status,
        proposalId: proposal.id,
      });
      if (!!note) reviewRequest.note = note;
      this.store.dispatch(uploadNewProposalReview({ reviewRequest }));
    } else {
      const reviewRequest = WriteProposalReviewRequest.fromPartial({
        status,
      });
      if (!!note) reviewRequest.note = note;
      this.store.dispatch(
        uploadUpdatedProposalReview({ reviewRequest, reviewId })
      );
    }
  }

  submitOwnerReview(
    proposal: Proposal,
    status: ProposalReview_Status,
    reviewId?: string | null
  ) {
    const note = this.endReviewTextAreaContext.control.value;
    if (!reviewId) {
      const reviewRequest = WriteProposalReviewRequest.fromPartial({
        status,
        proposalId: proposal.id,
      });
      if (!!note) reviewRequest.note = note;
      this.store.dispatch(uploadNewProposalReview({ reviewRequest }));
    } else {
      const reviewRequest = WriteProposalReviewRequest.fromPartial({
        status,
      });
      if (!!note) reviewRequest.note = note;
      this.store.dispatch(
        uploadUpdatedProposalReview({ reviewRequest, reviewId })
      );
    }
  }

  openRenameProposal() {
    this.store.dispatch(openJGraphRenameProposal());
  }
}
