import { UserAction, UserActionTypes, UserState } from "../../types/userType";

const initialState: UserState = {
  user: null,
  isAuth: false,
  isLoading: false,
  error: null,
};

const userReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionTypes.LOGIN:
      return { isLoading: true, error: null, isAuth: false, user: null };
    case UserActionTypes.LOGIN_SUCCESS:
      return {
        isLoading: false,
        error: null,
        isAuth: true,
        user: action.payload,
      };
    case UserActionTypes.LOGIN_ERROR:
      return {
        isLoading: false,
        error: action.payload,
        isAuth: false,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
