import { Dispatch } from "redux";
import {
  createBoardAction,
  deleteBoardAction,
  errorCreateBoardAction,
  errorDeleteBoardAction,
  errorFetchBoardsAction,
  fetchBoardsAction,
  updateBoardAction,
  successCreateBoardAction,
  successDeleteBoardAction,
  successFetchBoardsAction,
  successUpdateBoardAction,
  errorUpdateBoardAction,
} from "../actions/boards";
import * as BoardService from "../../services/boards";
import { BoardI } from "../../types/boardsType";

export const createBoard =
  (boardName: string, managerUid: string, managerName: string) =>
  (dispatch: Dispatch): void => {
    dispatch(createBoardAction());
    BoardService.createBoard(boardName, managerUid, managerName)
      .then((response) => {
        dispatch(
          successCreateBoardAction({
            board: { boardName, columns: [], managerName, managerUid },
            id: response.key,
          })
        );
      })
      .catch(() => {
        dispatch(errorCreateBoardAction());
      });
  };

export const updateBoard =
  (board: BoardI, boardId: string) =>
  (dispatch: Dispatch): void => {
    dispatch(updateBoardAction());
    BoardService.updateBoard(boardId, board)
      .then(() => {
        dispatch(successUpdateBoardAction({ board, id: boardId }));
      })
      .catch(() => {
        dispatch(errorUpdateBoardAction());
      });
  };

export const deleteBoard =
  (boardId: string) =>
  (dispatch: Dispatch): void => {
    dispatch(deleteBoardAction());
    BoardService.deleteBoard(boardId)
      .then(() => {
        dispatch(successDeleteBoardAction(boardId));
      })
      .catch(() => {
        dispatch(errorDeleteBoardAction());
      });
  };

export const fetchBoards =
  () =>
  (dispatch: Dispatch): void => {
    dispatch(fetchBoardsAction());
    BoardService.fetchBoards()
      .then((e) => {
        dispatch(successFetchBoardsAction({ ...e.val() }));
      })
      .catch(() => {
        dispatch(errorFetchBoardsAction());
      });
  };
