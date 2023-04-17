import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first, map, Observable, of } from 'rxjs';
import {
  GetProposalResponse,
  GetShareProposalResponse,
  ListProposalResponse,
  WriteProposalRequest,
  WriteShareProposalRequest,
} from 'src/app/generated/types/trail/proposal/proposal.api.pb';
import { AuthenticationService } from '../fire-auth-api/auth.service';
import { DIMETRAIL_PATHS, HttpBase } from '../http-base';

import {
  GetProposalReviewResponse,
  ListProposalReviewResponse,
  WriteProposalReviewRequest,
} from 'src/app/generated/types/trail/proposal/review.api.pb';

/** Proposal API service. */
@Injectable({
  providedIn: 'root',
})
export class ProposalApiService extends HttpBase {
  constructor(
    httpClient: HttpClient,
    authService: AuthenticationService,
    snackBar: MatSnackBar
  ) {
    super(httpClient, authService, snackBar);
  }

  getProposal(args: {
    proposalId: string;
  }): Observable<GetProposalResponse | undefined> {
    const userId = this.authService.auth.currentUser?.uid;
    if (!userId) return of(undefined);
    return this.httpGet({
      domain: this.dimetrailApiUrl,
      path: `${DIMETRAIL_PATHS.PROPOSAL}/id/${args.proposalId}`,
    }).pipe(
      first(),
      map((response) => {
        if (response === undefined) return undefined;
        return GetProposalResponse.fromPartial(response);
      })
    );
  }

  getProposalReview(args: {
    reviewId: string;
  }): Observable<GetProposalReviewResponse | undefined> {
    const userId = this.authService.auth.currentUser?.uid;
    if (!userId) return of(undefined);
    return this.httpGet({
      domain: this.dimetrailApiUrl,
      path: `${DIMETRAIL_PATHS.PROPOSAL}/review/id/${args.reviewId}`,
    }).pipe(
      first(),
      map((response) => {
        if (response === undefined) return undefined;
        return GetProposalReviewResponse.fromPartial(response);
      })
    );
  }

  listProposals(): Observable<ListProposalResponse | undefined> {
    const userId = this.authService.auth.currentUser?.uid;
    if (!userId) return of(undefined);
    return this.httpGet({
      domain: this.dimetrailApiUrl,
      path: `${DIMETRAIL_PATHS.PROPOSAL}/list`,
    }).pipe(
      first(),
      map((response) => {
        if (response === undefined) return undefined;
        return ListProposalResponse.fromPartial(response);
      })
    );
  }

  listProposalReviews(args: {
    proposalId: string;
  }): Observable<ListProposalReviewResponse | undefined> {
    const userId = this.authService.auth.currentUser?.uid;
    if (!userId) return of(undefined);
    return this.httpGet({
      domain: this.dimetrailApiUrl,
      path: `${DIMETRAIL_PATHS.PROPOSAL}/review/list/${args.proposalId}`,
    }).pipe(
      first(),
      map((response) => {
        if (response === undefined) return undefined;
        return ListProposalReviewResponse.fromPartial(response);
      })
    );
  }

  createProposal(args: {
    proposalData: WriteProposalRequest;
  }): Observable<GetProposalResponse | undefined> {
    const userId = this.authService.auth.currentUser?.uid;
    if (!userId) return of(undefined);
    return this.httpPost({
      domain: this.dimetrailApiUrl,
      path: `${DIMETRAIL_PATHS.PROPOSAL}/create`,
      jsonBody: WriteProposalRequest.toJSON(args.proposalData) as string,
    }).pipe(
      first(),
      map((response) => {
        if (response === undefined) return undefined;
        return GetProposalResponse.fromPartial(response);
      })
    );
  }

  createProposalReview(args: {
    reviewData: WriteProposalReviewRequest;
  }): Observable<GetProposalReviewResponse | undefined> {
    const userId = this.authService.auth.currentUser?.uid;
    if (!userId) return of(undefined);
    return this.httpPost({
      domain: this.dimetrailApiUrl,
      path: `${DIMETRAIL_PATHS.PROPOSAL}/review`,
      jsonBody: WriteProposalReviewRequest.toJSON(args.reviewData) as string,
    }).pipe(
      first(),
      map((response) => {
        if (response === undefined) return undefined;
        return GetProposalReviewResponse.fromPartial(response);
      })
    );
  }

  updateProposal(args: {
    proposalId: string;
    proposalData: WriteProposalRequest;
    proposalName: string;
  }) {
    const userId = this.authService.auth.currentUser?.uid;
    if (!userId) return of(undefined);
    return this.httpPatch({
      domain: this.dimetrailApiUrl,
      path: `${DIMETRAIL_PATHS.PROPOSAL}/id`,
      id: args.proposalId,
      jsonBody: WriteProposalRequest.toJSON(args.proposalData) as string,
    }).pipe(
      first(),
      map((response) => {
        if (response === undefined) return undefined;
        return GetProposalResponse.fromPartial(response);
      })
    );
  }

  updateProposalReview(args: {
    reviewId: string;
    reviewData: WriteProposalReviewRequest;
  }): Observable<GetProposalReviewResponse | undefined> {
    const userId = this.authService.auth.currentUser?.uid;
    if (!userId) return of(undefined);
    return this.httpPatch({
      domain: this.dimetrailApiUrl,
      path: `${DIMETRAIL_PATHS.PROPOSAL}/review/id`,
      id: args.reviewId,
      jsonBody: WriteProposalReviewRequest.toJSON(args.reviewData) as string,
    }).pipe(
      first(),
      map((response) => {
        if (response === undefined) return undefined;
        return GetProposalReviewResponse.fromPartial(response);
      })
    );
  }

  deleteProposal(args: { proposalId: string }) {
    const userId = this.authService.auth.currentUser?.uid;
    if (!userId) return of(undefined);
    return this.httpDelete({
      domain: this.dimetrailApiUrl,
      path: `${DIMETRAIL_PATHS.PROPOSAL}/id`,
      id: args.proposalId,
    }).pipe(
      first(),
      map((response) => {
        if (response === undefined) return undefined;
        return GetProposalResponse.fromPartial(response);
      })
    );
  }

  deleteProposalReview(args: {
    reviewId: string;
  }): Observable<GetProposalReviewResponse | undefined> {
    const userId = this.authService.auth.currentUser?.uid;
    if (!userId) return of(undefined);
    return this.httpDelete({
      domain: this.dimetrailApiUrl,
      path: `${DIMETRAIL_PATHS.PROPOSAL}/review/id`,
      id: args.reviewId,
    }).pipe(
      first(),
      map((response) => {
        if (response === undefined) return undefined;
        return GetProposalReviewResponse.fromPartial(response);
      })
    );
  }

  shareProposal(args: WriteShareProposalRequest) {
    const userId = this.authService.auth.currentUser?.uid;
    if (!userId) return of(undefined);
    return this.httpPost({
      domain: this.dimetrailApiUrl,
      path: `${DIMETRAIL_PATHS.PROPOSAL}/permission`,
      jsonBody: WriteShareProposalRequest.toJSON(args) as string,
    }).pipe(
      first(),
      map((response) => {
        if (response === undefined) return undefined;
        return GetShareProposalResponse.fromPartial(response);
      })
    );
  }
}
