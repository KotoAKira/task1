import { createAction } from "redux-actions";
import { BoardI } from "../../types/boardsType";

// eslint-disable-next-line no-shadow
export enum BoardActionTypes {
  FETCH_BOARDS = "[Board] FETCH_BOARDS",
  SUCCESS_FETCH_BOARDS = "[Board] SUCCESS_FETCH_BOARDS",
  ERROR_FETCH_BOARDS = "[Board] ERROR_FETCH_BOARDS",

  UPDATE_BOARD = "[Board] UPDATE_BOARD",
  SUCCESS_UPDATE_BOARD = "[Board] SUCCESS_UPDATE_BOARD",
  ERROR_UPDATE_BOARD = "[Board] ERROR_UPDATE_BOARD",

  CREATE_BOARD = "[Board] CREATE_BOARD",
  SUCCESS_CREATE_BOARD = "[Board] SUCCESS_CREATE_BOARD",
  ERROR_CREATE_BOARD = "[Board] ERROR_CREATE_BOARD",

  DELETE_BOARD = "[Board] DELETE_BOARD",
  SUCCESS_DELETE_BOARD = "[Board] SUCCESS_DELETE_BOARD",
  ERROR_DELETE_BOARD = "[Board] ERROR_DELETE_BOARD",
}

export const fetchBoardsAction = createAction(BoardActionTypes.FETCH_BOARDS);
export const successFetchBoardsAction = createAction(
  BoardActionTypes.SUCCESS_FETCH_BOARDS,
  (payload: any) => payload
);
export const errorFetchBoardsAction = createAction(
  BoardActionTypes.ERROR_FETCH_BOARDS
);

export const updateBoardAction = createAction(BoardActionTypes.UPDATE_BOARD);
export const successUpdateBoardAction = createAction(
  BoardActionTypes.SUCCESS_UPDATE_BOARD,
  (payload: { boardName: string; id: string }) => payload
);
export const errorUpdateBoardAction = createAction(
  BoardActionTypes.ERROR_UPDATE_BOARD
);

export const createBoardAction = createAction(BoardActionTypes.CREATE_BOARD);
export const successCreateBoardAction = createAction(
  BoardActionTypes.SUCCESS_CREATE_BOARD,
  (payload: { board: BoardI; id: string | null }) => payload
);
export const errorCreateBoardAction = createAction(
  BoardActionTypes.ERROR_CREATE_BOARD
);

export const deleteBoardAction = createAction(BoardActionTypes.DELETE_BOARD);
export const successDeleteBoardAction = createAction(
  BoardActionTypes.SUCCESS_DELETE_BOARD,
  (payload: string) => payload
);
export const errorDeleteBoardAction = createAction(
  BoardActionTypes.ERROR_DELETE_BOARD
);
