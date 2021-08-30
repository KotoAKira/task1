import { v4 as uuidv4 } from "uuid";
import BoardI from "../../../../interfaces/Board";

export default function addColumn(board: BoardI, columnTitle: string): BoardI {
  return {
    ...board,
    columns: [...board.columns, { id: uuidv4(), columnTitle, items: [] }],
  };
}
