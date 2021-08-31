import { v4 as uuidv4 } from "uuid";
import { Dispatch } from "redux";
import { Action } from "redux-actions";
import { asyncUpdateBoardAction } from "../../../store/actions/boards";
import BoardI from "../../../interfaces/Board";
import ColumnI from "../../../interfaces/Column";
import ItemI from "../../../interfaces/Item";

export const addColumnHandler =
  (
    board: BoardI,
    boardId: string | null,
    dispatch: Dispatch<Action<{ board: BoardI; boardId: string }>>
  ) =>
  (columnTitle: string): void => {
    if (board.columns) {
      const newBoard = {
        ...board,
        columns: [...board.columns, { id: uuidv4(), columnTitle, items: [] }],
      };

      dispatch(asyncUpdateBoardAction({ board: newBoard, boardId }));
    } else {
      const newBoard: BoardI = {
        ...board,
        columns: [{ id: uuidv4(), columnTitle, items: [] }],
      };

      dispatch(asyncUpdateBoardAction({ board: newBoard, boardId }));
    }
  };

export const addItemHandler =
  (
    board: BoardI,
    handlerColumn: ColumnI,
    handlerColumnId: number,
    boardId: string | null,
    dispatch: Dispatch<Action<{ board: BoardI; boardId: string }>>
  ) =>
  (text: string): void => {
    if (board.columns[handlerColumnId].items?.length) {
      const editColumn = {
        ...handlerColumn,
        items: [
          ...board.columns[handlerColumnId].items,
          { id: uuidv4(), text },
        ],
      };
      const newBoard = {
        ...board,
        columns: board.columns.map((col) => {
          if (col.id === editColumn.id) {
            return editColumn;
          }
          return col;
        }),
      };

      dispatch(asyncUpdateBoardAction({ board: newBoard, boardId }));
    } else {
      const editColumn = {
        ...handlerColumn,
        items: [{ id: uuidv4(), text }],
      };
      const newBoard = {
        ...board,
        columns: board.columns.map((col) => {
          if (col.id === editColumn.id) {
            return editColumn;
          }
          return col;
        }),
      };

      dispatch(asyncUpdateBoardAction({ board: newBoard, boardId }));
    }
  };

export const editBoardNameHandler =
  (
    board: BoardI,
    boardId: string | null,
    dispatch: Dispatch<Action<{ board: BoardI; boardId: string }>>
  ) =>
  (boardName: string): void => {
    const newBoard = {
      ...board,
      boardName,
    };
    dispatch(asyncUpdateBoardAction({ board: newBoard, boardId }));
  };

export const editColumnNameHandler =
  (
    board: BoardI,
    handlerColumn: ColumnI,
    handlerColumnId: number,
    boardId: string | null,
    dispatch: Dispatch<Action<{ board: BoardI; boardId: string }>>
  ) =>
  (columnTitle: string): void => {
    const editColumn = { ...handlerColumn, columnTitle };
    const newBoard = {
      ...board,
      columns: board.columns.map((col) => {
        if (col.id === editColumn.id) {
          return editColumn;
        }
        return col;
      }),
    };
    dispatch(asyncUpdateBoardAction({ board: newBoard, boardId }));
  };

export const editItemHandler =
  (
    board: BoardI,
    handlerColumn: ColumnI,
    handlerColumnId: number,
    handlerItem: ItemI,
    handlerItemId: number,
    boardId: string | null,
    dispatch: Dispatch<Action<{ board: BoardI; boardId: string }>>
  ) =>
  (itemText: string): void => {
    const editItem = { ...handlerItem, text: itemText };
    const editColumn = {
      ...handlerColumn,
      items: board.columns[handlerColumnId].items.map((item) => {
        if (item.id === editItem.id) {
          return editItem;
        }
        return item;
      }),
    };

    const newBoard = {
      ...board,
      columns: board.columns.map((col) => {
        if (col.id === editColumn.id) {
          return editColumn;
        }
        return col;
      }),
    };

    dispatch(asyncUpdateBoardAction({ board: newBoard, boardId }));
  };
