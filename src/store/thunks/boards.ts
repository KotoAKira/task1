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

export const createBoard =
  (boardName: string, managerUid: string, managerName: string) =>
  (dispatch: Dispatch) => {
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
  (boardName: string, boardId: string) => (dispatch: Dispatch) => {
    dispatch(updateBoardAction());
    BoardService.updateBoardName(boardId, boardName)
      .then(() => {
        dispatch(successUpdateBoardAction({ boardName, id: boardId }));
      })
      .catch(() => {
        dispatch(errorUpdateBoardAction());
      });
  };

export const deleteBoard = (boardId: string) => (dispatch: Dispatch) => {
  dispatch(deleteBoardAction());
  BoardService.deleteBoard(boardId)
    .then(() => {
      dispatch(successDeleteBoardAction(boardId));
    })
    .catch(() => {
      dispatch(errorDeleteBoardAction());
    });
};

export const fetchBoards = () => (dispatch: Dispatch) => {
  dispatch(fetchBoardsAction());
  BoardService.fetchBoards()
    .then((e) => {
      dispatch(successFetchBoardsAction({ ...e.val() }));
    })
    .catch(() => {
      dispatch(errorFetchBoardsAction());
    });
};
