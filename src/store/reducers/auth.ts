import { AnyAction } from "redux";
import { handleActions } from "redux-actions";
import { AuthActionTypes } from "../actions/auth";

export interface State {
  signInError: string;
  registerError: string;
  signOutError: string;
  authenticated: boolean;
  isLoading: boolean;
  userName: string;
  userUid: string;
}

const initialState = {
  signInError: "",
  registerError: "",
  signOutError: "",
  authenticated: false,
  isLoading: false,
  userName: "",
  userUid: "",
};

export const reducer = handleActions<State>(
  {
    [AuthActionTypes.REGISTER]: (state: State) => ({
      ...state,
      isLoading: true,
    }),
    [AuthActionTypes.SUCCESS_REGISTER]: (state: State) => ({
      ...state,
      registerError: "",
      isLoading: false,
    }),
    [AuthActionTypes.ERROR_REGISTER]: (state: State, action: AnyAction) => ({
      ...state,
      registerError: action.payload,
      isLoading: false,
    }),
    [AuthActionTypes.SIGNING_IN]: (state: State) => ({
      ...state,
      isLoading: true,
    }),
    [AuthActionTypes.SUCCESS_SIGN_IN]: (state: State, action: AnyAction) => ({
      ...state,
      signInError: "",
      isLoading: false,
      userUid: action.payload.user.uid,
      userName: action.payload.userName,
    }),
    [AuthActionTypes.ERROR_SIGN_IN]: (state: State, action: AnyAction) => ({
      ...state,
      signInError: action.payload,
      isLoading: false,
      userUid: "",
      userName: "",
    }),
    [AuthActionTypes.AUTHENTICATING]: (state: State) => ({
      ...state,
      isLoading: true,
    }),
    [AuthActionTypes.SUCCESS_AUTHENTICATING]: (
      state: State,
      action: AnyAction
    ) => ({
      ...state,
      isLoading: false,
      authenticated: true,
      userUid: action.payload.user.uid,
      userName: action.payload.userName,
    }),
    [AuthActionTypes.AUTHENTICATING]: (state: State) => ({
      ...state,
      isLoading: false,
      authenticated: false,
    }),
  },
  initialState
);
