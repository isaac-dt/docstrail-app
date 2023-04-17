import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFireAuthUserData } from 'src/app/store/app.reducer';
import {
  submitEmailVerificationRequest,
  submitLogout,
  refreshFireAuthUser,
} from 'src/app/store/app.actions/auth.actions';
import { User as FireAuthUser } from 'firebase/auth';
import { first } from 'rxjs';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent {
  readonly fireAuthUserData$ = this.store.select(selectFireAuthUserData);

  isEmailResent: boolean = false;

  constructor(readonly store: Store) {
    this.refreshVerifyEmailPage();
  }

  signOut() {
    this.store.dispatch(submitLogout());
  }

  sendEmailVerification(fireAuthUserData: Partial<FireAuthUser>) {
    this.isEmailResent = true;
    this.store.dispatch(submitEmailVerificationRequest({ fireAuthUserData }));
  }

  refreshVerifyEmailPage() {
    const intervalMs = 10000;
    setInterval(() => {
      this.fireAuthUserData$.pipe(first()).subscribe((fireAuthUserData) => {
        if (!fireAuthUserData?.emailVerified) {
          this.store.dispatch(refreshFireAuthUser({ showIsLoading: false }));
        } else {
          location.reload();
        }
      });
    }, intervalMs);
  }
}
