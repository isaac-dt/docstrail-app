import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  submitLegacyLogin,
  submitLoginWithGoogle,
} from 'src/app/store/app.actions/auth.actions';
import { getCompanySignupQueryParams } from '../signup/signup-utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  readonly companySignupQueryParams = getCompanySignupQueryParams();

  constructor(readonly store: Store, readonly router: Router) {
    this.checkIsMobile();
  }

  ngOnInit(): void {}

  navigateToSingup() {
    this.router.navigate(['signup'], {
      queryParams: this.companySignupQueryParams,
    });
  }

  submitLoginForm() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;
    this.store.dispatch(
      submitLegacyLogin({
        form: {
          email: this.loginForm.value.email!,
          password: this.loginForm.value.password!,
        },
      })
    );
  }

  loginWithGoogle() {
    this.store.dispatch(submitLoginWithGoogle());
  }

  checkIsMobile() {
    const isMobile: boolean = (window as any).mobileCheck();
    if (isMobile) {
      this.router.navigateByUrl('/mobile');
    }
  }
}
