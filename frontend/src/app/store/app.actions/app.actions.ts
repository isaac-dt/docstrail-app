import { createAction } from '@ngrx/store';

export const registerLoading = createAction('[App Store] register loading');

export const unregisterLoading = createAction('[App Store] unregister loading');

export const initializeJGraphEventsSubscriptions = createAction(
  '[App Store] initialize jgraph event subscriptions'
);
