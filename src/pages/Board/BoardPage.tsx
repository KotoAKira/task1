import React, { useState } from "react";
import { Button, Container, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import {
  selectCurrentBoard,
  selectCurrentBoardId,
} from "../../store/selectors/boards";
import {
  addColumnHandler,
  addItemHandler,
  editBoardNameHandler,
  editColumnNameHandler,
  editItemHandler,
} from "./helpers/BoardDialogHandlers";
import ColumnI from "../../interfaces/Column";
import dragStartType from "../../types/DragStartType";
import ItemI from "../../interfaces/Item";
import BoardDialog from "./components/BoardDialog/BoardDialog";
import { showModal } from "../../store/actions/modal";
import {
  addColumnContent,
  addItemContent,
  editBoardNameContent,
  editColumnNameContent,
  editItemContent,
} from "./consts/consts";
import Column from "./components/Column/Column";

const BoardPage: React.FC = function () {
  const classes = useStyles();
  const dispatch = useDispatch();
  // Board logic
  const boardId = useSelector(selectCurrentBoardId);
  const board = useSelector(selectCurrentBoard);

  const [currentDragColumn, setCurrentDragColumn] = useState<ColumnI | null>(
    null
  );
  const [dragType, setDragType] = useState<dragStartType>(
    dragStartType.dragItem
  );
  const [currentDragColumnOfItem, setCurrentDragColumnOfItem] =
    useState<ColumnI | null>(null);
  const [currentDragItem, setCurrentDragItem] = useState<ItemI | null>(null);

  const addColumnClickHandler = () => {
    dispatch(
      showModal({
        mainContent: addColumnContent,
        handler: addColumnHandler(board, boardId, dispatch),
      })
    );
  };

  const addItemClickHandler = (columnId: number, column: ColumnI) => () => {
    dispatch(
      showModal({
        mainContent: addItemContent,
        handler: addItemHandler(board, column, columnId, boardId, dispatch),
      })
    );
  };

  const editBoardNameClickHandler = () => {
    dispatch(
      showModal({
        mainContent: editBoardNameContent,
        handler: editBoardNameHandler(board, boardId, dispatch),
      })
    );
  };

  const editColumnNameClickHandler =
    (columnId: number, column: ColumnI) => () => {
      dispatch(
        showModal({
          mainContent: editColumnNameContent,
          handler: editColumnNameHandler(
            board,
            column,
            columnId,
            boardId,
            dispatch
          ),
        })
      );
    };

  const editItemClickHandler =
    (columnIndex: number, column: ColumnI, itemIndex: number, item: ItemI) =>
    () => {
      dispatch(
        showModal({
          mainContent: editItemContent,
          handler: editItemHandler(
            board,
            column,
            columnIndex,
            item,
            itemIndex,
            boardId,
            dispatch
          ),
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
              board.columns.map((column, columnIndex) => (
                <Column
                  addItemClickHandler={addItemClickHandler}
                  board={board}
                  boardId={boardId}
                  column={column}
                  columnIndex={columnIndex}
                  editItemClickHandler={editItemClickHandler}
                  dispatch={dispatch}
                  currentDragColumnOfItem={currentDragColumnOfItem}
                  currentDragItem={currentDragItem}
                  dragType={dragType}
                  editColumnNameClickHandler={editColumnNameClickHandler}
                  setCurrentDragColumnOfItem={setCurrentDragColumnOfItem}
                  setCurrentDragItem={setCurrentDragItem}
                  setDragType={setDragType}
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
