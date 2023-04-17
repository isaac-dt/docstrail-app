import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { timer } from 'rxjs';
import { debounce, map, withLatestFrom } from 'rxjs/operators';
import { WriteCommentThreadRequest } from '../../generated/types/trail/comment/thread-api.pb';
import {
  setDraftCommentThread,
  setDraftCommentThreadScreenshot,
} from '../app.actions/message.actions';
import { selectDraftCommentThread } from '../app.reducer';
import { EFFECT_DEBOUNCE_TIMER_MS } from '../app.effects.utils';

@Injectable()
export class CommentUiEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store
  ) {}

  /**
   * Saves the most recent proposal diagram screenshot.
   * Trigger {@link setDraftCommentThreadScreenshot} is auto dispatched from
   * a subscription to JGraph events.
   * @protected
   */
  setDraftCommentThreadScreenshot$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setDraftCommentThreadScreenshot),
        withLatestFrom(this.store.select(selectDraftCommentThread)),
        debounce(() => timer(EFFECT_DEBOUNCE_TIMER_MS)),
        map(([action, draftThread]) => {
          const thread = WriteCommentThreadRequest.fromPartial({
            ...draftThread,
            screenshot: action.screenshot,
          });
          this.store.dispatch(
            setDraftCommentThread({
              thread,
            })
          );
        })
      ),
    { dispatch: false }
  );
}
