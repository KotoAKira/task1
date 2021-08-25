import { combineReducers } from "redux";
import * as auth from "./auth";
import * as boards from "./boards";
import * as modal from "./modal";

export interface AppState {
  authState: auth.State;
  boardsState: boards.State;
  modalState: modal.State;
}

export const rootReducer = combineReducers<AppState>({
  authState: auth.reducer,
  boardsState: boards.reducer,
  modalState: modal.reducer,
});
