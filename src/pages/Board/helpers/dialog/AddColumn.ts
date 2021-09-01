import { v4 as uuidv4 } from "uuid";
import Board from "../../../../interfaces/Board";

export default function addColumn(board: Board, columnTitle: string): Board {
  return {
    ...board,
    columns: [...board.columns, { id: uuidv4(), columnTitle, items: [] }],
  };
}
