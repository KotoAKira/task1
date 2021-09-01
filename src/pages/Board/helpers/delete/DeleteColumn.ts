import Board from "../../../../interfaces/Board";

export default function deleteColumn(columnId: string, board: Board): Board {
  return {
    ...board,
    columns: board.columns?.filter((column) => column.id !== columnId),
  };
}
