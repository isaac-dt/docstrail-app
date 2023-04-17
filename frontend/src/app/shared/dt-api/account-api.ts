import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first, map, Observable, of } from 'rxjs';
import { GetUserResponse } from 'src/app/generated/types/account/user/user.api.pb';
import { UserRole } from 'src/app/generated/types/account/user/user.pb';
import {
  GetOrgSignupResponse,
  WriteOrgSignupRequest,
} from 'src/app/generated/types/logic/signup/org-signup.api.pb';
import { AuthenticationService } from '../fire-auth-api/auth.service';
import { DIMETRAIL_PATHS, HttpBase } from '../http-base';

/** Account API service. */
@Injectable({
  providedIn: 'root',
})
export class AccountApiService extends HttpBase {
  constructor(
    httpClient: HttpClient,
    authService: AuthenticationService,
    snackBar: MatSnackBar
  ) {
    super(httpClient, authService, snackBar);
  }

  getDtUser(): Observable<GetUserResponse | undefined> {
    const userId = this.authService.auth.currentUser?.uid;
    if (!userId) return of(undefined);
    return this.httpGet({
      domain: this.dimetrailApiUrl,
      path: `${DIMETRAIL_PATHS.ACCOUNT_USER}/${userId}`,
      hidePermissionError: true,
    }).pipe(
      first(),
      map((response) => {
        if (response === undefined) return undefined;
        return GetUserResponse.fromPartial(response);
      })
    );
  }

  createDtUserWithOrg(args: {
    fullName: string;
    email: string;
    photoUrl?: string;
  }): Observable<GetOrgSignupResponse | undefined> {
    const orgSignupRequest = WriteOrgSignupRequest.fromPartial({
      userRole: UserRole.UNKNOWN_ROLE,
      userFullName: args.fullName,
      email: args.email,
    });
    if (args.photoUrl) orgSignupRequest.photoUrl = args.photoUrl;
    return this.httpPost({
      domain: this.dimetrailApiUrl,
      path: DIMETRAIL_PATHS.LOGIC_ORG_SIGNUP,
      jsonBody: WriteOrgSignupRequest.toJSON(orgSignupRequest) as string,
    }).pipe(
      first(),
      map((response) => {
        if (response === undefined) return undefined;
        return GetOrgSignupResponse.fromPartial(response);
      })
    );
  }
}
