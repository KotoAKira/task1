import { createAction } from "redux-actions";
import Board from "../../interfaces/Board";

export enum BoardActionTypes {
  FETCH_BOARDS = "[Board] FETCH_BOARDS",
  SUCCESS_FETCH_BOARDS = "[Board] SUCCESS_FETCH_BOARDS",
  ERROR_FETCH_BOARDS = "[Board] ERROR_FETCH_BOARDS",
  ASYNC_FETCH_BOARDS = "[Board] ASYNC_FETCH_BOARDS",

  CREATE_BOARD = "[Board] CREATE_BOARD",
  SUCCESS_CREATE_BOARD = "[Board] SUCCESS_CREATE_BOARD",
  ERROR_CREATE_BOARD = "[Board] ERROR_CREATE_BOARD",
  ASYNC_CREATE_BOARD = "[Board] ASYNC_CREATE_BOARD",

  DELETE_BOARD = "[Board] DELETE_BOARD",
  SUCCESS_DELETE_BOARD = "[Board] SUCCESS_DELETE_BOARD",
  ERROR_DELETE_BOARD = "[Board] ERROR_DELETE_BOARD",
  ASYNC_DELETE_BOARD = "[Board] ASYNC_DELETE_BOARD",

  SET_CURRENT_BOARD = "[Board] SET_CURRENT_BOARD",
  SUCCESS_SET_CURRENT_BOARD = "[Board] SUCCESS_SET_CURRENT_BOARD",
  ERROR_SET_CURRENT_BOARD = "[Board] ERROR_SET_CURRENT_BOARD",

  UPDATE_BOARD = "[Board] UPDATE_BOARD",
  SUCCESS_UPDATE_BOARD = "[Board] SUCCESS_UPDATE_BOARD",
  ERROR_UPDATE_BOARD = "[Board] ERROR_UPDATE_BOARD",
  ASYNC_UPDATE_BOARD = "[Board] ASYNC_UPDATE_BOARD",
}

export const fetchBoardsAction = createAction(BoardActionTypes.FETCH_BOARDS);
export const successFetchBoardsAction = createAction(
  BoardActionTypes.SUCCESS_FETCH_BOARDS,
  (payload: { [p: string]: Board }) => payload
);
export const errorFetchBoardsAction = createAction(
  BoardActionTypes.ERROR_FETCH_BOARDS
);
export const asyncFetchBoardsAction = createAction(
  BoardActionTypes.ASYNC_FETCH_BOARDS
);

export const createBoardAction = createAction(BoardActionTypes.CREATE_BOARD);
export const successCreateBoardAction = createAction(
  BoardActionTypes.SUCCESS_CREATE_BOARD,
  (payload: { board: Board; id: string | null }) => payload
);
export const errorCreateBoardAction = createAction(
  BoardActionTypes.ERROR_CREATE_BOARD
);
export const asyncCreateBoardAction = createAction(
  BoardActionTypes.ASYNC_CREATE_BOARD,
  (payload: { boardName: string; managerUid: string; managerName: string }) =>
    payload
);

export const deleteBoardAction = createAction(BoardActionTypes.DELETE_BOARD);
export const successDeleteBoardAction = createAction(
  BoardActionTypes.SUCCESS_DELETE_BOARD,
  (payload: string) => payload
);
export const errorDeleteBoardAction = createAction(
  BoardActionTypes.ERROR_DELETE_BOARD
);
export const asyncDeleteBoardAction = createAction(
  BoardActionTypes.ASYNC_DELETE_BOARD,
  (payload: string) => payload
);

export const setCurrentBoardAction = createAction(
  BoardActionTypes.SET_CURRENT_BOARD
);
export const successSetCurrentBoardAction = createAction(
  BoardActionTypes.SUCCESS_SET_CURRENT_BOARD,
  (payload: string) => payload
);
export const errorSetCurrentBoardAction = createAction(
  BoardActionTypes.ERROR_SET_CURRENT_BOARD
);

export const updateBoardAction = createAction(BoardActionTypes.UPDATE_BOARD);
export const successUpdateBoardAction = createAction(
  BoardActionTypes.SUCCESS_UPDATE_BOARD,
  (payload: { id: string; board: Board }) => payload
);
export const errorUpdateBoardAction = createAction(
  BoardActionTypes.ERROR_UPDATE_BOARD
);
export const asyncUpdateBoardAction = createAction(
  BoardActionTypes.ASYNC_UPDATE_BOARD,
  (payload: { board: Board; boardId: string }) => payload
);
