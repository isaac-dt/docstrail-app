import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, first, map, Observable, of, switchMap } from 'rxjs';
import {
  GetCommentMessageResponse,
  ListCommentMessageResponse,
  WriteCommentMessageRequest,
} from 'src/app/generated/types/trail/comment/message-api.pb';
import {
  GetCommentThreadResponse,
  ListCommentThreadResponse,
  WriteCommentThreadRequest,
} from 'src/app/generated/types/trail/comment/thread-api.pb';
import { AuthenticationService } from '../fire-auth-api/auth.service';
import { DIMETRAIL_PATHS, HttpBase } from '../http-base';

/** Comment API service. */
@Injectable({
  providedIn: 'root',
})
export class CommentApiService extends HttpBase {
  constructor(
    httpClient: HttpClient,
    authService: AuthenticationService,
    snackBar: MatSnackBar
  ) {
    super(httpClient, authService, snackBar);
  }

  getThread(args: {
    threadId: string;
  }): Observable<GetCommentThreadResponse | undefined> {
    const userId = this.authService.auth.currentUser?.uid;
    if (!userId) return of(undefined);
    return this.httpGet({
      domain: this.dimetrailApiUrl,
      path: `${DIMETRAIL_PATHS.COMMENT}/thread/id/${args.threadId}`,
    }).pipe(
      first(),
      map((response) => {
        if (response === undefined) return undefined;
        return GetCommentThreadResponse.fromPartial(response);
      })
    );
  }

  getMessage(args: {
    messageId: string;
  }): Observable<GetCommentMessageResponse | undefined> {
    const userId = this.authService.auth.currentUser?.uid;
    if (!userId) return of(undefined);
    return this.httpGet({
      domain: this.dimetrailApiUrl,
      path: `${DIMETRAIL_PATHS.COMMENT}/message/id/${args.messageId}`,
    }).pipe(
      first(),
      map((response) => {
        if (response === undefined) return undefined;
        return GetCommentMessageResponse.fromPartial(response);
      })
    );
  }

  listThreads(args: {
    proposalId: string;
  }): Observable<ListCommentThreadResponse | undefined> {
    const userId = this.authService.auth.currentUser?.uid;
    if (!userId) return of(undefined);
    return this.httpGet({
      domain: this.dimetrailApiUrl,
      path: `${DIMETRAIL_PATHS.COMMENT}/thread/list/${args.proposalId}`,
    }).pipe(
      first(),
      map((response) => {
        if (response === undefined) return undefined;
        return ListCommentThreadResponse.fromPartial(response);
      })
    );
  }

  listMessages(args: {
    threadId: string;
  }): Observable<ListCommentMessageResponse | undefined> {
    const userId = this.authService.auth.currentUser?.uid;
    if (!userId) return of(undefined);
    return this.httpGet({
      domain: this.dimetrailApiUrl,
      path: `${DIMETRAIL_PATHS.COMMENT}/message/list/${args.threadId}`,
    }).pipe(
      first(),
      map((response) => {
        if (response === undefined) return undefined;
        return ListCommentMessageResponse.fromPartial(response);
      })
    );
  }

  /** Message data does not require a threadId in this method. */
  createThreadWithMessage(args: {
    threadData: WriteCommentThreadRequest;
    messageData: WriteCommentMessageRequest;
  }): Observable<{
    threadResponse: GetCommentThreadResponse | undefined;
    messageResponse: GetCommentMessageResponse | undefined;
  }> {
    return this.createThread({ threadData: args.threadData }).pipe(
      catchError((error: any) => {
        console.error(error);
        return of(undefined);
      }),
      switchMap((threadResponse) => {
        if (!threadResponse)
          return of({ messageResponse: undefined, threadResponse });
        return this.createMessage({
          messageData: {
            ...args.messageData,
            commentThreadId: threadResponse.commentThread!.id,
          },
        }).pipe(
          catchError((error: any) => {
            console.log(error);
            return of(undefined);
          }),
          map((messageResponse) => {
            return { messageResponse, threadResponse };
          })
        );
      }),
      map((response) => {
        return response;
      })
    );
  }

