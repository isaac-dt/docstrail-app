import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UserCredential as FireAuthUserCredential } from 'firebase/auth';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { GetUserResponse } from 'src/app/generated/types/account/user/user.api.pb';
import { GetOrgSignupResponse } from 'src/app/generated/types/logic/signup/org-signup.api.pb';
import { AccountApiService } from 'src/app/shared/dt-api/account-api';
import { AuthenticationService } from '../../shared/fire-auth-api/auth.service';
import { registerLoading, unregisterLoading } from '../app.actions/app.actions';
import { selectFireAuthUserData } from '../app.reducer';
import {
  submitLegacySignup,
  submitLegacyLogin,
  submitLoginWithGoogle,
  submitLogout,
  submitEmailVerificationRequest,
  refreshFireAuthUser,
  submitSignupNext,
} from '../app.actions/auth.actions';
import {
  setDtOrg,
  setDtTeam,
  setDtUser,
  setFireAuthUserData,
} from '../app.actions/account.actions';

/**
 * TODO: JSDocs to be added.
 */
@Injectable()
export class AuthEffects {
  constructor(
    readonly actions$: Actions,
    readonly store: Store,
    readonly authService: AuthenticationService,
    readonly snackBar: MatSnackBar,
    readonly accountApiService: AccountApiService,
    readonly router: Router
  ) {}

  refreshFireAuthUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(refreshFireAuthUser),
      switchMap((action) => {
        if (action.showIsLoading !== false) {
          this.store.dispatch(registerLoading());
        }
        return this.authService
          .getFireAuthUser()
          .pipe(map((fireAuthUser) => ({ fireAuthUser, action })));
      }),
      map(({ action, fireAuthUser }) => {
        if (action.showIsLoading !== false) {
          this.store.dispatch(unregisterLoading());
        }
        return setFireAuthUserData({ fireAuthUserData: fireAuthUser });
      })
    )
  );

  setDtUserInfo = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setFireAuthUserData),
        switchMap(() => {
          this.store.dispatch(registerLoading());
          return this.accountApiService.getDtUser();
        }),
        map((resp: GetUserResponse | undefined) => {
          this.store.dispatch(unregisterLoading());
          if (resp) {
            this.store.dispatch(setDtUser({ dtUser: resp.user! }));
            this.store.dispatch(setDtTeam({ dtTeam: resp.team! }));
            this.store.dispatch(setDtOrg({ dtOrg: resp.client! }));
          } else {
            this.store.dispatch(setDtUser({ dtUser: null }));
          }
        })
      ),
    { dispatch: false }
  );

  legacySignupForm$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(submitLegacySignup),
        switchMap((action) => {
          this.store.dispatch(registerLoading());
          return this.authService.signUp(action.form);
        }),
        switchMap((userCredential: FireAuthUserCredential | null) => {
          if (userCredential) {
            return this.authService
              .sendEmailVerification(userCredential.user)
              .pipe(map(() => userCredential));
          }
          return of(null);
        }),
        map((userCredential: FireAuthUserCredential | null) => {
          this.store.dispatch(unregisterLoading());
          if (userCredential) {
            location.reload();
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  legacyLoginForm$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(submitLegacyLogin),
        switchMap((action) => {
          this.store.dispatch(registerLoading());
          return this.authService.signIn(action.form);
        }),
        map((userCredential: FireAuthUserCredential | null) => {
          this.store.dispatch(unregisterLoading());
          if (userCredential) {
            location.reload();
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  submitSignupNextForm$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(submitSignupNext),
        withLatestFrom(this.store.select(selectFireAuthUserData)),
        switchMap(([action, fireAuthUserData]) => {
          this.store.dispatch(registerLoading());
          return this.accountApiService.createDtUserWithOrg({
            ...action.form,
            email: fireAuthUserData?.email!,
            photoUrl: fireAuthUserData?.photoURL
              ? fireAuthUserData.photoURL
              : undefined,
          });
        }),
        map((orgSignupData: GetOrgSignupResponse | undefined) => {
          this.store.dispatch(unregisterLoading());
          if (orgSignupData === undefined) return;
          this.store.dispatch(setDtUser({ dtUser: orgSignupData.user! }));
          this.store.dispatch(setDtTeam({ dtTeam: orgSignupData.team! }));
          this.store.dispatch(setDtOrg({ dtOrg: orgSignupData.client! }));
          this.router.navigate(['']);
        })
      ),
    {
      dispatch: false,
    }
  );

  loginWithGoogle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(submitLoginWithGoogle),
        switchMap(() => {
          this.store.dispatch(registerLoading());
          return this.authService.signInWithGoogle();
        }),
        map((userCredential: FireAuthUserCredential | null) => {
          this.store.dispatch(unregisterLoading());
          if (userCredential) {
            location.reload();
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(submitLogout),
        switchMap(() => {
          this.store.dispatch(registerLoading());
          return this.authService.signOut();
        }),
        map((isSuccessful) => {
          this.store.dispatch(unregisterLoading());
          if (isSuccessful) {
            location.reload();
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  emailVerification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(submitEmailVerificationRequest),
        switchMap((action) => {
          this.store.dispatch(registerLoading());
          return this.authService.sendEmailVerification(
            action.fireAuthUserData
          );
        }),
        map(() => {
          this.store.dispatch(unregisterLoading());
          this.snackBar.open('Verification email sent.', 'Close');
        })
      ),
    {
      dispatch: false,
    }
  );
}
