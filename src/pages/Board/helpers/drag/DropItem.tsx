import ItemI from "../../../../interfaces/Item";
import BoardI from "../../../../interfaces/Board";

export default function dropItem(
  itemFromColumnId: string,
  targetColumnId: string,
  currentItem: ItemI,
  toItem: ItemI,
  board: BoardI
): BoardI {
  const { columns } = board;
  const columnsCopy = [...columns];
  const newColumns = columnsCopy.map((column) => {
    const { id, items } = column;
    if (id === itemFromColumnId && id === targetColumnId) {
      const newItems = items.filter((item) => item.id !== currentItem.id);
      const index = newItems.indexOf(toItem);
      newItems.splice(index + 1, 0, currentItem);
      return { ...column, items: newItems };
    }
    if (id === itemFromColumnId) {
      return {
        ...column,
        items: items.filter((item) => item.id !== currentItem.id),
      };
    }
    if (id === targetColumnId) {
      const index = items.indexOf(toItem);
      items.splice(index + 1, 0, currentItem);
      return { ...column, items };
    }
    return column;
  });
  return { ...board, columns: newColumns };
}
