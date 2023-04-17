import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import { ReplaySubject, combineLatest } from 'rxjs';
import {
  first,
  map,
  pairwise,
  withLatestFrom,
  filter,
  takeUntil,
} from 'rxjs/operators';
import { User } from 'src/app/generated/types/account/user/user.pb';
import { PermissionOp } from 'src/app/generated/types/permission.pb';
import { WriteShareProposalRequest } from 'src/app/generated/types/trail/proposal/proposal.api.pb';
import { Proposal } from 'src/app/generated/types/trail/proposal/proposal.pb';
import {
  ProposalReview,
  ProposalReview_Status,
} from 'src/app/generated/types/trail/proposal/review.pb';
import { uploadShareProposalRequest } from 'src/app/store/app.actions/proposal.actions';
import {
  selectCurrentUrl,
  selectDtUser,
  selectIsProposalReviewMode,
  selectSelectedPoposalReviews,
  selectSelectedProposalInfo,
  selectSelectedProposalOwners,
  selectSelectedProposalReviewers,
  selecteSelectedProposalPermissions,
} from 'src/app/store/app.reducer';

@Component({
  selector: 'app-jgraph-review-container',
  templateUrl: './review-container.component.html',
  styleUrls: ['./review-container.component.scss'],
})
export class JgraphReviewContainerComponent implements AfterViewInit {
  readonly PermissionOp = PermissionOp;
  readonly ReviewStatus = ProposalReview_Status;
  readonly isProposalReviewMode$ = this.store.select(
    selectIsProposalReviewMode
  );
  readonly selectedProposalPermissions$ = this.store.select(
    selecteSelectedProposalPermissions
  );
  readonly selectedProposalInfo$ = this.store.select(
    selectSelectedProposalInfo
  );
  readonly currentUser$ = this.store.select(selectDtUser);
  readonly selectedProposalOwners$ = this.store.select(
    selectSelectedProposalOwners
  );
  readonly selectedProposalReviewers$ = this.store.select(
    selectSelectedProposalReviewers
  );
  readonly hasNavigatedFromEditMode$ = combineLatest([
    this.isProposalReviewMode$,
    this.selectedProposalInfo$,
    this.store.select(selectCurrentUrl),
  ]).pipe(
    filter(([, isReviewMode]) => isReviewMode !== undefined),
    pairwise(),
    map(
      ([
        [prevIsReviewMode, prevSelectedProposalInfo, prevUrl],
        [currIsReviewMode, currSelectedProposalInfo, currUrl],
      ]) => {
        const hasNavigatedFromEditMode =
          prevIsReviewMode === false && currIsReviewMode === true;
        const isSelectedProposalNotChanged =
          prevSelectedProposalInfo?.proposal.id ===
          currSelectedProposalInfo?.proposal.id;
        const isNavigationPathUnchanged = prevUrl.includes(
          prevSelectedProposalInfo?.proposal.id || ''
        );
        return (
          hasNavigatedFromEditMode &&
          isSelectedProposalNotChanged &&
          isNavigationPathUnchanged
        );
      }
    )
  );
  readonly isCurrentUserInOwners$ = this.selectedProposalOwners$.pipe(
    withLatestFrom(this.currentUser$),
    map(([owners, user]) => {
      return !!owners?.find((owner) => owner.id === user?.id);
    })
  );
  readonly selectedProposalReviewsByUserId$ = this.store
    .select(selectSelectedPoposalReviews)
    .pipe(
      map((reviews) => {
        type userId = string;
        const map = new Map<userId, ProposalReview>();
        for (const review of reviews || []) {
          map.set(review.createdBy!, review);
        }
        return map;
      })
    );
  readonly hasOwnerEndedReview$ = this.store
    .select(selectSelectedPoposalReviews)
    .pipe(
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
  readonly destroyed = new ReplaySubject<void>();

  shareForReviewTrigger!: MatMenuTrigger;

  constructor(readonly store: Store) {}

  ngAfterViewInit() {
    this.openShareForReviewTriggerOnNavFromEdit();
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  /** If Proposal is in Draft state and user navigated from edit mode into review mode,
   * automatically open the share proposal for review menu.
   */
  openShareForReviewTriggerOnNavFromEdit() {
    this.hasNavigatedFromEditMode$
      .pipe(takeUntil(this.destroyed))
      .subscribe((hasNavigatedFromEditMode) => {
        const interval = setInterval(() => {
          if (hasNavigatedFromEditMode && this.shareForReviewTrigger) {
            this.shareForReviewTrigger.openMenu();
            clearInterval(interval);
          }
        }, 200);
        setTimeout(() => {
          clearInterval(interval);
        }, 2000);
      });
  }

  saveShareForReviewTrigger(trigger: MatMenuTrigger) {
    this.shareForReviewTrigger = trigger;
  }

  getTime(time: any) {
    return new Date(time as Date);
  }
  isMe(user: User, currentUser: User | null) {
    return user.id === currentUser?.id;
  }

  setPermission(user: User, permissionOp: PermissionOp, proposal: Proposal) {
    const request = WriteShareProposalRequest.fromPartial({
      proposalId: proposal.id,
      accessorEmail: user.email,
      operation: permissionOp,
    });
    this.store.dispatch(uploadShareProposalRequest({ request }));
  }
}
