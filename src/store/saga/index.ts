import { all, AllEffect, ForkEffect } from "redux-saga/effects";
import authWatcher from "./auth";
import boardWatcher from "./boards";

export default function* rootWatcher(): Generator<
  AllEffect<Generator<ForkEffect<never>, void>>
> {
  yield all([authWatcher(), boardWatcher()]);
}
