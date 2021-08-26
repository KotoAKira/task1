import { createSelector } from "reselect";
import * as auth from "../reducers/auth";
import { AppState } from "../reducers";

const authState = (state: AppState): auth.State => state.authState;

export const selectLoginError = createSelector(
  authState,
  (state) => state.signInError
);
export const selectRegisterError = createSelector(
  authState,
  (state) => state.registerError
);
export const selectLoginIsLoading = createSelector(
  authState,
  (state) => state.isLoading
);

export const selectAuthenticated = createSelector(
  authState,
  (state) => state.authenticated
);

export const selectUid = createSelector(authState, (state) => state.userUid);

export const selectUserName = createSelector(
  authState,
  (state) => state.userName
);
