import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RouterNavigatedAction, ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { of, timer } from 'rxjs';
import { debounce, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ProposalPermission } from '../../generated/types/trail/proposal/proposal.api.pb';
import { Proposal } from '..//../generated/types/trail/proposal/proposal.pb';
import { ProposalApiService } from '../../shared/dt-api/proposal-api';
import { QueryParamKey, RefreshCanvas } from '../../shared/route/query-params';
import {
  addProposal,
  deleteProposal,
  fetchProposal,
  fetchProposalList,
  removeDeletedProposal,
  setProposal,
  setProposalList,
  setSelectedProposalId,
  updateProposal,
  uploadProposal,
  uploadShareProposalRequest,
  refreshSelectedProposal,
  setSelectedProposalReviews,
  resetSelectedProposalReviews,
  uploadNewProposalReview,
  uploadUpdatedProposalReview,
  fetchSelectedProposalReviews,
  registerSaving,
  unregisterSaving,
} from '../app.actions/proposal.actions';
import {
  fetchSelectedCommentThreadMessages,
  resetDraftComment,
  setSelectedProposalCommentThreads,
} from '../app.actions/message.actions';
import {
  selectDtUser,
  selectSelectedProposalInfo,
  selectSelectedPoposalReviews,
  selectProposalInfos,
  selectIsCreatePage,
  COMPOSE_PATH,
  selectIsSaving,
} from '../app.reducer';
import { EFFECT_DEBOUNCE_TIMER_MS, getTitleCase } from '../app.effects.utils';
import { registerLoading, unregisterLoading } from '../app.actions/app.actions';
import { setDtUser } from '../app.actions/account.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProposalReview } from 'src/app/generated/types/trail/proposal/review.pb';
import { ProposalInfo, ProposalViewMode } from '../app.model';
import { Router } from '@angular/router';

@Injectable()
export class ProposalDataEffects {
  constructor(
    private readonly proposalApiService: ProposalApiService,
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly snackbar: MatSnackBar,
    private readonly router: Router
  ) {}

  /**
   * Fetches the list of proposals associated to the current user.
   * Trigger {@link setDtUser} is automatically dispatched from the auth lifecycle.
   * Trigger {@link fetchProposalList} is dispatched from components.
   * @public
   */
  fetchProposalList$ = createEffect(
    () =>
      this.actions$.pipe(
        // ofType(fetchProposalList, setDtUser),
        ofType(fetchProposalList, setDtUser),
        debounce(() => timer(EFFECT_DEBOUNCE_TIMER_MS)),
        switchMap((action) => {
          if (action.type === setDtUser.type && !action.dtUser) {
            return of({ ignore: true, res: undefined });
          }
          this.store.dispatch(registerLoading());
          return this.proposalApiService
            .listProposals()
            .pipe(map((res) => ({ res, ignore: undefined })));
        }),
        map((args) => {
          if (args.ignore) return;
          this.store.dispatch(unregisterLoading());
          this.store.dispatch(
            setProposalList({
              proposals: (args.res?.proposals ?? []) as readonly Proposal[],
              userPermissions: args.res
                ?.requestorPermissionsOnProposals as readonly ProposalPermission[],
            })
          );
        })
      ),
    { dispatch: false }
  );

