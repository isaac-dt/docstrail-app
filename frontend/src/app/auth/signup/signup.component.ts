import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { QueryParamKey, SignupType } from 'src/app/shared/route/query-params';
import {
  submitLegacySignup,
  submitLoginWithGoogle,
} from 'src/app/store/app.actions/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  readonly isCompanySignup: boolean;

  constructor(
    readonly store: Store,
    readonly router: Router,
    readonly activatedRoute: ActivatedRoute
  ) {
    this.checkIsMobile();
    this.isCompanySignup =
      String(SignupType.USER) !==
      this.activatedRoute.snapshot.queryParamMap.get(
        String(QueryParamKey.SIGNUP_TYPE)
      );
  }

  ngOnInit(): void {}

  navigateToLogin() {
    this.router.navigate(['login']);
  }

  submitSignupForm() {
    this.signupForm.markAllAsTouched();
    if (this.signupForm.invalid) {
      return;
    }
    this.store.dispatch(
      submitLegacySignup({
        form: {
          email: this.signupForm.value.email!,
          password: this.signupForm.value.password!,
        },
      })
    );
  }

  signupWithGoogle() {
    this.store.dispatch(submitLoginWithGoogle());
  }

  navigateToLearnMore() {
    location.href = 'https://docstrail.com';
  }

  checkIsMobile() {
    const isMobile: boolean = (window as any).mobileCheck();
    if (isMobile) {
      this.router.navigateByUrl('/mobile');
    }
  }
}
