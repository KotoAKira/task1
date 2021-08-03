import React, { useState } from "react";
import { Button, Container, Typography } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useStyles from "./Styles";
import {
  selectCurrentBoard,
  selectCurrentBoardId,
} from "../../store/selectors/boards";
import {
  deleteColumnHandler,
  deleteItemHandler,
} from "./helpers/DeleteHandlers";
import Item from "./components/Item/Item";
import {
  addColumnHandler,
  addItemHandler,
  editBoardNameHandler,
  editColumnNameHandler,
  editItemHandler,
  addColumnContent,
  addItemContent,
  editBoardNameContent,
  editColumnNameContent,
  editItemContent,
} from "./helpers/BoardDialogHandlers";
import {
  dragColumnOverHandler,
  dragColumnStartHandler,
  dragItemStartHandler,
  dropColumnHandler,
  dropItemHandler,
} from "./helpers/DragHandlers";
import ColumnI from "../../interfaces/Column";
import dragStartType from "../../types/DragStartType";
import ItemI from "../../interfaces/Item";
import BoardDialog from "./components/BoardDialog/BoardDialog";
import { showModal } from "../../store/actions/modal";

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
                <div
                  draggable
                  onDragStart={dragColumnStartHandler(
                    column,
                    setCurrentDragColumn,
                    setDragType
                  )}
                  onDrop={dropColumnHandler(
                    column,
                    currentDragColumn,
                    board,
                    dragType,
                    currentDragItem,
                    currentDragColumnOfItem,
                    boardId,
                    dispatch
                  )}
                  onDragOver={dragColumnOverHandler()}
                  className={classes.column}
                  key={column.id}
                >
                  <div className={classes.columnTitle}>
                    {column.columnTitle}
                  </div>
                  <EditOutlinedIcon
                    className={classes.editColumnIcon}
                    onClick={editColumnNameClickHandler(columnIndex, column)}
                  />
                  <DeleteOutlineIcon
                    className={classes.deleteColumnIcon}
                    onClick={deleteColumnHandler(
                      column,
                      board,
                      boardId,
                      dispatch
                    )}
                  />
                  <AddIcon
                    className={classes.addIcon}
                    onClick={addItemClickHandler(columnIndex, column)}
                  />
                  <div className={classes.columnContent}>
                    {column.items &&
                      column.items.map((item, itemIndex) => (
                        <Item
                          key={item.id}
                          column={column}
                          columnIndex={columnIndex}
                          item={item}
                          itemIndex={itemIndex}
                          board={board}
                          dispatch={dispatch}
                          boardId={boardId}
                          editItemClickHandler={editItemClickHandler}
                          deleteItemHandler={deleteItemHandler}
                          dragItemStartHandler={dragItemStartHandler(
                            column,
                            item,
                            setCurrentDragColumnOfItem,
                            setCurrentDragItem,
                            setDragType
                          )}
                          dropItemHandler={dropItemHandler(
                            column,
                            item,
                            currentDragColumnOfItem,
                            currentDragItem,
                            board,
                            dragType,
                            boardId,
                            dispatch
                          )}
                        />
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Container>
      <BoardDialog />
    </>
  );
};

export default BoardPage;
