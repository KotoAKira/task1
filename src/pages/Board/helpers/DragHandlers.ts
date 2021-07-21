import React from "react";
import {
  BoardI,
  ColumnI,
  dragStartType,
  ItemI,
} from "../../../types/boardsType";

export function dragColumnOverHandler(e: React.DragEvent<HTMLElement>): void {
  e.preventDefault();
}

export function dragColumnStartHandler(
  e: React.DragEvent<HTMLElement>,
  column: ColumnI,
  setCurrentDragColumn: React.Dispatch<ColumnI>,
  setDragType: React.Dispatch<dragStartType>
): void {
  setCurrentDragColumn(column);
  setDragType(dragStartType.dragColumn);
}

export function dropColumnHandler(
  e: React.DragEvent<HTMLElement>,
  column: ColumnI,
  currentDragColumn: ColumnI | null,
  board: BoardI,
  setBoard: React.Dispatch<BoardI>,
  dragType: dragStartType,
  currentDragItem: ItemI | null,
  currentDragColumnOfItem: ColumnI | null
): void {
  e.preventDefault();
  if (
    currentDragColumn &&
    board.columns &&
    dragType === dragStartType.dragColumn
  ) {
    const currentColumnIndex = board.columns?.indexOf(currentDragColumn);
    const currentDropColumnIndex = board.columns?.indexOf(column);
    const editColumns = [...board.columns];
    editColumns.splice(currentColumnIndex, 1, column);
    editColumns.splice(currentDropColumnIndex, 1, currentDragColumn);
    setBoard({ ...board, columns: editColumns });
  } else if (
    currentDragItem &&
    currentDragColumnOfItem &&
    board.columns &&
    dragType === dragStartType.dragItem &&
    column.items
  ) {
    column.items.push(currentDragItem);
    const currentItemIndex =
      currentDragColumnOfItem.items.indexOf(currentDragItem);
    currentDragColumnOfItem.items.splice(currentItemIndex, 1);
    setBoard({
      ...board,
      columns: board.columns.map((col) => {
        if (col.id === currentDragColumnOfItem.id)
          return currentDragColumnOfItem;
        if (col.id === column.id) return column;
        return col;
      }),
    });
  } else if (
    currentDragItem &&
    currentDragColumnOfItem &&
    board.columns &&
    dragType === dragStartType.dragItem
  ) {
    const newColumn = { ...column, items: [currentDragItem] };
    const currentItemIndex =
      currentDragColumnOfItem.items.indexOf(currentDragItem);
    currentDragColumnOfItem.items.splice(currentItemIndex, 1);
    setBoard({
      ...board,
      columns: board.columns.map((col) => {
        if (col.id === currentDragColumnOfItem.id)
          return currentDragColumnOfItem;
        if (col.id === newColumn.id) return newColumn;
        return col;
      }),
    });
  }
}

export function dragItemStartHandler(
  e: React.DragEvent<HTMLElement>,
  column: ColumnI,
  item: ItemI,
  setCurrentDragColumnOfItem: React.Dispatch<ColumnI>,
  setCurrentDragItem: React.Dispatch<ItemI>,
  setDragType: React.Dispatch<dragStartType>
): void {
  e.stopPropagation();
  setCurrentDragColumnOfItem(column);
  setCurrentDragItem(item);
  setDragType(dragStartType.dragItem);
}

export function dropItemHandler(
  e: React.DragEvent<HTMLElement>,
  column: ColumnI,
  item: ItemI,
  currentDragColumnOfItem: ColumnI | null,
  currentDragItem: ItemI | null,
  board: BoardI,
  setBoard: React.Dispatch<BoardI>,
  dragType: dragStartType
): void {
  e.preventDefault();
  e.stopPropagation();
  if (
    currentDragColumnOfItem &&
    currentDragItem &&
    board.columns &&
    dragType === dragStartType.dragItem
  ) {
    const currentItemIndex =
      currentDragColumnOfItem.items.indexOf(currentDragItem);
    currentDragColumnOfItem.items.splice(currentItemIndex, 1);
    const dropItemIndex = column.items.indexOf(item);
    column.items.splice(dropItemIndex + 1, 0, currentDragItem);
    setBoard({
      ...board,
      columns: board.columns.map((col) => {
        if (col.id === currentDragColumnOfItem.id)
          return currentDragColumnOfItem;
        if (col.id === column.id) return column;
        return col;
      }),
    });
  }
}
