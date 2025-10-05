import { createAction, props } from '@ngrx/store';
import { RegisterRequestInterface } from '../types/registerRequest.inteface';

export const register = createAction(
  '[Auth] Register',
  props<{ request: RegisterRequestInterface }>()
);
