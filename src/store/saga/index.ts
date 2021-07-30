import { all } from "redux-saga/effects";
import authWatcher from "./auth";
import boardWatcher from "./boards";

export default function* rootWatcher() {
  yield all([authWatcher(), boardWatcher()]);
}
