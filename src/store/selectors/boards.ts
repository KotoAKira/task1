import { createSelector } from "reselect";
import * as boards from "../reducers/boards";
import { AppState } from "../reducers";

const boardsState = (state: AppState): boards.State => state.boardsState;

export const selectBoards = createSelector(
  boardsState,
  (state) => state.boards
);
export const loadingProcess = createSelector(
  boardsState,
  (state) => state.isLoading
);
