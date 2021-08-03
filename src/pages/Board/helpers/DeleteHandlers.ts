import { Dispatch } from "redux";
import { Action } from "redux-actions";
import ColumnI from "../../../interfaces/Column";
import { asyncUpdateBoardAction } from "../../../store/actions/boards";
import BoardI from "../../../interfaces/Board";
import ItemI from "../../../interfaces/Item";

export const deleteColumnHandler =
  (
    column: ColumnI,
    board: BoardI,
    boardId: string,
    dispatch: Dispatch<Action<{ board: BoardI; boardId: string }>>
  ) =>
  (): void => {
    const newBoard = {
      ...board,
      columns: board.columns?.filter((col) => col.id !== column.id),
    };

    dispatch(asyncUpdateBoardAction({ board: newBoard, boardId }));
  };

export const deleteItemHandler =
  (
    column: ColumnI,
    columnIndex: number,
    item: ItemI,
    board: BoardI,
    boardId: string,
    dispatch: Dispatch<Action<{ board: BoardI; boardId: string }>>
  ) =>
  (): void => {
    const newBoard = {
      ...board,
      columns: board.columns?.map((col) => {
        if (col.id === column.id && board.columns) {
          return {
            ...column,
            items: board.columns[columnIndex].items.filter(
              (it) => it.id !== item.id
            ),
          };
        }
        return col;
      }),
    };

    dispatch(asyncUpdateBoardAction({ board: newBoard, boardId }));
  };
