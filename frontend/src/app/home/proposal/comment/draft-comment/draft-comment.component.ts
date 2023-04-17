import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  ReplaySubject,
  debounce,
  filter,
  first,
  takeUntil,
  timer,
  withLatestFrom,
} from 'rxjs';
import { WriteCommentMessageRequest } from 'src/app/generated/types/trail/comment/message-api.pb';
import { WriteCommentThreadRequest } from 'src/app/generated/types/trail/comment/thread-api.pb';
import { CommentThread_Type } from 'src/app/generated/types/trail/comment/thread.pb';
import {
  resetDraftComment,
  resetSelectedCommentThread,
  setDraftCommentMessage,
  setDraftCommentThread,
  setSelectedCommentThread,
  uploadNewCommentThreadWithMessage,
} from 'src/app/store/app.actions/message.actions';
import {
  selectDraftCommentMessage,
  selectDraftCommentThread,
  selectFireAuthUserData,
  selectSelectedCommentThread,
  selectSelectedProposalCommentThreads,
  selectSelectedProposalInfo,
} from 'src/app/store/app.reducer';
import { TextAreaContext } from '../../../common-components/trail-text-area/trail-text-area.component';

@Component({
  selector: 'app-draft-comment',
  templateUrl: './draft-comment.component.html',
  styleUrls: ['./draft-comment.component.scss'],
})
export class DraftCommentComponent implements AfterViewInit {
  @Output('onToggleButtonEmitted') toggleButtonEmitter =
    new EventEmitter<Function>();
  @ViewChild('screenshotEl') screenshotEl!: ElementRef;

  readonly CommentThreadType = CommentThread_Type;
  readonly fireAuthUserData$ = this.store.select(selectFireAuthUserData);
  readonly thread$ = this.store.select(selectDraftCommentThread);
  readonly message$ = this.store.select(selectDraftCommentMessage);
  readonly selectedCommentThread$ = this.store.select(
    selectSelectedCommentThread
  );
  readonly selectedProposalInfo$ = this.store.select(
    selectSelectedProposalInfo
  );
  readonly selectedProposalCommentThreads$ = this.store.select(
    selectSelectedProposalCommentThreads
  );
  readonly destroyed = new ReplaySubject<void>();

  messageTextAreaContext!: TextAreaContext;
  isVisible: boolean = false;

  constructor(readonly store: Store) {}

  ngAfterViewInit() {
    this.selectedProposalInfo$
      .pipe(
        debounce(() => timer(500)),
        filter((proposalInfo) => !!proposalInfo),
        takeUntil(this.destroyed),
        withLatestFrom(this.selectedProposalCommentThreads$)
      )
      .subscribe(([, threads]) => {
        this.store.dispatch(resetDraftComment());
        this.messageTextAreaContext?.control.reset();
        this.messageTextAreaContext?.control.setErrors(null);
        if (!threads?.length) {
          this.setIsVisible(true);
        } else {
          this.setIsVisible(false);
        }
      });
    this.thread$.pipe(takeUntil(this.destroyed)).subscribe((thread) => {
      if (!this.isVisible) return;
      if (thread?.screenshot) this.renderScreenshotElement(thread);
      else this.clearScreenshotElement();
    });
    this.selectedCommentThread$
      .pipe(takeUntil(this.destroyed))
      .subscribe((thread) => {
        if (thread !== undefined) this.setIsVisible(false);
      });
    this.toggleButtonEmitter.next(this.setIsVisible.bind(this));
  }

  setType(
    commentThreadType: CommentThread_Type,
    thread: WriteCommentThreadRequest | null
  ) {
    if (!thread) return;
    this.store.dispatch(
      setDraftCommentThread({
        thread: WriteCommentThreadRequest.fromPartial({
          ...thread,
          type: commentThreadType,
        }),
      })
    );
  }

  isType(
    commentThreadType: CommentThread_Type,
    thread: WriteCommentThreadRequest | null
  ) {
    return thread && thread?.type === commentThreadType;
  }

  renderScreenshotElement(thread: WriteCommentThreadRequest) {
    // Create a element that represents the container.
    const tempEl = document.createElement('div');
    tempEl.innerHTML = thread.screenshot!.imageContainerOuterHtml!;
    const containerOuterEl = tempEl.firstElementChild as HTMLElement;
    // Set the container's style.
    containerOuterEl.style.height = String(
      thread.screenshot!.imageContainerHeight!
    );
    containerOuterEl.style.width = String(
      thread.screenshot!.imageContainerWidth!
    );
    containerOuterEl.style.backgroundColor = 'white';

    this.screenshotEl.nativeElement.innerHTML = '';
    this.screenshotEl.nativeElement.appendChild(containerOuterEl);
  }

  clearScreenshotElement() {
    if (this.screenshotEl) {
      this.screenshotEl.nativeElement.innerHTML = '';
    }
  }

  clearScreenshot(thread: WriteCommentThreadRequest | null) {
    if (!thread) return this.store.dispatch(resetDraftComment());
    this.store.dispatch(
      setDraftCommentThread({ thread: { ...thread, screenshot: undefined } })
    );
  }

  submitThreadWithMessage(thread: WriteCommentThreadRequest | null) {
    this.messageTextAreaContext.save();
    const message = this.messageTextAreaContext.control.value;
    if (!thread || !message) {
      this.messageTextAreaContext.control.setErrors({ required: true });
      this.messageTextAreaContext.clearErrorAfterDelay();
      return;
    }
    this.store.dispatch(
      setDraftCommentMessage({
        message: WriteCommentMessageRequest.fromPartial({ text: message }),
      })
    );
    setTimeout(() => {
      this.store.dispatch(uploadNewCommentThreadWithMessage());
      this.setIsVisible(false);
      this.messageTextAreaContext.control.reset();
      this.messageTextAreaContext.control.setErrors(null);
    }, 1000);
  }

  saveTextAreaContext(context: TextAreaContext) {
    this.messageTextAreaContext = context;
    this.messageTextAreaContext.control.addValidators(Validators.required);
  }

  saveDraftMessage(text: string) {
    this.store.dispatch(
      setDraftCommentMessage({
        message: WriteCommentMessageRequest.fromPartial({ text }),
      })
    );
  }

  setIsVisible(useValue?: boolean) {
    if (useValue !== undefined) {
      this.isVisible = useValue;
    } else {
      this.isVisible = !this.isVisible;
    }
    if (this.isVisible) {
      this.clearScreenshotElement();
      this.store.dispatch(resetSelectedCommentThread());
    }
    this.store.dispatch(resetDraftComment());
  }

  getPlaceholder(thread: WriteCommentThreadRequest | null) {
    if (!thread) return '';
    switch (thread.type) {
      case CommentThread_Type.NOTE: {
        return 'Add a note ...';
      }
      case CommentThread_Type.QUESTION: {
        return 'Add a question ...';
      }
      case CommentThread_Type.SUGGESTION: {
        return 'Add a suggestion ...';
      }
      default: {
        return 'Type here ...';
      }
    }
  }
}
