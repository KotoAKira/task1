import { call, ForkEffect, put, takeEvery } from "redux-saga/effects";
import { AnyAction } from "redux";
import firebase from "firebase";
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
  successSignOutAction,
} from "../actions/auth";
import { register, signIn, signOut } from "../../services/auth";
import { fetchUserName } from "../../services/boards";

function* signInWorker(action: AnyAction) {
  try {
    const { payload } = action;
    const { email, password, history } = payload;
    yield put(signingInAction());
    const { user } = yield call(signIn, email, password, history);
    const e: firebase.firestore.DocumentSnapshot = yield call(fetchUserName);
    const userName = e.data()?.name.concat(" ", e.data()?.secondName);
    yield put(successSignInAction({ user, userName }));
  } catch (e) {
    yield put(errorSignInAction(e.message));
  }
}

function* signOutWorker(action: AnyAction) {
  try {
    yield put(signingOutAction());
    yield call(signOut);
    yield put(successSignOutAction());
    action.payload.push("/login");
  } catch (e) {
    yield put(errorSignOutAction(e.message));
  }
}

function* registerWorker(action: AnyAction) {
  try {
    const { payload } = action;
    const { email, password, name, secondName, history } = payload;
    yield put(registerAction());
    yield call(register, email, password, name, secondName, history);
    yield put(successRegisterAction());
  } catch (e) {
    yield put(errorRegisterAction(e.message));
  }
}

export default function* authWatcher(): Generator<ForkEffect<never>> {
  yield takeEvery(AuthActionTypes.ASYNC_SIGNING_IN, signInWorker);
  yield takeEvery(AuthActionTypes.ASYNC_SIGNING_OUT, signOutWorker);
  yield takeEvery(AuthActionTypes.ASYNC_REGISTER, registerWorker);
}
