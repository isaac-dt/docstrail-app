import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, timer } from 'rxjs';
import { debounce, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { WriteCommentThreadRequest } from '../../generated/types/trail/comment/thread-api.pb';
import { CommentApiService } from '../../shared/dt-api/comment-api';
import {
  resetDraftComment,
  uploadNewCommentThreadWithMessage,
  fetchSelectedProposalCommentThreads,
  setSelectedProposalCommentThreads,
  setSelectedCommentThreadMessages,
  setSelectedCommentThread,
  uploadNewCommentMessageToThread,
  fetchSelectedCommentThreadMessages,
  deleteCommentThread,
  removeDeletedCommentThreadAndMessages,
  deleteCommentMessage,
  removeDeletedCommentMessage,
  resetSelectedCommentThread,
  addNewThreadWithMessage,
} from '../app.actions/message.actions';
import {
  selectDraftCommentMessage,
  selectDraftCommentThread,
  selectDtUser,
  selectSelectedCommentThread,
  selectSelectedCommentThreadMessages,
  selectSelectedProposalCommentThreads,
  selectSelectedProposalInfo,
} from '../app.reducer';
import { WriteCommentMessageRequest } from '../../generated/types/trail/comment/message-api.pb';
import { EFFECT_DEBOUNCE_TIMER_MS } from '../app.effects.utils';
import { setSelectedProposalId } from '../app.actions/proposal.actions';
import { CommentMessage } from 'src/app/generated/types/trail/comment/message.pb';
import { CommentThread } from 'src/app/generated/types/trail/comment/thread.pb';

@Injectable()
export class CommentDataEffects {
  constructor(
    private readonly commentApiService: CommentApiService,
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly snackbar: MatSnackBar
  ) {}

  /**
   * Uploads a new comment thread to the backend along with
   * its first message.
   * Trigger {@link uploadNewCommentThreadWithMessage} is dispatched from components.
   * @public
   */
  uploadNewCommentThreadWithMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(uploadNewCommentThreadWithMessage),
        withLatestFrom(
          this.store.select(selectDraftCommentThread),
          this.store.select(selectDraftCommentMessage),
          this.store.select(selectSelectedProposalInfo),
          this.store.select(selectDtUser),
          this.store.select(selectSelectedProposalCommentThreads)
        ),
        debounce(() => timer(EFFECT_DEBOUNCE_TIMER_MS)),
        switchMap(
          ([
            ,
            draftCommentThread,
            draftCommentMessage,
            selectedProposalInfo,
            user,
            currentCommentThreads,
          ]) => {
            // Request objects.
            const newCommentThread = WriteCommentThreadRequest.fromPartial({
              ...draftCommentThread,
              proposalId: selectedProposalInfo?.proposal.id,
              diagramXml: selectedProposalInfo?.proposal.diagramXml,
            });
            const newCommentMessage = draftCommentMessage;

            // placeholder for UI.
            const placeholderCommentThread = CommentThread.fromPartial({
              ...newCommentThread,
              id: 'placeholder-thread',
              createdAt: new Date(),
              updatedAt: new Date(),
              createdBy: user?.id,
              proposalId: selectedProposalInfo?.proposal.id,
            });
            const placeholderCommentMessage = CommentMessage.fromPartial({
              ...newCommentMessage,
              commentThreadId: 'placeholder-thread',
              createdAt: new Date(),
              updatedAt: new Date(),
              createdBy: user?.id,
            });
            this.store.dispatch(
              addNewThreadWithMessage({
                thread: placeholderCommentThread,
                message: placeholderCommentMessage,
              })
            );
            this.store.dispatch(resetDraftComment());
            // Backend request.
            return this.commentApiService.createThreadWithMessage({
              threadData: newCommentThread,
              messageData: newCommentMessage,
            });
          }
        ),
        map((result) => {
          if (!result.threadResponse) {
            this.snackbar.open('Comment failed to save', 'close');
            return;
          }
          this.store.dispatch(fetchSelectedProposalCommentThreads());
          // this.store.dispatch(resetDraftComment());
        })
      ),
    { dispatch: false }
  );

  /**
   * Uploads a new comment message to its thread.
   * Trigger {@link uploadNewCommentMessageToThread} is dispatched from components.
   * @public
   */
  uploadNewCommentMessageToThread$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(uploadNewCommentMessageToThread),
        withLatestFrom(
          this.store.select(selectSelectedCommentThreadMessages),
          this.store.select(selectDtUser)
        ),
        debounce(() => timer(EFFECT_DEBOUNCE_TIMER_MS)),
        switchMap(([action, messages, user]) => {
          const placeholderCommentMessage = CommentMessage.fromPartial({
            createdBy: user?.id,
            text: action.text,
            commentThreadId: action.thread.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          this.store.dispatch(
            setSelectedCommentThreadMessages({
              messages: [...messages, placeholderCommentMessage],
              creators: [],
            })
          );
          const newCommentMessage = WriteCommentMessageRequest.fromPartial({
            text: action.text,
            commentThreadId: action.thread.id,
          });
          return this.commentApiService.createMessage({
            messageData: newCommentMessage,
          });
        }),
        map((res) => {
          if (!res?.commentMessage) {
            this.snackbar.open('Comment failed to save', 'close');
            return;
          }
          this.store.dispatch(fetchSelectedCommentThreadMessages());
        })
      ),
    { dispatch: false }
  );

  /**
   * Deletes a comment thread.
   * Trigger {@link deleteCommentThread} is dispatched from components.
   * @public
   */
  deleteCommentThread$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteCommentThread),
        debounce(() => timer(EFFECT_DEBOUNCE_TIMER_MS)),
        switchMap((action) => {
          this.store.dispatch(
            removeDeletedCommentThreadAndMessages({
              threadId: action.threadId,
            })
          );
          this.store.dispatch(resetSelectedCommentThread());
          return this.commentApiService.deleteThread({
            threadId: action.threadId,
          });
        }),
        map((res) => {
          if (!res?.commentThread?.id!) {
            this.snackbar.open(`Failed to deleted thread`, 'close');
            // TODO: Show the thread back in.
            return;
          }
        })
      ),
    { dispatch: false }
  );

  /**
   * Deletes a comment message.
   * Trigger {@link deleteCommentMessage} is dispatched from components.
   * @public
   */
  deleteCommentMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteCommentMessage),
        withLatestFrom(this.store.select(selectSelectedCommentThreadMessages)),
        debounce(() => timer(EFFECT_DEBOUNCE_TIMER_MS)),
        switchMap(([action, messages]) => {
          this.store.dispatch(
            removeDeletedCommentMessage({
              messageId: action.message.id!,
              threadId: action.message.commentThreadId!,
            })
          );
          return this.commentApiService
            .deleteMessage({
              messageId: action.message.id!,
            })
            .pipe(map((res) => ({ res, messages })));
        }),
        map(({ res, messages }) => {
          if (!res?.commentMessage?.id!) {
            this.snackbar.open(`Failed to deleted comment`, 'close');
            this.store.dispatch(
              setSelectedCommentThreadMessages({ messages, creators: [] })
            );
            return;
          }
        })
      ),
    { dispatch: false }
  );

  /**
   * Fetches the threads associated to the selected proposal.
   * Trigger {@link setSelectedProposal} is auto dispached.
   * Trigger {@link fetchSelectedProposalCommentThreads} is auto dispatched.
   * @protected
   */
  fetchSelectedProposalCommentThreads$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setSelectedProposalId, fetchSelectedProposalCommentThreads),
        withLatestFrom(this.store.select(selectSelectedProposalInfo)),
        debounce(() => timer(EFFECT_DEBOUNCE_TIMER_MS)),
        switchMap(([action, selectedProposalInfo]) => {
          if (action.type === setSelectedProposalId.type) {
            if (!action.proposalId) return of(undefined);
            return this.commentApiService.listThreads({
              proposalId: action.proposalId!,
            });
          } else {
            if (!selectedProposalInfo?.proposal.id) return of(undefined);
            return this.commentApiService.listThreads({
              proposalId: selectedProposalInfo?.proposal!.id!,
            });
          }
        }),
        map((res) => {
          if (res?.matchCount) {
            this.store.dispatch(
              setSelectedProposalCommentThreads({
                threads: res?.commentThreads || [],
                creators: res?.creators || [],
                messages: res?.commentMessagesOfThreads || [],
              })
            );
          }
        })
      ),
    { dispatch: false }
  );

  /**
   * Fetches the messages of the selected comment thread.
   * Trigger {@link setSelectedCommentThread} is auto dispatched.
   * Trigger {@link fetchSelectedCommentThreadMessages} is auto dispatched.
   * @protected
   */
  fetchSelectedCommentThreadMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setSelectedCommentThread, fetchSelectedCommentThreadMessages),
      withLatestFrom(this.store.select(selectSelectedCommentThread)),
      debounce(() => timer(EFFECT_DEBOUNCE_TIMER_MS)),
      switchMap(([action, selectedCommentThread]) => {
        if (action.type === setSelectedCommentThread.type) {
          return this.commentApiService.listMessages({
            threadId: action.thread?.id!,
          });
        }
        if (!selectedCommentThread?.id) return of(undefined);
        return this.commentApiService.listMessages({
          threadId: selectedCommentThread.id,
        });
      }),
      map((res) => {
        return setSelectedCommentThreadMessages({
          messages: res?.commentMessages || [],
          creators: res?.creators || [],
        });
      })
    )
  );
}
