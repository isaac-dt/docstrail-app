import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  getAuth,
  Auth,
  User as FireAuthUser,
  signInWithPopup,
  sendEmailVerification,
  setPersistence,
} from '@angular/fire/auth';
import { catchError, first, from, map, of } from 'rxjs';
import { FirebaseApp } from '@angular/fire/app';
import { ReplaySubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ConfirmedEmail, QueryParamKey } from '../route/query-params';
import { setFireAuthUserData } from 'src/app/store/app.actions/account.actions';

/** Authentication service. */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  readonly auth: Auth;
  private readonly destroyed = new ReplaySubject<void>();
  constructor(
    readonly app: FirebaseApp,
    readonly snackBar: MatSnackBar,
    readonly store: Store,
    readonly router: Router
  ) {
    this.auth = getAuth(app);
    this.auth.tenantId = null;
    this.auth.onAuthStateChanged((user: any) => {
      if (user) {
        this.store.dispatch(
          setFireAuthUserData({
            fireAuthUserData: JSON.parse(JSON.stringify(user)),
          })
        );
      } else {
        this.store.dispatch(setFireAuthUserData({ fireAuthUserData: null }));
      }
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
  getFireAuthUser() {
    return from(this.auth?.currentUser?.reload() || of(null)).pipe(
      first(),
      map(() => {
        return JSON.parse(JSON.stringify(this.auth?.currentUser));
      }),
      catchError((error) => {
        this.snackBar.open('Something went wrong. Please reload page.', 'Exit');
        return of(null);
      })
    );
  }
  signUp(args: { email: string; password: string }) {
    return from(
      createUserWithEmailAndPassword(this.auth, args.email, args.password)
    ).pipe(
      first(),
      catchError((error) => {
        this.snackBar.open('Something went wrong. Please try again.', 'Exit');
        return of(null);
      })
    );
  }
  signIn(args: { email: string; password: string }) {
    return from(
      signInWithEmailAndPassword(this.auth, args.email, args.password)
    ).pipe(
      first(),
      catchError((error) => {
        let msg = error.message.split('/')[1];
        msg = msg.substring(0, msg.length - 2);
        this.snackBar.open(
          'No account found with provided credentials. Try again.',
          'Exit'
        );
        return of(null);
      })
    );
  }
  signInWithGoogle() {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(
      first(),
      catchError((error) => {
        this.snackBar.open('Something went wrong. ' + error.message, 'Exit');
        return of(null);
      })
    );
  }
  signOut() {
    return from(this.auth.signOut()).pipe(
      first(),
      catchError((error) => {
        this.snackBar.open('Something went wrong. ' + error.message, 'Exit');
        return of(false);
      }),
      map((res) => res !== false)
    );
  }
  sendEmailVerification(fireAuthUserData: Partial<FireAuthUser>) {
    const fireAuthUser = this.auth.currentUser;
    if (!fireAuthUser || fireAuthUser.uid !== fireAuthUserData.uid) {
      return of(false);
    }
    if (!fireAuthUserData.emailVerified) {
      const hostUrl = `${location.protocol}//${window.location.hostname}:${location.port}`;
      const continueUrl = `${hostUrl}/signup/next?${QueryParamKey.CONFIRMED_EMAIL}=${ConfirmedEmail.TRUE}`;
      return from(
        sendEmailVerification(fireAuthUser, {
          url: continueUrl,
        })
      ).pipe(
        first(),
        catchError((error) => {
          console.log(error);
          this.snackBar.open('Something went wrong. ' + error.message, 'Exit');
          return of(false);
        }),
        map((res) => res !== false)
      );
    }
    return of(true);
  }
}
