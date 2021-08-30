import React from "react";
import ColumnI from "../../../../interfaces/Column";
import ItemI from "../../../../interfaces/Item";
import BoardI from "../../../../interfaces/Board";

interface ColumnProps {
  column: ColumnI;
  board: BoardI;
  boardId: string;
  currentDragColumnOfItem: ColumnI | null;
  currentDragItem: ItemI | null;
  setCurrentDragColumnOfItem: React.Dispatch<ColumnI>;
  setCurrentDragItem: React.Dispatch<ItemI>;
  setCurrentDragColumn: React.Dispatch<ColumnI>;
  currentDragColumn: ColumnI | null;
}

export default ColumnProps;
