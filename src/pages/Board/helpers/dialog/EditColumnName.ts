import BoardI from "../../../../interfaces/Board";

export default function editColumnName(
  board: BoardI,
  columnId: string,
  columnTitle: string
): BoardI {
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
