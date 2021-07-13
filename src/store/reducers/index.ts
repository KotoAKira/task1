import { combineReducers } from "redux";
import * as auth from "./auth";
import * as boards from "./boards";

export interface AppState {
  authState: auth.State;
  boardsState: boards.State;
}

export const rootReducer = combineReducers<AppState>({
  authState: auth.reducer,
  boardsState: boards.reducer,
});
