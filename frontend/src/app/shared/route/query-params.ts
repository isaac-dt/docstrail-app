import { ProposalViewMode } from 'src/app/store/app.model';

export enum QueryParamKey {
  SIGNUP_TYPE = 'st',
  CONFIRMED_EMAIL = 'ce',
  PROPOSAL_VIEW_MODE = 'pvm',
  SELECTED_PROPOSAL_ID = 'pid',
  IS_CREATE_PAGE = 'cr',
  REFRESH_CANVAS = 'rc',
}

/* ======= QUERY PARAMS VALUES ======= */

export enum SignupType {
  USER,
  COMPANY,
}

export enum ConfirmedEmail {
  TRUE,
  FALSE,
}

export enum IsCreatePage {
  TRUE,
}

export enum RefreshCanvas {
  TRUE,
  FALSE,
}
