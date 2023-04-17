import { createAction, props } from '@ngrx/store';
import { User as FireAuthUser } from 'firebase/auth';
import { User as DtUser } from '../../generated/types/account/user/user.pb';
import {
  CommentThread,
  CommentThread_GraphScreenshot,
} from '../../generated/types/trail/comment/thread.pb';

import { WriteCommentMessageRequest } from '../../generated/types/trail/comment/message-api.pb';
import { CommentMessage } from '../../generated/types/trail/comment/message.pb';
import { WriteCommentThreadRequest } from '../../generated/types/trail/comment/thread-api.pb';

export const setDraftCommentThreadScreenshot = createAction(
  '[App Store] create draft comment thread screenshot',
  props<{
    screenshot: CommentThread_GraphScreenshot;
  }>()
);

export const setDraftCommentThread = createAction(
  '[App Store] set draft comment thread',
  props<{
    thread: WriteCommentThreadRequest;
  }>()
);

export const setDraftCommentMessage = createAction(
  '[App Store] set draft comment message',
  props<{
    message: WriteCommentMessageRequest;
  }>()
);

export const resetDraftComment = createAction(
  '[App Store] reset draft comment'
);

export const setSelectedCommentThread = createAction(
  '[App Store] set selected comment thread',
  props<{
    thread: CommentThread;
  }>()
);

export const resetSelectedCommentThread = createAction(
  '[App Store] reset selected comment thread'
);

export const uploadNewCommentThreadWithMessage = createAction(
  '[App Store] upload new comment thread with messge'
);

export const deleteCommentThread = createAction(
  '[App Store] delete comment thread',
  props<{ threadId: string }>()
);

export const removeDeletedCommentThreadAndMessages = createAction(
  '[App Store] remove deleted comment thread and messages',
  props<{ threadId: string }>()
);

export const fetchSelectedProposalCommentThreads = createAction(
  '[App Store] fetch selected proposal comment threads'
);

export const setSelectedProposalCommentThreads = createAction(
  '[App Store] set selected proposal comment threads',
  props<{
    threads: readonly CommentThread[];
    creators: readonly DtUser[];
    messages: readonly CommentMessage[];
  }>()
);

export const fetchSelectedCommentThreadMessages = createAction(
  '[App Store] fetch selected comment thread messages'
);

export const setSelectedCommentThreadMessages = createAction(
  '[App Store] set selected comment thread messages',
  props<{ messages: readonly CommentMessage[]; creators: readonly DtUser[] }>()
);

export const deleteCommentMessage = createAction(
  '[App Store] delete comment message',
  props<{ message: CommentMessage; thread: CommentThread }>()
);

export const removeDeletedCommentMessage = createAction(
  '[App Store] remove deleted comment message',
  props<{ messageId: string; threadId: string }>()
);

export const uploadNewCommentMessageToThread = createAction(
  '[App Store] upload new comment message to thread',
  props<{ thread: CommentThread; text: string }>()
);

export const addNewThreadWithMessage = createAction(
  '[App Store] add new thread with message',
  props<{ thread: CommentThread; message: CommentMessage }>()
);
