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
    if (dragType === dragStartType.dragColumn) {
      const currentColumnIndex = board.columns?.indexOf(currentDragColumn);
      const currentDropColumnIndex = board.columns?.indexOf(column);
      const editColumns = [...board.columns];
      editColumns.splice(currentColumnIndex, 1, column);
      editColumns.splice(currentDropColumnIndex, 1, currentDragColumn);
      const newBoard = { ...board, columns: editColumns };

      dispatch(asyncUpdateBoardAction({ board: newBoard, boardId }));
    } else if (dragType === dragStartType.dragItem && column.items) {
      const currentItemIndex =
        currentDragColumnOfItem.items.indexOf(currentDragItem);
      const currentItems = [
        ...currentDragColumnOfItem.items.slice(0, currentItemIndex),
        ...currentDragColumnOfItem.items.slice(currentItemIndex + 1),
      ];
      const newCurrentColumn: ColumnI = {
        ...currentDragColumnOfItem,
        items: currentItems,
      };

      const items = [...column.items, currentDragItem];
      const newColumn: ColumnI = {
        ...column,
        items,
      };

      const newBoard = {
        ...board,
        columns: board.columns.map((col) => {
          if (col.id === newCurrentColumn.id) return newCurrentColumn;
          if (col.id === newColumn.id) return newColumn;
          return col;
        }),
      };

      dispatch(asyncUpdateBoardAction({ board: newBoard, boardId }));
    } else if (dragType === dragStartType.dragItem) {
      const newColumn = { ...column, items: [currentDragItem] };
      const currentItemIndex =
        currentDragColumnOfItem.items.indexOf(currentDragItem);

      const currentItems = [
        ...currentDragColumnOfItem.items.slice(0, currentItemIndex),
        ...currentDragColumnOfItem.items.slice(currentItemIndex + 1),
      ];
      const newCurrentColumn: ColumnI = {
        ...currentDragColumnOfItem,
        items: currentItems,
      };

      const newBoard = {
        ...board,
        columns: board.columns.map((col) => {
          if (col.id === newCurrentColumn.id) return newCurrentColumn;
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
): () => (e: React.DragEvent<HTMLElement>) => void {
  return () => (e: React.DragEvent<HTMLElement>) => {
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
): () => (e: React.DragEvent<HTMLElement>) => void {
  return () => (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragType === dragStartType.dragItem) {
      if (currentDragColumnOfItem !== column) {
        const currentItemIndex =
          currentDragColumnOfItem.items.indexOf(currentDragItem);
        const currentItems = [
          ...currentDragColumnOfItem.items.slice(0, currentItemIndex),
          ...currentDragColumnOfItem.items.slice(currentItemIndex + 1),
        ];
        const newCurrentColumn: ColumnI = {
          ...currentDragColumnOfItem,
          items: currentItems,
        };

        const dropItemIndex = column.items.indexOf(item);
        column.items.splice(dropItemIndex + 1, 0, currentDragItem);
        const items = [
          ...column.items.slice(0, dropItemIndex + 1),
          currentDragItem,
          ...column.items.slice(dropItemIndex + 2),
        ];
        const newColumn: ColumnI = {
          ...column,
          items,
        };

        const newBoard = {
          ...board,
          columns: board.columns.map((col) => {
            if (col.id === newCurrentColumn.id) return newCurrentColumn;
            if (col.id === newColumn.id) return newColumn;
            return col;
          }),
        };
        dispatch(asyncUpdateBoardAction({ board: newBoard, boardId }));
      } else {
        const items = [...column.items];

        const currentItemIndex = items.indexOf(currentDragItem);
        items.splice(currentItemIndex, 1);
        const dropItemIndex = items.indexOf(item);
        items.splice(dropItemIndex + 1, 0, currentDragItem);

        const newColumn: ColumnI = {
          ...column,
          items,
        };

        const newBoard = {
          ...board,
          columns: board.columns.map((col) => {
            if (col.id === newColumn.id) return newColumn;
            return col;
          }),
        };
        dispatch(asyncUpdateBoardAction({ board: newBoard, boardId }));
      }
    }
  };
}

export function dragRefactor(
  itemFromColumnId: string,
  targetColumnId: string,
  currentItem: ItemI,
  toItem: ItemI,
  board: BoardI
): BoardI {
  const { columns } = board;
  const columnsCopy = [...columns];
  const newColumns = columnsCopy.map((column) => {
    const { id, items } = column;
    if (id === itemFromColumnId) {
      return {
        ...column,
        items: items.filter((item) => item.id !== currentItem.id),
      };
    }
    if (id === targetColumnId) {
      const index = items.indexOf(toItem);
      items.splice(index, 0, currentItem);
      return { ...column, items };
    }
    return column;
  });
  return { ...board, columns: newColumns };
}