  /**
   * Fetches the threads associated to the selected proposal.
   * Trigger {@link setSelectedProposal} is auto dispached.
   * Trigger {@link fetchSelectedProposalReviews} is auto dispached.
   * @protected
   */
  fetchSelectedProposalReviews$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setSelectedProposalId, fetchSelectedProposalReviews),
        withLatestFrom(this.store.select(selectSelectedProposalInfo)),
        debounce(() => timer(EFFECT_DEBOUNCE_TIMER_MS)),
        switchMap(([action, selectedProposalInfo]) => {
          if (action.type === setSelectedProposalId.type) {
            if (!action.proposalId) return of(undefined);
            return this.proposalApiService.listProposalReviews({
              proposalId: action.proposalId!,
            });
          } else {
            return this.proposalApiService.listProposalReviews({
              proposalId: selectedProposalInfo?.proposal.id!,
            });
          }
        }),
        map((res) => {
          if (res) {
            this.store.dispatch(
              setSelectedProposalReviews({
                reviews: res?.proposalReviews || [],
                users: res?.creators || [],
              })
            );
          }
        })
      ),
    { dispatch: false }
  );

  /**
   * Fetches and loads a proposal and its assets.
   * Trigger {@link refreshSelectedProposal} is dispatched from components.
   * @public
   */
  refreshSelectedProposal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(refreshSelectedProposal),
        withLatestFrom(this.store.select(selectSelectedProposalInfo)),
        debounce(() => timer(EFFECT_DEBOUNCE_TIMER_MS)),
        switchMap(([action, proposalInfo]) => {
          if (!proposalInfo) return of(undefined);
          if (action.showAlert) this.store.dispatch(registerLoading());
          return this.proposalApiService
            .getProposal({
              proposalId: proposalInfo?.proposal.id!,
            })
            .pipe(map((res) => ({ res, showAlert: action.showAlert })));
        }),
        map((args) => {
          if (args?.showAlert) this.store.dispatch(unregisterLoading());
          if (!args?.res) return;
          this.store.dispatch(
            setProposal({
              refreshCanvas: true,
              proposal: args?.res?.proposal!,
              allPermissions: args?.res
                ?.allPermissionsOnProposal as readonly ProposalPermission[],
            })
          );
          this.store.dispatch(
            setSelectedProposalId({ proposalId: args?.res.proposal?.id! })
          );
          this.store.dispatch(fetchSelectedCommentThreadMessages());
          if (args?.showAlert)
            this.snackbar.open('Refreshed', 'close', { duration: 2000 });
        })
      ),
    { dispatch: false }
  );

  /**
   * Uploads a new proposal to the backend.
   * Trigger {@link uploadProposal} is dispatched from components.
   * @public
   */
  uploadProposal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(uploadProposal),
        withLatestFrom(this.store.select(selectSelectedProposalInfo)),
        debounce(() => timer(EFFECT_DEBOUNCE_TIMER_MS)),
        switchMap(([action, selectedProposal]) => {
          this.store.dispatch(registerSaving());
          if (!selectedProposal) {
            // New proposal.
            return this.proposalApiService.createProposal({
              proposalData: action.proposalData,
            });
          } else {
            return this.proposalApiService.updateProposal({
              proposalData: action.proposalData,
              proposalId: selectedProposal.proposal.id!,
              proposalName: selectedProposal.proposal.name!,
            });
          }
        }),
        withLatestFrom(
          this.store.select(selectSelectedProposalInfo),
          this.store.select(selectIsCreatePage),
          this.store.select(selectIsSaving)
        ),
        map(([res, selectedProposal, isCreatePage, isSaving]) => {
          if (!res) {
            this.snackbar.open('Not saved. Missing permission', 'close');
            this.store.dispatch(unregisterSaving());
            return;
          }
          if (!selectedProposal) {
            if (isSaving) {
              this.store.dispatch(unregisterSaving());
            } else {
              this.snackbar.open(
                `Proposal "${res?.proposal?.name}" successfully created.`,
                'close'
              );
            }
            this.store.dispatch(
              addProposal({
                proposal: res?.proposal!,
                allPermissions: res?.allPermissionsOnProposal!,
              })
            );
            if (isCreatePage) {
              setTimeout(() => {
                this.router.navigate([COMPOSE_PATH], {
                  queryParams: {
                    [QueryParamKey.PROPOSAL_VIEW_MODE]: ProposalViewMode.EDIT,
                    [QueryParamKey.REFRESH_CANVAS]: RefreshCanvas.FALSE,
                    [QueryParamKey.SELECTED_PROPOSAL_ID]: res?.proposal?.id,
                  },
                });
              }, 1000);
            }
          } else {
            if (isSaving) {
              this.store.dispatch(unregisterSaving());
            } else {
              this.snackbar.open(`Updated`, 'close', { duration: 1000 });
            }
            this.store.dispatch(
              updateProposal({
                proposal: res?.proposal!,
                allPermissions: res?.allPermissionsOnProposal!,
              })
            );
          }
        })
      ),
    { dispatch: false }
  );

  /**
   * Uploads a new review to the proposal.
   * Trigger {@link uploadNewProposalReview} is dispatched from components.
   * @public
   */
  uploadNewProposalReview$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(uploadNewProposalReview),
        withLatestFrom(
          this.store.select(selectDtUser),
          this.store.select(selectSelectedPoposalReviews)
        ),
        debounce(() => timer(EFFECT_DEBOUNCE_TIMER_MS)),
        switchMap(([action, user, selectedProposalReviews]) => {
          const placeholder = ProposalReview.fromPartial({
            ...action.reviewRequest,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: user?.id,
          });
          this.store.dispatch(
            setSelectedProposalReviews({
              reviews: [placeholder, ...selectedProposalReviews],
              users: [],
            })
          );
          return this.proposalApiService
            .createProposalReview({
              reviewData: action.reviewRequest,
            })
            .pipe(map((res) => ({ res, selectedProposalReviews })));
        }),
        map(({ res, selectedProposalReviews }) => {
          if (!res) {
            this.snackbar.open('Review failed to save', 'close');
            this.store.dispatch(
              setSelectedProposalReviews({
                reviews: selectedProposalReviews,
                users: [],
              })
            );
            return;
          }
          this.store.dispatch(fetchSelectedProposalReviews());
        })
      ),
    { dispatch: false }
  );

  /**
   * Uploads an updated review to the proposal.
   * Trigger {@link uploadUpdatedProposalReview} is dispatched from components.
   * @public
   */
  uploadUpdatedProposalReview$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(uploadUpdatedProposalReview),
        withLatestFrom(
          this.store.select(selectDtUser),
          this.store.select(selectSelectedPoposalReviews)
        ),
        debounce(() => timer(EFFECT_DEBOUNCE_TIMER_MS)),
        switchMap(([action, user, selectedProposalReviews]) => {
          const placeholderReview = ProposalReview.fromPartial({
            ...action.reviewRequest,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: user?.id,
          });
          const indexOfReviewToUpdate = selectedProposalReviews.findIndex(
            (review) => review.id === action.reviewId
          );
          const placeHolderReviews = [...selectedProposalReviews];
          placeHolderReviews[indexOfReviewToUpdate] = placeholderReview;
          this.store.dispatch(
            setSelectedProposalReviews({
              reviews: placeHolderReviews,
              users: [],
            })
          );
          return this.proposalApiService
            .updateProposalReview({
              reviewData: action.reviewRequest,
              reviewId: action.reviewId,
            })
            .pipe(map((res) => ({ res, selectedProposalReviews })));
        }),
        map(({ res, selectedProposalReviews }) => {
          if (!res) {
            this.snackbar.open('Review failed to save', 'close');
            this.store.dispatch(
              setSelectedProposalReviews({
                reviews: selectedProposalReviews,
                users: [],
              })
            );
            return;
          }
          this.store.dispatch(fetchSelectedProposalReviews());
        })
      ),
    { dispatch: false }
  );

  /**
   * Shares a proposal.
   * Trigger {@link uploadShareProposalRequest} is dispatched from components.
   * @public
   */
  shareProposal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(uploadShareProposalRequest),
        debounce(() => timer(EFFECT_DEBOUNCE_TIMER_MS)),
        switchMap((action) => {
          this.store.dispatch(registerLoading());
          return this.proposalApiService.shareProposal(action.request);
        }),
        map((res) => {
          this.store.dispatch(unregisterLoading());
          if (!res) {
            this.snackbar.open('Request sent', 'close');
            return;
          }
          this.store.dispatch(refreshSelectedProposal({}));
          this.snackbar.open(
            `Updated permission for ${getTitleCase(res?.accessor?.fullName)}`,
            'close'
          );
        })
      ),
    { dispatch: false }
  );

  /**
   * Deletes a proposal.
   * Trigger {@link deleteProposal}is dispatched from components.
   * @public
   */
  deleteProposal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProposal),
      debounce(() => timer(EFFECT_DEBOUNCE_TIMER_MS)),
      switchMap((action) => {
        return this.proposalApiService.deleteProposal({
          proposalId: action.proposalId,
        });
      }),
      map((res) => {
        this.snackbar.open(
          `Proposal "${res?.proposal?.name}" was deleted.`,
          'close'
        );
        return removeDeletedProposal({ proposalId: res?.proposal?.id! });
      })
    )
  );

  /**
   * Updates the proposal based on URL query params changes.
   * This is the root-trigger for loading a proposal.
   * Trigger {@link ROUTER_NAVIGATED} is automatically dispatched.
   * @protected
   */
  setSelectedProposalFromRoute$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ROUTER_NAVIGATED),
        withLatestFrom(
          this.store.select(selectSelectedProposalInfo),
          this.store.select(selectDtUser)
        ),
        debounce(() => timer(EFFECT_DEBOUNCE_TIMER_MS)),
        map(([action, selectedProposalInfo, user]) => {
          if (!user) return { ignore: true };
          const queryParams: any = (action as RouterNavigatedAction).payload
            .routerState.root.queryParams;
          let proposalId = undefined;
          if (
            !queryParams[QueryParamKey.SELECTED_PROPOSAL_ID] ||
            selectedProposalInfo?.proposal?.id !==
              queryParams[QueryParamKey.SELECTED_PROPOSAL_ID]
          ) {
            // Reset components that should not have the old data anymore. (optimistic).
            this.store.dispatch(resetSelectedProposalReviews());
            this.store.dispatch(
              setSelectedProposalCommentThreads({
                threads: [],
                creators: [],
                messages: [],
              })
            );
            (Window as any).jgraphChannel.loadDiagram({
              xml: '',
            });

            if (queryParams[QueryParamKey.SELECTED_PROPOSAL_ID]) {
              proposalId = queryParams[QueryParamKey.SELECTED_PROPOSAL_ID];
            }
            return { proposalId };
          }
          return { ignore: true };
        }),
        switchMap((args) => {
          if (args.proposalId && !args.ignore) {
            this.store.dispatch(registerLoading());
            return this.proposalApiService
              .getProposal({ proposalId: args.proposalId })
              .pipe(
                map((res) => ({
                  res,
                  isLoading: true,
                  ignore: false,
                }))
              );
          }
          return of({
            res: undefined,
            isLoading: false,
            ignore: args.ignore,
          });
        }),
        map(({ res, isLoading, ignore }) => {
          if (ignore) return;
          if (isLoading) {
            this.store.dispatch(unregisterLoading());
          }
          const proposalId = res?.proposal?.id;
          this.store.dispatch(setSelectedProposalId({ proposalId }));
          if (res?.proposal) {
            this.store.dispatch(resetDraftComment());
            this.store.dispatch(
              setProposal({
                refreshCanvas: true,
                proposal: res?.proposal!,
                allPermissions:
                  res?.allPermissionsOnProposal as readonly ProposalPermission[],
              })
            );
          }
        })
      ),
    { dispatch: false }
  );

  /**
   * Fetches a proposals from the backend.
   * @public
   * @deprecated Use {@link setSelectedProposalFromRoute$} instead.
   * Note: Usage of this is already removed from all components (as of 04/11/2023).
   */
  fetchProposal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchProposal),
      debounce(() => timer(EFFECT_DEBOUNCE_TIMER_MS)),
      switchMap((action) => {
        return this.proposalApiService.getProposal({
          proposalId: action.proposalId,
        });
      }),
      map((res) => {
        return setProposal({
          refreshCanvas: true,
          proposal: res?.proposal!,
          allPermissions:
            res?.allPermissionsOnProposal as readonly ProposalPermission[],
        });
      })
    )
  );
}
