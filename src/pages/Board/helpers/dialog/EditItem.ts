import Board from "../../../../interfaces/Board";

export default function editItem(
  board: Board,
  handlerColumnId: string,
  handlerItemId: string,
  itemText: string
): Board {
  return {
    ...board,
    columns: board.columns.map((column) => {
      const { id, items } = column;
      if (id === handlerColumnId) {
        return {
          ...column,
          items: items.map((item) => {
            if (item.id === handlerItemId) {
              return { ...item, text: itemText };
            }
            return item;
          }),
        };
      }
      return column;
    }),
  };
}
