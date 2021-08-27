import { Dispatch } from "redux";
import React from "react";
import { Action } from "redux-actions";
import ColumnI from "../../../../interfaces/Column";
import ItemI from "../../../../interfaces/Item";
import BoardI from "../../../../interfaces/Board";

interface ItemProps {
  column: ColumnI;
  item: ItemI;
  dragItemStartHandler: () => (event: React.DragEvent<HTMLDivElement>) => void;
  dropItemHandler: () => (event: React.DragEvent<HTMLDivElement>) => void;
  editItemClickHandler: (
    columnIndex: number,
    column: ColumnI,
    itemIndex: number,
    item: ItemI
  ) => () => void;
  columnIndex: number;
  itemIndex: number;
  board: BoardI;
  boardId: string;
  dispatch: Dispatch<Action<{ board: BoardI; boardId: string }>>;
}

export default ItemProps;
