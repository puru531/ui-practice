import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthStateInterface } from '../types/authStateInterface';
import { register } from './actions';

const initialState: AuthStateInterface = {
  isSubmitting: false,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(register, (state) => ({ ...state, isSubmitting: true }))
  ),
});

//renamed the name from auth to authFeatureKey and reducer to authReducer to uniquily identify it
export const { name: authFeatureKey, reducer: authReducer } = authFeature;
