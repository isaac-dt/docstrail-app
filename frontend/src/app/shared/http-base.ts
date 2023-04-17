import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './fire-auth-api/auth.service';
import { catchError, first, from, map, Observable, of, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorCode, JsonResponse } from '../generated/types/common.pb';

export const DIMETRAIL_PATHS = {
  ACCOUNT_USER: 'account/user',
  LOGIC_ORG_SIGNUP: 'logic/org-signup',
  PROPOSAL: 'proposal/v1',
  COMMENT: 'comment/v1',
};

@Injectable()
export class HttpBase {
  readonly dimetrailApiUrl = environment.dimetrailApi.url;

  constructor(
    private http: HttpClient,
    readonly authService: AuthenticationService,
    readonly snackBar: MatSnackBar
  ) {}

  protected httpGet<T>(args: {
    domain: string;
    path: string;
    hidePermissionError?: boolean;
  }): Observable<any> {
    args.path = this.getTrimedPath(args.path);

    let headers = new HttpHeaders();
    return from(
      this.authService.auth.currentUser?.getIdToken() ||
        Promise.resolve(undefined)
    ).pipe(
      first(),
      switchMap((jwt) => {
        headers = headers.set('authorization', `Bearer ${jwt}`);
        return this.http
          .get<Partial<JsonResponse>>(`${args.domain}/${args.path}`, {
            headers,
          })
          .pipe(
            catchError((response) => {
              const appJsonResponse: JsonResponse = response.error;
              const showError = () => {
                this.snackBar.open(
                  'Request failed. ' + response.message,
                  'Exit'
                );
                console.error(`${args.domain}/${args.path}`, response.error);
              };
              if (!appJsonResponse) showError();
              else if (
                appJsonResponse.error?.errorCode ===
                  ErrorCode.MISSING_PERMISSION &&
                args.hidePermissionError
              ) {
                return of(undefined);
              }
              showError();
              return of(undefined);
            }),
            map((response) => {
              return response?.data;
            })
          );
      })
    );
  }

  protected httpPost<T>(args: {
    domain: string;
    path: string;
    jsonBody: string;
  }): Observable<any> {
    args.path = this.getTrimedPath(args.path);

    let headers = new HttpHeaders();
    return from(
      this.authService.auth.currentUser?.getIdToken() ||
        Promise.resolve(undefined)
    ).pipe(
      first(),
      switchMap((jwt) => {
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('authorization', `Bearer ${jwt}`);
        return this.http
          .post<Partial<JsonResponse>>(
            `${args.domain}/${args.path}`,
            args.jsonBody,
            { headers }
          )
          .pipe(
            catchError((error) => {
              console.error(error);
              this.snackBar.open('Request failed. ' + error.message, 'Exit');
              return of(undefined);
            }),
            map((response) => {
              if (response?.error) {
                console.error(`${args.domain}/${args.path}`, response.error);
              }
              return response?.data;
            })
          );
      })
    );
  }

  protected httpPatch<T>(args: {
    domain: string;
    path: string;
    id: string;
    jsonBody: string;
  }): Observable<any> {
    args.path = this.getTrimedPath(args.path);

    let headers = new HttpHeaders();
    return from(
      this.authService.auth.currentUser?.getIdToken() ||
        Promise.resolve(undefined)
    ).pipe(
      first(),
      switchMap((jwt) => {
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('authorization', `Bearer ${jwt}`);
        return this.http
          .patch<Partial<JsonResponse>>(
            `${args.domain}/${args.path}/${args.id}`,
            args.jsonBody,
            { headers }
          )
          .pipe(
            catchError((error) => {
              console.error(error);
              this.snackBar.open('Request failed. ' + error.message, 'Exit');
              return of(undefined);
            }),
            map((response) => {
              if (response?.error) {
                console.error(`${args.domain}/${args.path}`, response.error);
              }
              return response?.data;
            })
          );
      })
    );
  }

  protected httpDelete<T>(args: {
    domain: string;
    path: string;
    id: string;
  }): Observable<any> {
    args.path = this.getTrimedPath(args.path);

    let headers = new HttpHeaders();
    return from(
      this.authService.auth.currentUser?.getIdToken() ||
        Promise.resolve(undefined)
    ).pipe(
      first(),
      switchMap((jwt) => {
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('authorization', `Bearer ${jwt}`);
        return this.http
          .delete<Partial<JsonResponse>>(
            `${args.domain}/${args.path}/${args.id}`,
            { headers }
          )
          .pipe(
            catchError((error) => {
              console.error(error);
              this.snackBar.open('Request failed. ' + error.message, 'Exit');
              return of(undefined);
            }),
            map((response) => {
              if (response?.error) {
                console.error(`${args.domain}/${args.path}`, response.error);
              }
              return response?.data;
            })
          );
      })
    );
  }

  private getTrimedPath(path: string) {
    return (path = path[0] !== '/' ? path : path.substring(1));
  }
}
