import { v4 as uuidv4 } from "uuid";
import Board from "../../../../interfaces/Board";

export default function addItem(
  board: Board,
  handlerColumnId: string,
  text: string
): Board {
  return {
    ...board,
    columns: board.columns.map((column) => {
      const { id, items } = column;
      if (id === handlerColumnId) {
        return { ...column, items: [...items, { id: uuidv4(), text }] };
      }
      return column;
    }),
  };
}
