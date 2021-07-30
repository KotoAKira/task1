import { Dispatch } from "redux";
import ColumnI from "../../../interfaces/Column";
import { asyncUpdateBoardAction } from "../../../store/actions/boards";
import BoardI from "../../../interfaces/Board";
import ItemI from "../../../interfaces/Item";

export const deleteColumnHandler =
  (column: ColumnI, board: BoardI, boardId: string, dispatch: Dispatch<any>) =>
  (): void => {
    const newBoard = {
      ...board,
      columns: board.columns?.filter((col) => {
        if (col.id === column.id) {
          return false;
        }
        return true;
      }),
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
    dispatch: Dispatch<any>
  ) =>
  (): void => {
    const newBoard = {
      ...board,
      columns: board.columns?.map((col) => {
        if (col.id === column.id && board.columns) {
          const editedColumn = {
            ...column,
            items: board.columns[columnIndex].items.filter((it) => {
              if (it.id === item.id) {
                return false;
              }
              return true;
            }),
          };
          return editedColumn;
        }
        return col;
      }),
    };

    dispatch(asyncUpdateBoardAction({ board: newBoard, boardId }));
  };
