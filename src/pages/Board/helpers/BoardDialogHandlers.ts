import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Dispatch } from "redux";
import { MainContentI } from "../../../components/BoardDialog/BoardDialog";
import { asyncUpdateBoardAction } from "../../../store/actions/boards";
import BoardI from "../../../interfaces/Board";
import ColumnI from "../../../interfaces/Column";
import ItemI from "../../../interfaces/Item";

export const setAddColumnContent = (
  setMainContent: React.Dispatch<MainContentI>
): void => {
  setMainContent({
    content: "Enter a name for the column and click the Add button",
    title: "Add column",
    label: "Column name",
    button: "Add",
  });
};

export const setAddItemContent = (
  setMainContent: React.Dispatch<MainContentI>
): void => {
  setMainContent({
    content: "Enter a text for the item and click the Add button",
    title: "Add Item",
    label: "Item text",
    button: "Add",
  });
};

export const setEditBoardNameContent = (
  setMainContent: React.Dispatch<MainContentI>
): void => {
  setMainContent({
    content: "Enter a name for the board and click the Edit button",
    title: "Edit board name",
    label: "Board name",
    button: "Edit",
  });
};

export const setEditColumnNameContent = (
  setMainContent: React.Dispatch<MainContentI>
): void => {
  setMainContent({
    content: "Enter a name for the column and click the Edit button",
    title: "Edit column name",
    label: "Column name",
    button: "Edit",
  });
};

export const setEditItemContent = (
  setMainContent: React.Dispatch<MainContentI>
): void => {
  setMainContent({
    content: "Enter a text for the item and click the Edit button",
    title: "Edit item text",
    label: "Item text",
    button: "Edit",
  });
};

export const addColumnHandler =
  (
    board: BoardI,
    setOpen: React.Dispatch<boolean>,
    boardId: string | null,
    dispatch: Dispatch<any>
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
    setOpen(false);
  };

export const addItemHandler =
  (
    board: BoardI,
    setOpen: React.Dispatch<boolean>,
    handlerColumn: ColumnI,
    handlerColumnId: number,
    boardId: string | null,
    dispatch: Dispatch<any>
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

    setOpen(false);
  };

export const editBoardNameHandler =
  (
    board: BoardI,
    setOpen: React.Dispatch<boolean>,
    boardId: string | null,
    dispatch: Dispatch<any>
  ) =>
  (boardName: string): void => {
    if (boardId) {
      const newBoard = {
        ...board,
        boardName,
      };
      dispatch(asyncUpdateBoardAction({ board: newBoard, boardId }));
    }

    setOpen(false);
  };

export const editColumnNameHandler =
  (
    board: BoardI,
    setOpen: React.Dispatch<boolean>,
    handlerColumn: ColumnI,
    handlerColumnId: number,
    boardId: string | null,
    dispatch: Dispatch<any>
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
    setOpen(false);
  };

export const editItemHandler =
  (
    board: BoardI,
    setOpen: React.Dispatch<boolean>,
    handlerColumn: ColumnI,
    handlerColumnId: number,
    handlerItem: ItemI,
    handlerItemId: number,
    boardId: string | null,
    dispatch: Dispatch<any>
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

    setOpen(false);
  };
