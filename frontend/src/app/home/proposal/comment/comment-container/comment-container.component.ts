import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/generated/types/account/user/user.pb';
import { CommentThread } from 'src/app/generated/types/trail/comment/thread.pb';
import {
  selectIsProposalReviewMode,
  selectSelectedProposalCommentThreads,
  selectUsersRegistry,
} from 'src/app/store/app.reducer';

@Component({
  selector: 'app-jgraph-comment-container',
  templateUrl: './comment-container.component.html',
  styleUrls: ['./comment-container.component.scss'],
})
export class JgraphCommentContainerComponent {
  readonly isProposalReviewMode$ = this.store.select(
    selectIsProposalReviewMode
  );
  readonly selectedProposalCommentThreads$ = this.store.select(
    selectSelectedProposalCommentThreads
  );
  readonly usersRegistry$ = this.store.select(selectUsersRegistry);

  draftCommentIsVisibleFn: Function = () => {};

  constructor(readonly store: Store) {}

  getThreadCreator(thread: CommentThread, usersRegistry: Record<string, User>) {
    return usersRegistry[thread.createdBy!];
  }

  setDraftCommentIsVisibleFn(fn: Function) {
    this.draftCommentIsVisibleFn = fn;
  }
}
