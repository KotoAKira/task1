import { AnyAction } from "redux";
import { handleActions } from "redux-actions";
import { BoardActionTypes } from "../actions/boards";
import BoardI from "../../interfaces/Board";

export interface State {
  boards: {
    [id: string]: BoardI;
  };
  currentBoardId: string | null;
  isLoading: boolean;
}

const initialState: State = {
  boards: {},
  currentBoardId: null,
  isLoading: false,
};

export const reducer = handleActions<State>(
  {
    [BoardActionTypes.CREATE_BOARD]: (state: State) => ({
      ...state,
      isLoading: true,
    }),
    [BoardActionTypes.SUCCESS_CREATE_BOARD]: (
      state: State,
      action: AnyAction
    ) => ({
      ...state,
      isLoading: false,
      boards: {
        ...state.boards,
        [action.payload.id]: action.payload.board,
      },
    }),
    [BoardActionTypes.ERROR_CREATE_BOARD]: (state: State) => ({
      ...state,
      isLoading: false,
    }),
    [BoardActionTypes.DELETE_BOARD]: (state: State) => ({
      ...state,
      isLoading: true,
    }),
    [BoardActionTypes.SUCCESS_DELETE_BOARD]: (
      state: State,
      action: AnyAction
    ) => {
      const nextState = { ...state };
      delete nextState.boards[action.payload];
      return {
        ...nextState,
        isLoading: false,
      };
    },
    [BoardActionTypes.ERROR_DELETE_BOARD]: (state: State) => ({
      ...state,
      isLoading: false,
    }),
    [BoardActionTypes.FETCH_BOARDS]: (state: State) => ({
      ...state,
      isLoading: true,
    }),
    [BoardActionTypes.SUCCESS_FETCH_BOARDS]: (
      state: State,
      action: AnyAction
    ) => ({
      ...state,
      boards: action.payload,
      isLoading: false,
    }),
    [BoardActionTypes.ERROR_FETCH_BOARDS]: (state: State) => ({
      ...state,
      isLoading: false,
    }),
    [BoardActionTypes.SET_CURRENT_BOARD]: (state: State) => ({
      ...state,
      isLoading: true,
    }),
    [BoardActionTypes.SUCCESS_SET_CURRENT_BOARD]: (
      state: State,
      action: AnyAction
    ) => ({
      ...state,
      currentBoardId: action.payload,
      isLoading: false,
    }),
    [BoardActionTypes.ERROR_SET_CURRENT_BOARD]: (state: State) => ({
      ...state,
      isLoading: false,
    }),

    [BoardActionTypes.UPDATE_BOARD]: (state: State) => ({
      ...state,
      isLoading: true,
    }),
    [BoardActionTypes.SUCCESS_UPDATE_BOARD]: (
      state: State,
      action: AnyAction
    ) => ({
      ...state,
      isLoading: false,
      boards: {
        ...state.boards,
        [action.payload.id]: action.payload.board,
      },
    }),
    [BoardActionTypes.ERROR_UPDATE_BOARD]: (state: State) => ({
      ...state,
      isLoading: false,
    }),
  },
  initialState
);
