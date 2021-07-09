import { combineReducers } from "redux";
import * as auth from "./auth";

export interface AppState {
  authState: auth.State;
}

export const rootReducer = combineReducers<AppState>({
  authState: auth.reducer,
});
