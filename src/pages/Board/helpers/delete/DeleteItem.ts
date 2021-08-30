import BoardI from "../../../../interfaces/Board";

export default function deleteItem(
  columnId: string,
  itemId: string,
  board: BoardI
): BoardI {
  return {
    ...board,
    columns: board.columns?.map((column) => {
      const { items } = column;
      if (column.id === columnId) {
        return {
          ...column,
          items: items.filter((item) => item.id !== itemId),
        };
      }
      return column;
    }),
  };
}
