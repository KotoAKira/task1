import { Dispatch } from "redux";
import React from "react";
import { Action } from "redux-actions";
import ColumnI from "../../../../interfaces/Column";
import ItemI from "../../../../interfaces/Item";
import BoardI from "../../../../interfaces/Board";
import dragStartType from "../../../../types/DragStartType";

interface ColumnProps {
  column: ColumnI;
  editItemClickHandler: (
    columnIndex: number,
    column: ColumnI,
    itemIndex: number,
    item: ItemI
  ) => () => void;
  columnIndex: number;
  board: BoardI;
  boardId: string;
  dispatch: Dispatch<Action<{ board: BoardI; boardId: string }>>;
  editColumnNameClickHandler: (columnId: number, column: ColumnI) => () => void;
  addItemClickHandler: (columnId: number, column: ColumnI) => () => void;
  currentDragColumnOfItem: ColumnI | null;
  currentDragItem: ItemI | null;
  dragType: dragStartType;
  setCurrentDragColumnOfItem: React.Dispatch<ColumnI>;
  setCurrentDragItem: React.Dispatch<ItemI>;
  setDragType: React.Dispatch<dragStartType>;
  setCurrentDragColumn: React.Dispatch<ColumnI>;
  currentDragColumn: ColumnI | null;
}

export default ColumnProps;
