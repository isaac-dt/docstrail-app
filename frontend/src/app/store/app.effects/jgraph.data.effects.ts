import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { timer } from 'rxjs';
import { debounce, map, pairwise, withLatestFrom } from 'rxjs/operators';
import { WriteProposalRequest } from '../../generated/types/trail/proposal/proposal.api.pb';
import { initializeJGraphEventsSubscriptions } from '../app.actions/app.actions';
import {
  EFFECT_DEBOUNCE_TIMER_MS,
  getCroppedImageElFromSvg,
} from '../app.effects.utils';
import { ProposalViewMode, SvgData } from '../app.model';
import {
  handleAutosaveRequest,
  openJGraphRenameProposal,
  setIsAutosaveActive,
  uploadProposal,
} from '../app.actions/proposal.actions';
import { setDraftCommentThreadScreenshot } from '../app.actions/message.actions';
import {
  COMPOSE_PATH,
  selectCurrentUrl,
  selectIsAutosaveActive,
  selectIsUserOnwerOfSelectedProposal,
  selectProposalViewMode,
} from '../app.reducer';

@Injectable()
export class JGraphDataEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store
  ) {}

  /**
   * Subscribes to events emitted by Jgraph and transforms them
   * into dispatched NgRx actions.
   * Trigger {@link initializeJGraphEventsSubscriptions} is auto dispatched
   * at @filename: app.component.ts
   * @protected
   */
  initializeJGraphEventsSubscriptions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(initializeJGraphEventsSubscriptions),
        debounce(() => timer(EFFECT_DEBOUNCE_TIMER_MS)),
        map(() => {
          (Window as any).jgraphChannel.subscribe((event: any, data: any) => {
            switch (event) {
              case (Window as any).jgraphChannel.JEvent.SAVE: {
                if (!data) return;
                const proposal = WriteProposalRequest.fromPartial({
                  name: data.name,
                  diagramXml: data.xml,
                });
                this.store.dispatch(uploadProposal({ proposalData: proposal }));
                return;
              }
              case (Window as any).jgraphChannel.JEvent.SVG_GENERATED: {
                const svgData: SvgData = {
                  element: data.svg.svg,
                  cropPoint1: data.svg.cropData.point1,
                  cropPoint2: data.svg.cropData.point2,
                  canvasHeight: data.svg.cropData.point2.canvasHeight,
                  canvasWidth: data.svg.cropData.point2.canvasWidth,
                };
                const screenshot = getCroppedImageElFromSvg({
                  svgData,
                });
                this.store.dispatch(
                  setDraftCommentThreadScreenshot({ screenshot })
                );
                return;
              }
              case (Window as any).jgraphChannel.JEvent.AUTOSAVE_REQUEST: {
                this.store.dispatch(handleAutosaveRequest());
                return;
              }
              default:
                return;
            }
          });
        })
      ),
    { dispatch: false }
  );

  /**
   * Trigger {@link openJGraphRenameProposal} is dispatched from components
   * @public
   */
  openJGraphRenameProposal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(openJGraphRenameProposal),
        debounce(() => timer(EFFECT_DEBOUNCE_TIMER_MS)),
        map(() => {
          (Window as any).jgraphChannel.emitRenameProposal();
        })
      ),
    { dispatch: false }
  );

  /**
   * Trigger {@link openJGraphRenameProposal} is auto dispatched
   * @protected
   */
  handleAutosaveRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(handleAutosaveRequest),
        withLatestFrom(
          this.store.select(selectProposalViewMode),
          this.store.select(selectCurrentUrl),
          this.store.select(selectIsUserOnwerOfSelectedProposal),
          this.store.select(selectIsAutosaveActive)
        ),
        pairwise(),
        debounce(() => timer(EFFECT_DEBOUNCE_TIMER_MS)),
        map(
          ([
            [
              prevAction,
              prevViewMode,
              prevUrl,
              prevIsOwner,
              prevIsAutosaveActive,
            ],
            [
              currAction,
              currViewMode,
              currUrl,
              currIsOwner,
              currIsAutosaveActive,
            ],
          ]) => {
            if (currIsOwner === false) return;
            if (
              currViewMode === ProposalViewMode.EDIT &&
              currUrl.startsWith(COMPOSE_PATH)
            ) {
              // This is set to false everytime we navigate away from the compose path.
              // Activating it on autosave request instead of on navigation to compose path
              // Ensures that we skip the initial autosave request, avoiding triggering a save
              // right after a diagram is loaded.
              if (!currIsAutosaveActive) {
                this.store.dispatch(setIsAutosaveActive({ isActive: true }));
              } else {
                (Window as any).jgraphChannel.emitDoAutosave();
              }
            }
          }
        )
      ),
    { dispatch: false }
  );
}
