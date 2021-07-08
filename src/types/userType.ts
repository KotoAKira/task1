type UserType = {
  id: number;
  username: string;
  email: string;
};

// eslint-disable-next-line no-shadow
export enum UserActionTypes {
  LOGIN = "LOGIN",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_ERROR = "LOGIN_ERROR",
}

export interface UserState {
  user: UserType | null;
  isAuth: boolean;
  isLoading: boolean;
  error: string | null;
}

interface loginAction {
  type: UserActionTypes.LOGIN;
}

interface loginSuccessAction {
  type: UserActionTypes.LOGIN_SUCCESS;
  payload: UserType;
}

interface loginErrorAction {
  type: UserActionTypes.LOGIN_ERROR;
  payload: string;
}

export type UserAction = loginAction | loginSuccessAction | loginErrorAction;
