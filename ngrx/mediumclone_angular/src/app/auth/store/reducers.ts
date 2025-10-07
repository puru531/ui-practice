import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthStateInterface } from '../types/authStateInterface';
import { authActions } from './actions';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: undefined,
  isLoading: false,
  validationErrors: null,
};

// createFeature is just a syntactic sugar on top of createReducer, it gives selectrors out of the box
const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.register, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.registerSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
    })),
    on(authActions.registerFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
    on(authActions.login, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.loginSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
    })),
    on(authActions.loginFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    }))
  ),
});

//renamed the name from auth to authFeatureKey and reducer to authReducer to uniquily identify it
export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting, // if we user createFeature we get selectors out of the box and creating selectors explicitely is not needed.
  selectIsLoading,
  selectCurrentUser,
  selectValidationErrors,
} = authFeature;
