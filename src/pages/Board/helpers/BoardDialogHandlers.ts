import { v4 as uuidv4 } from "uuid";
import { Dispatch } from "redux";
import { Action } from "redux-actions";
import { asyncUpdateBoardAction } from "../../../store/actions/boards";
import BoardI from "../../../interfaces/Board";
import ColumnI from "../../../interfaces/Column";
import ItemI from "../../../interfaces/Item";

export const addColumnContent = {
  content: "Enter a name for the column and click the Add button",
  title: "Add column",
  label: "Column name",
  button: "Add",
};

export const addItemContent = {
  content: "Enter a text for the item and click the Add button",
  title: "Add Item",
  label: "Item text",
  button: "Add",
};

export const editBoardNameContent = {
  content: "Enter a name for the board and click the Edit button",
  title: "Edit board name",
  label: "Board name",
  button: "Edit",
};

export const editColumnNameContent = {
  content: "Enter a name for the column and click the Edit button",
  title: "Edit column name",
  label: "Column name",
  button: "Edit",
};

export const editItemContent = {
  content: "Enter a text for the item and click the Edit button",
  title: "Edit item text",
  label: "Item text",
  button: "Edit",
};

export const addColumnHandler =
  (
    board: BoardI,
    boardId: string | null,
    dispatch: Dispatch<Action<{ board: BoardI; boardId: string }>>
  ) =>
  (columnTitle: string): void => {
    if (board.columns && boardId) {
      const newBoard = {
        ...board,
        columns: [...board.columns, { id: uuidv4(), columnTitle, items: [] }],
      };

      dispatch(asyncUpdateBoardAction({ board: newBoard, boardId }));
    } else if (boardId) {
      const newBoard = {
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
    if (
      board.columns &&
      handlerColumn &&
      handlerColumnId !== null &&
      board.columns[handlerColumnId].items?.length &&
      boardId
    ) {
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
    } else if (
      board.columns &&
      handlerColumnId !== null &&
      handlerColumn &&
      boardId
    ) {
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
    if (boardId) {
      const newBoard = {
        ...board,
        boardName,
      };
      dispatch(asyncUpdateBoardAction({ board: newBoard, boardId }));
    }
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
    if (board.columns && handlerColumnId !== null && handlerColumn && boardId) {
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
    }
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
    if (
      board.columns &&
      handlerColumnId !== null &&
      handlerColumn &&
      handlerItem &&
      handlerItemId !== null &&
      boardId
    ) {
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
    }
  };
