import { createAction } from "redux-actions";

// eslint-disable-next-line no-shadow
export enum AuthActionTypes {
  SIGNING_IN = "[Auth] SIGNING_IN",
  SUCCESS_SIGN_IN = "[Auth] SUCCESS_SIGN_IN",
  ERROR_SIGN_IN = "[Auth] ERROR_SIGN_IN",
  ASYNC_SIGNING_IN = "[Auth] ASYNC_SIGNING_IN",

  REGISTER = "[Auth] REGISTER",
  SUCCESS_REGISTER = "[Auth] SUCCESS_REGISTER",
  ERROR_REGISTER = "[Auth] ERROR_REGISTER",
  ASYNC_REGISTER = "[Auth] ASYNC_REGISTER",

  SIGNING_OUT = "[Auth] SIGNING_OUT",
  SUCCESS_SIGN_OUT = "[Auth] SUCCESS_SIGN_OUT",
  ERROR_SIGN_OUT = "[Auth] ERROR_SIGN_OUT",
  ASYNC_SIGNING_OUT = "[Auth] ASYNC_SIGNING_OUT",

  AUTHENTICATING = "[Auth] AUTHENTICATING",
  SUCCESS_AUTHENTICATING = "[Auth] SUCCESS_AUTHENTICATING",
  ERROR_AUTHENTICATING = "[Auth] ERROR_AUTHENTICATING",
}

export const signingInAction = createAction(AuthActionTypes.SIGNING_IN);
export const successSignInAction = createAction(
  AuthActionTypes.SUCCESS_SIGN_IN
);
export const errorSignInAction = createAction(
  AuthActionTypes.ERROR_SIGN_IN,
  (payload: { error: string }) => payload
);
export const asyncSigningInAction = createAction(
  AuthActionTypes.ASYNC_SIGNING_IN,
  (payload: { email: string; password: string; history: any }) => payload
);

export const registerAction = createAction(AuthActionTypes.REGISTER);
export const successRegisterAction = createAction(
  AuthActionTypes.SUCCESS_REGISTER
);
export const errorRegisterAction = createAction(
  AuthActionTypes.ERROR_REGISTER,
  (payload: string) => payload
);
export const asyncRegisterAction = createAction(
  AuthActionTypes.ASYNC_REGISTER,
  (payload: {
    email: string;
    password: string;
    name: string;
    secondName: string;
    history: any;
  }) => payload
);

export const signingOutAction = createAction(AuthActionTypes.SIGNING_OUT);
export const successSignOutAction = createAction(
  AuthActionTypes.SUCCESS_SIGN_OUT
);
export const errorSignOutAction = createAction(
  AuthActionTypes.ERROR_SIGN_OUT,
  (payload: { error: string }) => payload
);
export const asyncSigningOutAction = createAction(
  AuthActionTypes.ASYNC_SIGNING_OUT
);

export const authenticatingAction = createAction(
  AuthActionTypes.AUTHENTICATING
);
export const successAuthenticatingAction = createAction(
  AuthActionTypes.SUCCESS_AUTHENTICATING
);
export const errorAuthenticatingAction = createAction(
  AuthActionTypes.ERROR_AUTHENTICATING
);
