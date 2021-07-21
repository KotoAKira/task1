import { BoardI, ColumnI, ItemI } from "../../../types/boardsType";

export const deleteColumnHandler =
  (column: ColumnI, setBoard: React.Dispatch<BoardI>, board: BoardI) =>
  (): void => {
    setBoard({
      ...board,
      columns: board.columns?.filter((col) => {
        if (col.id === column.id) {
          return false;
        }
        return true;
      }),
    });
  };

export const deleteItemHandler =
  (
    column: ColumnI,
    columnIndex: number,
    item: ItemI,
    setBoard: React.Dispatch<BoardI>,
    board: BoardI
  ) =>
  (): void => {
    setBoard({
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
    });
  };
