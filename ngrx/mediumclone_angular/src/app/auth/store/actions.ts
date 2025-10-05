import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { RegisterRequestInterface } from '../types/registerRequest.inteface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUserInterface';

/*
export const register = createAction(
  '[Auth] Register',
  props<{ request: RegisterRequestInterface }>()
);

export const registerSucceess = createAction(
  '[Auth] RegisterSuccess',
  props<{ request: RegisterRequestInterface }>()
);

export const registerFailure = createAction(
  '[Auth] RegisterFailure',
  props<{ request: RegisterRequestInterface }>()
);
*/

// ---------- Group all of them ----------

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    'Register Success': props<{ currentUser: CurrentUserInterface }>(),
    'Register Failure': emptyProps(),
  },
});
