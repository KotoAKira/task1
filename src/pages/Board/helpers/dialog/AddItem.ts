import { v4 as uuidv4 } from "uuid";
import BoardI from "../../../../interfaces/Board";

export default function addItem(
  board: BoardI,
  handlerColumnId: string,
  text: string
): BoardI {
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
