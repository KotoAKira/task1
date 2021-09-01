import Board from "../../../../interfaces/Board";

export default function editBoardName(board: Board, boardName: string): Board {
  return {
    ...board,
    boardName,
  };
}
