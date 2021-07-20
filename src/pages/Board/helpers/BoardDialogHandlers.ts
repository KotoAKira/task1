import React from "react";
import { v4 as uuidv4 } from "uuid";
import { MainContentI } from "../../../components/BoardDialog/BoardDialog";
import { BoardI, ColumnI, ItemI } from "../../../types/boardsType";

export const setAddColumnContent = (
  setMainContent: React.Dispatch<MainContentI>
) => {
  setMainContent({
    content: "Enter a name for the column and click the Add button",
    title: "Add column",
    label: "Column name",
    button: "Add",
  });
};

export const setAddItemContent = (
  setMainContent: React.Dispatch<MainContentI>
) => {
  setMainContent({
    content: "Enter a text for the item and click the Add button",
    title: "Add Item",
    label: "Item text",
    button: "Add",
  });
};

export const setEditBoardNameContent = (
  setMainContent: React.Dispatch<MainContentI>
) => {
  setMainContent({
    content: "Enter a name for the board and click the Edit button",
    title: "Edit board name",
    label: "Board name",
    button: "Edit",
  });
};

export const setEditColumnNameContent = (
  setMainContent: React.Dispatch<MainContentI>
) => {
  setMainContent({
    content: "Enter a name for the column and click the Edit button",
    title: "Edit column name",
    label: "Column name",
    button: "Edit",
  });
};

export const setEditItemContent = (
  setMainContent: React.Dispatch<MainContentI>
) => {
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
    setBoard: React.Dispatch<BoardI>,
    setOpen: React.Dispatch<boolean>
  ) =>
  (columnTitle: string) => {
    if (board.columns) {
      setBoard({
        ...board,
        columns: [...board.columns, { id: uuidv4(), columnTitle, items: [] }],
      });
    } else {
      setBoard({
        ...board,
        columns: [{ id: uuidv4(), columnTitle, items: [] }],
      });
    }
    setOpen(false);
  };

export const addItemHandler =
  (
    board: BoardI,
    setBoard: React.Dispatch<BoardI>,
    setOpen: React.Dispatch<boolean>,
    handlerColumn: ColumnI,
    handlerColumnId: number
  ) =>
  (text: string) => {
    if (
      board.columns &&
      handlerColumn &&
      handlerColumnId !== null &&
      board.columns[handlerColumnId].items?.length
    ) {
      const editColumn = {
        ...handlerColumn,
        items: [
          ...board.columns[handlerColumnId].items,
          { id: uuidv4(), text },
        ],
      };
      setBoard({
        ...board,
        columns: board.columns.map((col) => {
          if (col.id === editColumn.id) {
            return editColumn;
          }
          return col;
        }),
      });
    } else if (board.columns && handlerColumnId !== null && handlerColumn) {
      const editColumn = {
        ...handlerColumn,
        items: [{ id: uuidv4(), text }],
      };
      setBoard({
        ...board,
        columns: board.columns.map((col) => {
          if (col.id === editColumn.id) {
            return editColumn;
          }
          return col;
        }),
      });
    }

    setOpen(false);
  };

export const editBoardNameHandler =
  (
    board: BoardI,
    setBoard: React.Dispatch<BoardI>,
    setOpen: React.Dispatch<boolean>
  ) =>
  (boardName: string) => {
    setBoard({
      ...board,
      boardName,
    });
    setOpen(false);
  };

export const editColumnNameHandler =
  (
    board: BoardI,
    setBoard: React.Dispatch<BoardI>,
    setOpen: React.Dispatch<boolean>,
    handlerColumn: ColumnI,
    handlerColumnId: number
  ) =>
  (columnTitle: string) => {
    if (board.columns && handlerColumnId !== null && handlerColumn) {
      const editColumn = { ...handlerColumn, columnTitle };
      setBoard({
        ...board,
        columns: board.columns.map((col) => {
          if (col.id === editColumn.id) {
            return editColumn;
          }
          return col;
        }),
      });
    }

    setOpen(false);
  };

export const editItemHandler =
  (
    board: BoardI,
    setBoard: React.Dispatch<BoardI>,
    setOpen: React.Dispatch<boolean>,
    handlerColumn: ColumnI,
    handlerColumnId: number,
    handlerItem: ItemI,
    handlerItemId: number
  ) =>
  (itemText: string) => {
    if (
      board.columns &&
      handlerColumnId !== null &&
      handlerColumn &&
      handlerItem &&
      handlerItemId !== null
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

      setBoard({
        ...board,
        columns: board.columns.map((col) => {
          if (col.id === editColumn.id) {
            return editColumn;
          }
          return col;
        }),
      });
    }

    setOpen(false);
  };
