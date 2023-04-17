import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User as FireAuthUser } from 'firebase/auth';
import { first } from 'rxjs';
import { selectFireAuthUserData } from 'src/app/store/app.reducer';
import {
  submitLogout,
  submitSignupNext,
} from 'src/app/store/app.actions/auth.actions';

@Component({
  selector: 'app-signup-next',
  templateUrl: './signup-next.component.html',
  styleUrls: ['./signup-next.component.scss'],
})
export class SignupNextComponent {
  readonly fireAuthUserData$ = this.store.select(selectFireAuthUserData);
  readonly signupNextForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    // businessName: new FormControl(),
    isTermAndConditionAgreed: new FormControl('', []),
  });

  showTermsError: boolean = false;

  constructor(readonly store: Store) {}

  ngOnInit() {
    this.fireAuthUserData$.pipe(first()).subscribe((fireAuthUserData) => {
      if (fireAuthUserData?.displayName) {
        const fullNameControl = this.signupNextForm.get('fullName');
        fullNameControl?.setValue(fireAuthUserData.displayName);
        fullNameControl?.disable();
      }
    });
  }

  submitSignupNextForm(fireAuthUserData: Partial<FireAuthUser>) {
    this.signupNextForm.markAllAsTouched();
    if (!this.signupNextForm.get('isTermAndConditionAgreed')?.value) {
      this.showTermsError = true;
      return;
    }
    if (this.signupNextForm.invalid) {
      return;
    }

    let fullName = fireAuthUserData.displayName || '';
    if (!this.signupNextForm.get('fullName')?.disabled) {
      fullName = this.signupNextForm.value.fullName!;
    }
    this.store.dispatch(
      submitSignupNext({
        form: {
          fullName,
        },
      })
    );
  }

  signOut() {
    this.store.dispatch(submitLogout());
  }

  clearErrors() {
    this.showTermsError = false;
  }
}
