import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RouterNavigatedAction, ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { timer } from 'rxjs';
import { debounce, map, withLatestFrom } from 'rxjs/operators';
import { IsCreatePage, QueryParamKey } from '../../shared/route/query-params';
import {
  loadProposalDiagram,
  resetAndLoadJGraphDiagram,
  updateGraphCursorImage,
  setProposal,
  setProposalViewMode,
  setIsAutosaveActive,
} from '../app.actions/proposal.actions';
import { ProposalViewMode } from '../app.model';
import {
  COMPOSE_PATH,
  selectDtUser,
  selectProposalViewMode,
} from '../app.reducer';
import { EFFECT_DEBOUNCE_TIMER_MS } from '../app.effects.utils';

@Injectable()
export class ProposalUiEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly router: Router
  ) {}

  /**
   * Resets the JGraph canvas with a proposal's diagram.
   * This updates the URL query params and triggers a router-based
   * effect that ultimately loads the diagram.
   * Trigger {@link loadProposalDiagram} is dispatched from components.
   * @public
   */
  loadProposalDiagram$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadProposalDiagram),
        debounce(() => timer(EFFECT_DEBOUNCE_TIMER_MS)),
        map((action) => {
          this.router.navigate([COMPOSE_PATH], {
            queryParamsHandling: 'merge',
            queryParams: {
              [QueryParamKey.PROPOSAL_VIEW_MODE]: ProposalViewMode.REVIEW,
              [QueryParamKey.SELECTED_PROPOSAL_ID]: action.proposal.id!,
            },
          });
        })
      ),
    { dispatch: false }
  );

  /**
   * Resets the Jgraph canvas with an empty diagram.
   * Trigger {@link resetAndLoadJGraphDiagram} is dispatched from components.
   * @public
   */
  resetAndLoadJGraphDiagram$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(resetAndLoadJGraphDiagram),
        debounce(() => timer(EFFECT_DEBOUNCE_TIMER_MS)),
        map(() => {
          this.router.navigate([COMPOSE_PATH], {
            queryParams: {
              [QueryParamKey.PROPOSAL_VIEW_MODE]: ProposalViewMode.EDIT,
              [QueryParamKey.IS_CREATE_PAGE]: IsCreatePage.TRUE,
            },
          });
        })
      ),
    { dispatch: false }
  );

  /**
   * Updates the proposal view mode based on URL query params changes.
   * This is the root-trigger for loading a proposal.
   * Trigger {@link ROUTER_NAVIGATED} is auto dispatched.
   * @protected
   */
  setProposalViewModeFromRoute$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ROUTER_NAVIGATED),
        map((action: RouterNavigatedAction) => {
          const queryParams = action.payload.routerState.root.queryParams;
          if (queryParams[QueryParamKey.PROPOSAL_VIEW_MODE]) {
            this.store.dispatch(
              setProposalViewMode({
                mode: +queryParams[QueryParamKey.PROPOSAL_VIEW_MODE],
              })
            );
            this.store.dispatch(updateGraphCursorImage());
          }
        })
      ),
    { dispatch: false }
  );

  /**
   * Deactivate autosave when we navigate away from the compose path.
   * Trigger {@link ROUTER_NAVIGATED} is auto dispatched.
   * @protected
   */
  deactivateAutosave$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ROUTER_NAVIGATED),
        withLatestFrom(this.store.select(selectDtUser)),
        map(([actionAsAny, user]) => {
          if (!user) return;
          const action = actionAsAny as RouterNavigatedAction;
          const url = action.payload.routerState.url;
          if (!url?.startsWith(COMPOSE_PATH)) {
            this.store.dispatch(setIsAutosaveActive({ isActive: false }));
          }
        })
      ),
    { dispatch: false }
  );

  /**
   * Used by other effects to render a diagram.
   * Trigger {@link setProposal} is auto dispatched.
   * Use {@link setSelectedProposalFromRoute} to set proposal from component.
   * @protected
   */
  loadDiagram$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setProposal),
        debounce(() => timer(EFFECT_DEBOUNCE_TIMER_MS)),
        map((action) => {
          if (action.proposal && action.refreshCanvas) {
            (Window as any).jgraphChannel.loadDiagram({
              xml: action.proposal.diagramXml,
              name: action.proposal.name,
              refreshCanvas: action.refreshCanvas,
            });
          }
        })
      ),
    { dispatch: false }
  );

  /**
   * Updates the cursor when hovering on JGraph canvas.
   * Trigger {@link updateGraphCursorImage} is auto dispatched.
   * @protected
   */
  updateGraphCursorImage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateGraphCursorImage),
        withLatestFrom(this.store.select(selectProposalViewMode)),
        debounce(() => timer(EFFECT_DEBOUNCE_TIMER_MS)),
        map(([, proposalViewMode]) => {
          const diagramEl =
            document.getElementsByClassName('geDiagramContainer')[0];
          if (proposalViewMode === ProposalViewMode.REVIEW) {
            (diagramEl as any).style.cursor =
              'url(assets/target.png) 16 16, auto';
          } else {
            (diagramEl as any).style.cursor = 'auto';
          }
        })
      ),
    { dispatch: false }
  );

  /**
   * Emits JGraph proposal view mode changes.
   * Trigger {@link setProposalViewMode} is auto dispatched.
   * See {@link setProposalViewModeFromRoute} to set view mode from component.
   * @protected
   */
  updateJGraphProposalViewMode$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setProposalViewMode),
        map((action) => {
          if (action.mode === ProposalViewMode.REVIEW) {
            (Window as any).jgraphChannel.emitNewMode(
              (Window as any).jgraphChannel.JMode.REVIEW
            );
          } else {
            (Window as any).jgraphChannel.emitNewMode(
              (Window as any).jgraphChannel.JMode.EDIT
            );
          }
        })
      ),
    { dispatch: false }
  );
}
