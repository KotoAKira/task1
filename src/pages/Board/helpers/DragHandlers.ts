import React from "react";
import { Dispatch } from "redux";
import { Action } from "redux-actions";
import { asyncUpdateBoardAction } from "../../../store/actions/boards";
import ColumnI from "../../../interfaces/Column";
import dragStartType from "../../../types/DragStartType";
import BoardI from "../../../interfaces/Board";
import ItemI from "../../../interfaces/Item";

export function dragColumnOverHandler(): (
  e: React.DragEvent<HTMLElement>
) => void {
  return (e: React.DragEvent<HTMLElement>) => e.preventDefault();
}

export function dragColumnStartHandler(
  column: ColumnI,
  setCurrentDragColumn: React.Dispatch<ColumnI>,
  setDragType: React.Dispatch<dragStartType>
): (e: React.DragEvent<HTMLElement>) => void {
  return (e: React.DragEvent<HTMLElement>) => {
    e.stopPropagation();
    setCurrentDragColumn(column);
    setDragType(dragStartType.dragColumn);
  };
}

export function dropColumnHandler(
  column: ColumnI,
  currentDragColumn: ColumnI | null,
  board: BoardI,
  dragType: dragStartType,
  currentDragItem: ItemI | null,
  currentDragColumnOfItem: ColumnI | null,
  boardId: string | null,
  dispatch: Dispatch<Action<{ board: BoardI; boardId: string }>>
): (e: React.DragEvent<HTMLElement>) => void {
  return (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    if (
      currentDragColumn &&
      board.columns &&
      dragType === dragStartType.dragColumn &&
      boardId
    ) {
      const currentColumnIndex = board.columns?.indexOf(currentDragColumn);
      const currentDropColumnIndex = board.columns?.indexOf(column);
      const editColumns = [...board.columns];
      editColumns.splice(currentColumnIndex, 1, column);
      editColumns.splice(currentDropColumnIndex, 1, currentDragColumn);
      const newBoard = { ...board, columns: editColumns };

      dispatch(asyncUpdateBoardAction({ board: newBoard, boardId }));
    } else if (
      currentDragItem &&
      currentDragColumnOfItem &&
      board.columns &&
      dragType === dragStartType.dragItem &&
      column.items &&
      boardId
    ) {
      column.items.push(currentDragItem);
      const currentItemIndex =
        currentDragColumnOfItem.items.indexOf(currentDragItem);
      currentDragColumnOfItem.items.splice(currentItemIndex, 1);
      const newBoard = {
        ...board,
        columns: board.columns.map((col) => {
          if (col.id === currentDragColumnOfItem.id)
            return currentDragColumnOfItem;
          if (col.id === column.id) return column;
          return col;
        }),
      };
      dispatch(asyncUpdateBoardAction({ board: newBoard, boardId }));
    } else if (
      currentDragItem &&
      currentDragColumnOfItem &&
      board.columns &&
      dragType === dragStartType.dragItem &&
      boardId
    ) {
      const newColumn = { ...column, items: [currentDragItem] };
      const currentItemIndex =
        currentDragColumnOfItem.items.indexOf(currentDragItem);
      currentDragColumnOfItem.items.splice(currentItemIndex, 1);
      const newBoard = {
        ...board,
        columns: board.columns.map((col) => {
          if (col.id === currentDragColumnOfItem.id)
            return currentDragColumnOfItem;
          if (col.id === newColumn.id) return newColumn;
          return col;
        }),
      };
      dispatch(asyncUpdateBoardAction({ board: newBoard, boardId }));
    }
  };
}

export function dragItemStartHandler(
  column: ColumnI,
  item: ItemI,
  setCurrentDragColumnOfItem: React.Dispatch<ColumnI>,
  setCurrentDragItem: React.Dispatch<ItemI>,
  setDragType: React.Dispatch<dragStartType>
): (e: React.DragEvent<HTMLElement>) => void {
  return (e: React.DragEvent<HTMLElement>) => {
    e.stopPropagation();
    setCurrentDragColumnOfItem(column);
    setCurrentDragItem(item);
    setDragType(dragStartType.dragItem);
  };
}

export function dropItemHandler(
  column: ColumnI,
  item: ItemI,
  currentDragColumnOfItem: ColumnI | null,
  currentDragItem: ItemI | null,
  board: BoardI,
  dragType: dragStartType,
  boardId: string | null,
  dispatch: Dispatch<Action<{ board: BoardI; boardId: string }>>
): (e: React.DragEvent<HTMLElement>) => void {
  return (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      currentDragColumnOfItem &&
      currentDragItem &&
      board.columns &&
      dragType === dragStartType.dragItem &&
      boardId
    ) {
      const currentItemIndex =
        currentDragColumnOfItem.items.indexOf(currentDragItem);
      currentDragColumnOfItem.items.splice(currentItemIndex, 1);
      const dropItemIndex = column.items.indexOf(item);
      column.items.splice(dropItemIndex + 1, 0, currentDragItem);
      const newBoard = {
        ...board,
        columns: board.columns.map((col) => {
          if (col.id === currentDragColumnOfItem.id)
            return currentDragColumnOfItem;
          if (col.id === column.id) return column;
          return col;
        }),
      };
      dispatch(asyncUpdateBoardAction({ board: newBoard, boardId }));
    }
  };
}
