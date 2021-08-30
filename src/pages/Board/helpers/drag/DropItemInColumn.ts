import ItemI from "../../../../interfaces/Item";
import BoardI from "../../../../interfaces/Board";

export default function dropItemInColumn(
  itemFromColumnId: string,
  itemToColumnId: string,
  currentItem: ItemI,
  board: BoardI
): BoardI {
  const { columns } = board;
  const columnsCopy = [...columns];
  const newColumns = columnsCopy.map((column) => {
    const { id, items } = column;

    if (id === itemToColumnId && id === itemFromColumnId) {
      const newItems = items.filter((item) => item !== currentItem);
      newItems.push(currentItem);
      return {
        ...column,
        items: newItems,
      };
    }
    if (id === itemToColumnId) {
      return { ...column, items: [...items, currentItem] };
    }
    if (id === itemFromColumnId) {
      const newItems = items.filter((item) => item !== currentItem);
      return {
        ...column,
        items: newItems,
      };
    }
    return column;
  });
  return { ...board, columns: newColumns };
}
