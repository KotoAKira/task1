import BoardI from "../../../../interfaces/Board";

export default function deleteColumn(columnId: string, board: BoardI): BoardI {
  return {
    ...board,
    columns: board.columns?.filter((column) => column.id !== columnId),
  };
}
