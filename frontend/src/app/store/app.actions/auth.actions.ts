import { createAction, props } from '@ngrx/store';
import { User as FireAuthUser } from 'firebase/auth';

export const submitLegacySignup = createAction(
  '[App Store] submit legacy signup',
  props<{ form: { email: string; password: string } }>()
);

export const submitSignupNext = createAction(
  '[App Store] submit signup next',
  props<{ form: { fullName: string } }>()
);

export const submitLegacyLogin = createAction(
  '[App Store] submit legacy login',
  props<{ form: { email: string; password: string } }>()
);

export const submitLoginWithGoogle = createAction(
  '[App Store] submit login with Google'
);

export const submitLogout = createAction('[App Store] submit logout');

export const submitEmailVerificationRequest = createAction(
  '[App Store] submit email verification request',
  props<{ fireAuthUserData: Partial<FireAuthUser> }>()
);

export const refreshFireAuthUser = createAction(
  '[App Store] refresh FireAuth user',
  props<{ showIsLoading: Boolean }>()
);
