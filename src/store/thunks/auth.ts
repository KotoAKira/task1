import { Dispatch } from "redux";
import * as AuthService from "../../services/auth";
import {
  errorRegisterAction,
  errorSignInAction,
  errorSignOutAction,
  registerAction,
  signingInAction,
  signingOutAction,
  successRegisterAction,
  successSignInAction,
  successSignOutAction,
} from "../actions/auth";

export const register =
  (
    email: string,
    password: string,
    name: string,
    secondName: string,
    history: any
  ) =>
  (dispatch: Dispatch): void => {
    dispatch(registerAction());
    AuthService.register(email, password, name, secondName)
      .then(() => {
        dispatch(successRegisterAction());
        history.push("/confirm");
        window.location.reload();
      })
      .catch((error) => {
        dispatch(errorRegisterAction(error.message));
      });
  };

export const signIn =
  (email: string, password: string, history: any) =>
  (dispatch: Dispatch): void => {
    dispatch(signingInAction());
    AuthService.signIn(email, password)
      .then(({ user }) => {
        dispatch(successSignInAction());
        if (user) {
          if (!user.emailVerified) {
            history.push("/confirm");
            window.location.reload();
            user.sendEmailVerification();
          } else {
            history.push("/");
            window.location.reload();
          }
        }
      })
      .catch((error) => {
        dispatch(errorSignInAction(error.message));
      });
  };

export function signOut(history: any) {
  return (dispatch: Dispatch): void => {
    dispatch(signingOutAction());
    AuthService.signOut()
      .then(() => {
        dispatch(successSignOutAction());
        history.push("/login");
      })
      .catch((error) => dispatch(errorSignOutAction(error.message)));
  };
}
