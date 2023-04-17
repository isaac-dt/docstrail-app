import { createAction, props } from '@ngrx/store';
import { User as FireAuthUser } from 'firebase/auth';
import { Client as DtClient } from '../../generated/types/account/client/client.pb';
import { Team as DtTean } from '../../generated/types/account/team/team.pb';
import { User as DtUser } from '../../generated/types/account/user/user.pb';

export const setFireAuthUserData = createAction(
  '[App Store] set fireAuth user data',
  props<{ fireAuthUserData: Partial<FireAuthUser> | null }>()
);

export const setDtUser = createAction(
  '[App Store] set dimetrail user',
  props<{ dtUser: DtUser | null }>()
);

export const setDtTeam = createAction(
  '[App Store] set dimetrail team',
  props<{ dtTeam: DtTean }>()
);

export const setDtOrg = createAction(
  '[App Store] set dimetrail org',
  props<{ dtOrg: DtClient }>()
);
