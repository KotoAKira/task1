type UserType = {
  id: number;
  username: string;
  email: string;
};

interface UserState {
  user: UserType | null;
  isAuth: boolean;
  isLoading: boolean;
}

interface loginAction {
  type: UserActionTypes.LOGIN;
}

interface loginSuccessAction {
  type: UserActionTypes.LOGIN_SUCCESS;
  payload: UserType;
}

type UserAction = loginAction | loginSuccessAction;

enum UserActionTypes {
  LOGIN = "LOGIN",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
}

const initialState: UserState = {
  user: null,
  isAuth: false,
  isLoading: false,
};

export const userReducer = (
  state = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case UserActionTypes.LOGIN:
      return { isLoading: true, isAuth: false, user: null };
    case UserActionTypes.LOGIN_SUCCESS:
      return { isLoading: false, isAuth: true, user: action.payload };
    default:
      return state;
  }
};
