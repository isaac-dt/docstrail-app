import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { ReplaySubject, takeUntil } from 'rxjs';
import { User } from 'src/app/generated/types/account/user/user.pb';
import {
  CommentThread,
  CommentThread_Type,
} from 'src/app/generated/types/trail/comment/thread.pb';
import {
  deleteCommentMessage,
  deleteCommentThread,
  resetSelectedCommentThread,
  setSelectedCommentThread,
  uploadNewCommentMessageToThread,
} from 'src/app/store/app.actions/message.actions';
import {
  selectDtUser,
  selectSelectedCommentThread,
  selectSelectedCommentThreadMessages,
  selectUsersRegistry,
} from 'src/app/store/app.reducer';
import { TextAreaContext } from '../../../common-components/trail-text-area/trail-text-area.component';
import { Validators } from '@angular/forms';
import { CommentMessage } from 'src/app/generated/types/trail/comment/message.pb';
import { uniqueId } from 'lodash';

@Component({
  selector: 'app-old-comment',
  templateUrl: './old-comment.component.html',
  styleUrls: ['./old-comment.component.scss'],
})
export class OldCommentComponent implements OnDestroy {
  @Input('thread') thread!: CommentThread;
  @Input('creator') creator!: User;
  @ViewChild('screenshotEl') screenshotEl!: ElementRef;

  readonly CommentThreadType = CommentThread_Type;
  readonly selectedCommentThread$ = this.store.select(
    selectSelectedCommentThread
  );
  readonly selectedCommentThreadMessages$ = this.store.select(
    selectSelectedCommentThreadMessages
  );
  readonly usersRegistry$ = this.store.select(selectUsersRegistry);
  readonly dtUser$ = this.store.select(selectDtUser);

  readonly uid = uniqueId();
  readonly destroyed = new ReplaySubject<void>();

  messageTextAreaContext!: TextAreaContext;

  constructor(readonly store: Store) {}

  ngAfterViewInit() {
    this.selectedCommentThread$
      .pipe(takeUntil(this.destroyed))
      .subscribe((thread) => {
        if (thread?.id !== this.thread.id) this.clearScreenshotElement();
        else if (thread.screenshot) this.renderScreenshotElement();
      });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  toggleSelectedThread(selectedThread: CommentThread | null) {
    if (selectedThread?.id === this.thread.id) {
      this.store.dispatch(resetSelectedCommentThread());
      this.clearScreenshotElement();
      return;
    }
    this.store.dispatch(setSelectedCommentThread({ thread: this.thread }));
  }

  renderScreenshotElement() {
    // Create a element that represents the container.
    const tempEl = document.createElement('div');
    tempEl.innerHTML = this.thread.screenshot!.imageContainerOuterHtml!;
    const containerOuterEl = tempEl.firstElementChild as HTMLElement;
    // Set the container's style.
    containerOuterEl.style.height = String(
      this.thread.screenshot!.imageContainerHeight!
    );
    containerOuterEl.style.width = String(
      this.thread.screenshot!.imageContainerWidth!
    );
    containerOuterEl.style.backgroundColor = 'white';

    this.screenshotEl.nativeElement.innerHTML = '';
    this.screenshotEl.nativeElement.appendChild(containerOuterEl);
  }

  clearScreenshotElement() {
    this.screenshotEl.nativeElement.innerHTML = '';
  }

  isType(commentThreadType: CommentThread_Type, thread: CommentThread | null) {
    return thread && thread?.type === commentThreadType;
  }

  isSelected(selectedThread: CommentThread | null) {
    if (!selectedThread || !this.thread) return false;
    return this.thread.id === selectedThread?.id;
  }

  getTime(time: any) {
    return new Date(time as Date);
  }

  isMe(user: User, currentUser: User | null) {
    return user.id === currentUser?.id;
  }

  saveTextAreaContext(context: TextAreaContext) {
    this.messageTextAreaContext = context;
    this.messageTextAreaContext.control.addValidators(Validators.required);
  }

  addMessage() {
    this.messageTextAreaContext.save();
    const messageText = this.messageTextAreaContext.control.value;
    if (!messageText) {
      this.messageTextAreaContext.control.setErrors({ required: true });
      this.messageTextAreaContext.clearErrorAfterDelay();
      return;
    }
    this.store.dispatch(
      uploadNewCommentMessageToThread({
        text: messageText,
        thread: this.thread,
      })
    );
    this.messageTextAreaContext.control.reset();
    this.messageTextAreaContext.control.setErrors(null);
  }

  getMessageCreator(
    message: CommentMessage,
    usersRegistry: Record<string, User>
  ) {
    return usersRegistry[message.createdBy!];
  }

  deleteThread() {
    this.store.dispatch(deleteCommentThread({ threadId: this.thread.id! }));
  }

  deleteMessage(message: CommentMessage, thread: CommentThread) {
    this.store.dispatch(deleteCommentMessage({ message, thread }));
  }
}
