import React, { useState } from "react";
import { Button, Container, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import {
  selectCurrentBoard,
  selectCurrentBoardId,
} from "../../store/selectors/boards";
import ColumnI from "../../interfaces/Column";
import ItemI from "../../interfaces/Item";
import BoardDialog from "./components/BoardDialog/BoardDialog";
import { showModal } from "../../store/actions/modal";
import { addColumnContent, editBoardNameContent } from "./consts/consts";
import Column from "./components/Column/Column";
import addColumn from "./helpers/dialog/AddColumn";
import { asyncUpdateBoardAction } from "../../store/actions/boards";
import editBoardName from "./helpers/dialog/EditBoardName";

const BoardPage: React.FC = function () {
  const classes = useStyles();
  const dispatch = useDispatch();
  // Board logic
  const boardId = useSelector(selectCurrentBoardId);
  const board = useSelector(selectCurrentBoard);

  const [currentDragColumn, setCurrentDragColumn] = useState<ColumnI | null>(
    null
  );
  const [currentDragColumnOfItem, setCurrentDragColumnOfItem] =
    useState<ColumnI | null>(null);
  const [currentDragItem, setCurrentDragItem] = useState<ItemI | null>(null);

  const addColumnHandler = (columnTitle: string) => {
    dispatch(
      asyncUpdateBoardAction({ board: addColumn(board, columnTitle), boardId })
    );
  };
  const addColumnClickHandler = () => {
    dispatch(
      showModal({
        mainContent: addColumnContent,
        handler: addColumnHandler,
      })
    );
  };

  const editBoardNameHandler = (boardName: string) => {
    dispatch(
      asyncUpdateBoardAction({
        board: editBoardName(board, boardName),
        boardId,
      })
    );
  };
  const editBoardNameClickHandler = () => {
    dispatch(
      showModal({
        mainContent: editBoardNameContent,
        handler: editBoardNameHandler,
      })
    );
  };

  if (!boardId) {
    return (
      <div className={classes.emptyBoardWrapper}>
        <Typography className={classes.title} variant="h4">
          Please, choose <Link to="/boards">board</Link>!
        </Typography>
      </div>
    );
  }

  return (
    <>
      <Container>
        <div>
          <div className={classes.wrapper}>
            <Typography variant="h4" className={classes.title}>
              {board.boardName}
            </Typography>
            <div>
              <Button
                variant="outlined"
                color="primary"
                className={classes.editButton}
                onClick={editBoardNameClickHandler}
              >
                Edit board name
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={addColumnClickHandler}
              >
                Add column
              </Button>
            </div>
          </div>
        </div>
        <div>
          <div className={classes.columnsWrapper}>
            {board.columns &&
              board.columns.map((column) => (
                <Column
                  board={board}
                  boardId={boardId}
                  column={column}
                  currentDragColumnOfItem={currentDragColumnOfItem}
                  currentDragItem={currentDragItem}
                  setCurrentDragColumnOfItem={setCurrentDragColumnOfItem}
                  setCurrentDragItem={setCurrentDragItem}
                  setCurrentDragColumn={setCurrentDragColumn}
                  currentDragColumn={currentDragColumn}
                />
              ))}
          </div>
        </div>
      </Container>
      <BoardDialog />
    </>
  );
};

export default BoardPage;
