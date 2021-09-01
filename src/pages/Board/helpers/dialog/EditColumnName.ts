import Board from "../../../../interfaces/Board";

export default function editColumnName(
  board: Board,
  columnId: string,
  columnTitle: string
): Board {
  return {
    ...board,
    columns: board.columns.map((column) => {
      if (column.id === columnId) {
        return { ...column, columnTitle };
      }
      return column;
    }),
  };
}
