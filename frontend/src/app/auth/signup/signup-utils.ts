import { QueryParamKey, SignupType } from 'src/app/shared/route/query-params';

export function getUserSignupLink() {
  return `/signup?${QueryParamKey.SIGNUP_TYPE}=${SignupType.USER}`;
}
export function getUserSignupQueryParams() {
  return { [QueryParamKey.SIGNUP_TYPE]: SignupType.USER };
}

export function getCompanySignupLink() {
  return `/signup?${QueryParamKey.SIGNUP_TYPE}=${SignupType.COMPANY}`;
}
export function getCompanySignupQueryParams() {
  return { [QueryParamKey.SIGNUP_TYPE]: SignupType.COMPANY };
}
