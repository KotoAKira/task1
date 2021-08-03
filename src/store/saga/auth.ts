import { call, ForkEffect, put, takeEvery } from "redux-saga/effects";
import { AnyAction } from "redux";
import {
  AuthActionTypes,
  errorRegisterAction,
  errorSignInAction,
  errorSignOutAction,
  registerAction,
  signingInAction,
  signingOutAction,
  successRegisterAction,
  successSignInAction,
} from "../actions/auth";
import { register, signIn, signOut } from "../../services/auth";

function* signInWorker(action: AnyAction) {
  try {
    const { payload } = action;
    const { email, password, history } = payload;
    yield put(signingInAction());
    const { user } = yield call(signIn, email, password);
    yield put(successSignInAction());
    if (user) {
      if (!user.emailVerified) {
        history.push("/confirm");
        window.location.reload();
        user.sendEmailVerification();
      } else {
        history.push("/");
        window.location.reload();
      }
    }
  } catch (e) {
    yield put(errorSignInAction(e.message));
  }
}

function* signOutWorker() {
  try {
    yield put(signingOutAction());
    yield call(signOut);
  } catch (e) {
    yield put(errorSignOutAction(e.message));
  }
}

function* registerWorker(action: AnyAction) {
  try {
    const { payload } = action;
    const { email, password, name, secondName, history } = payload;
    yield put(registerAction());
    yield call(register, email, password, name, secondName);
    yield put(successRegisterAction());
    history.push("/confirm");
    window.location.reload();
  } catch (e) {
    yield put(errorRegisterAction(e.message));
  }
}

export default function* authWatcher(): Generator<ForkEffect<never>> {
  yield takeEvery(AuthActionTypes.ASYNC_SIGNING_IN, signInWorker);
  yield takeEvery(AuthActionTypes.ASYNC_SIGNING_OUT, signOutWorker);
  yield takeEvery(AuthActionTypes.ASYNC_REGISTER, registerWorker);
}