  createThread(args: {
    threadData: WriteCommentThreadRequest;
  }): Observable<GetCommentThreadResponse | undefined> {
    const userId = this.authService.auth.currentUser?.uid;
    if (!userId) return of(undefined);
    return this.httpPost({
      domain: this.dimetrailApiUrl,
      path: `${DIMETRAIL_PATHS.COMMENT}/thread`,
      jsonBody: WriteCommentThreadRequest.toJSON(args.threadData) as string,
    }).pipe(
      first(),
      map((response) => {
        if (response === undefined) return undefined;
        return GetCommentThreadResponse.fromPartial(response);
      })
    );
  }

  createMessage(args: {
    messageData: WriteCommentMessageRequest;
  }): Observable<GetCommentMessageResponse | undefined> {
    const userId = this.authService.auth.currentUser?.uid;
    if (!userId) return of(undefined);
    return this.httpPost({
      domain: this.dimetrailApiUrl,
      path: `${DIMETRAIL_PATHS.COMMENT}/message`,
      jsonBody: WriteCommentMessageRequest.toJSON(args.messageData) as string,
    }).pipe(
      first(),
      map((response) => {
        if (response === undefined) return undefined;
        return GetCommentMessageResponse.fromPartial(response);
      })
    );
  }

  updateThread(args: {
    threadId: string;
    threadData: WriteCommentThreadRequest;
  }): Observable<GetCommentThreadResponse | undefined> {
    const userId = this.authService.auth.currentUser?.uid;
    if (!userId) return of(undefined);
    return this.httpPatch({
      domain: this.dimetrailApiUrl,
      path: `${DIMETRAIL_PATHS.COMMENT}/thread/id`,
      id: args.threadId,
      jsonBody: WriteCommentThreadRequest.toJSON(args.threadData) as string,
    }).pipe(
      first(),
      map((response) => {
        if (response === undefined) return undefined;
        return GetCommentThreadResponse.fromPartial(response);
      })
    );
  }

  updateMessage(args: {
    messageId: string;
    messageData: WriteCommentMessageRequest;
  }): Observable<GetCommentMessageResponse | undefined> {
    const userId = this.authService.auth.currentUser?.uid;
    if (!userId) return of(undefined);
    return this.httpPatch({
      domain: this.dimetrailApiUrl,
      path: `${DIMETRAIL_PATHS.COMMENT}/message/id`,
      id: args.messageId,
      jsonBody: WriteCommentMessageRequest.toJSON(args.messageData) as string,
    }).pipe(
      first(),
      map((response) => {
        if (response === undefined) return undefined;
        return GetCommentMessageResponse.fromPartial(response);
      })
    );
  }

  deleteThread(args: {
    threadId: string;
  }): Observable<GetCommentThreadResponse | undefined> {
    const userId = this.authService.auth.currentUser?.uid;
    if (!userId) return of(undefined);
    return this.httpDelete({
      domain: this.dimetrailApiUrl,
      path: `${DIMETRAIL_PATHS.COMMENT}/thread/id`,
      id: args.threadId,
    }).pipe(
      first(),
      map((response) => {
        if (response === undefined) return undefined;
        return GetCommentThreadResponse.fromPartial(response);
      })
    );
  }

  deleteMessage(args: {
    messageId: string;
  }): Observable<GetCommentMessageResponse | undefined> {
    const userId = this.authService.auth.currentUser?.uid;
    if (!userId) return of(undefined);
    return this.httpDelete({
      domain: this.dimetrailApiUrl,
      path: `${DIMETRAIL_PATHS.COMMENT}/message/id`,
      id: args.messageId,
    }).pipe(
      first(),
      map((response) => {
        if (response === undefined) return undefined;
        return GetCommentMessageResponse.fromPartial(response);
      })
    );
  }
}
