import React from "react";
import ColumnI from "../../../../interfaces/Column";
import ItemI from "../../../../interfaces/Item";
import BoardI from "../../../../interfaces/Board";

interface ItemProps {
  column: ColumnI;
  item: ItemI;
  board: BoardI;
  boardId: string;
  currentDragItem: any;
  currentDragColumnOfItem: any;
  setCurrentDragColumnOfItem: React.Dispatch<ColumnI>;
  setCurrentDragItem: React.Dispatch<ItemI>;
}

export default ItemProps;
