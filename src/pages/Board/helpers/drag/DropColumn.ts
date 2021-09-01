import Board from "../../../../interfaces/Board";

export default function dropColumn(
  currentColumnId: string,
  toColumnId: string,
  board: Board
): Board {
  const { columns } = board;
  const columnsCopy = [...columns];
  const newColumns = columnsCopy.map((column) => {
    const { id } = column;

    if (id === currentColumnId) {
      return columnsCopy.find((col) => col.id === toColumnId);
    }
    if (id === toColumnId) {
      return columnsCopy.find((col) => col.id === currentColumnId);
    }
    return column;
  });
  return { ...board, columns: newColumns };
}
