import { createSelector } from '@ngrx/store';
import { AuthStateInterface } from '../types/authStateInterface';

export const selectFeature = (state: { auth: AuthStateInterface }) =>
  state.auth;

export const selectIsSubmitting = createSelector(
  selectFeature,
  (state) => state.isSubmitting
);
