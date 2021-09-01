import { put, call, takeEvery, ForkEffect } from "redux-saga/effects";
import firebase from "firebase";
import { AnyAction } from "redux";
import {
  BoardActionTypes,
  createBoardAction,
  deleteBoardAction,
  errorCreateBoardAction,
  errorDeleteBoardAction,
  errorFetchBoardsAction,
  errorUpdateBoardAction,
  fetchBoardsAction,
  successCreateBoardAction,
  successDeleteBoardAction,
  successFetchBoardsAction,
  successUpdateBoardAction,
  updateBoardAction,
} from "../actions/boards";
import {
  createBoard,
  deleteBoard,
  fetchBoards,
  updateBoard,
} from "../../services/boards";
import Board from "../../interfaces/Board";

function* createBoardWorker(action: AnyAction) {
  try {
    const { payload } = action;
    const { boardName, managerUid, managerName } = payload;
    yield put(createBoardAction());
    const { id } = yield call(createBoard, boardName, managerUid, managerName);
    yield put(
      successCreateBoardAction({
        board: { boardName, columns: [], managerName, managerUid },
        id,
      })
    );
  } catch (e) {
    yield put(errorCreateBoardAction(e.message));
  }
}

function* fetchBoardsWorker() {
  try {
    yield put(fetchBoardsAction());
    const res: firebase.firestore.QuerySnapshot = yield call(fetchBoards);
    const obj: { [p: string]: Board } = Object.fromEntries(
      res.docs.map((doc) => [
        doc.id,
        <Board>{
          boardName: doc.data().boardName,
          managerName: doc.data().managerName,
          managerUid: doc.data().managerUid,
          columns: doc.data().columns,
        },
      ])
    );
    yield put(successFetchBoardsAction(obj));
  } catch (e) {
    yield put(errorFetchBoardsAction(e.message));
  }
}

function* deleteBoardWorker(action: AnyAction) {
  try {
    const { payload } = action;
    yield put(deleteBoardAction());
    yield call(deleteBoard, payload);
    yield put(successDeleteBoardAction(payload));
  } catch {
    yield put(errorDeleteBoardAction());
  }
}

function* updateBoardWorker(action: AnyAction) {
  try {
    const { payload } = action;
    const { board, boardId } = payload;
    yield put(updateBoardAction());
    yield call(updateBoard, boardId, board);
    yield put(successUpdateBoardAction({ id: boardId, board }));
  } catch {
    yield put(errorUpdateBoardAction());
  }
}

export default function* boardWatcher(): Generator<ForkEffect<never>> {
  yield takeEvery(BoardActionTypes.ASYNC_CREATE_BOARD, createBoardWorker);
  yield takeEvery(BoardActionTypes.ASYNC_FETCH_BOARDS, fetchBoardsWorker);
  yield takeEvery(BoardActionTypes.ASYNC_DELETE_BOARD, deleteBoardWorker);
  yield takeEvery(BoardActionTypes.ASYNC_UPDATE_BOARD, updateBoardWorker);
}
