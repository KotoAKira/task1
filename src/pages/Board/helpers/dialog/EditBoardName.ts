import BoardI from "../../../../interfaces/Board";

export default function editBoardName(
  board: BoardI,
  boardName: string
): BoardI {
  return {
    ...board,
    boardName,
  };
}
