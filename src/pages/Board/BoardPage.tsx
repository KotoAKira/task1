import React, { useState } from "react";
import { Button, Container, Typography } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useStyles from "./Styles";
import BoardDialog, {
  MainContentI,
} from "../../components/BoardDialog/BoardDialog";
import {
  selectCurrentBoard,
  selectCurrentBoardId,
} from "../../store/selectors/boards";
import {
  deleteColumnHandler,
  deleteItemHandler,
} from "./helpers/DeleteHandlers";
import Item from "../../components/Item/Item";
import {
  addColumnHandler,
  addItemHandler,
  editBoardNameHandler,
  editColumnNameHandler,
  editItemHandler,
  setAddColumnContent,
  setAddItemContent,
  setEditBoardNameContent,
  setEditColumnNameContent,
  setEditItemContent,
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

const BoardPage: React.FC = function () {
  const classes = useStyles();
  const dispatch = useDispatch();
  // Board logic
  const boardId = useSelector(selectCurrentBoardId);
  const board = useSelector(selectCurrentBoard);

  const [open, setOpen] = useState(false);
  const [mainContent, setMainContent] = useState<MainContentI>({
    title: "",
    button: "",
    content: "",
    label: "",
  });
  const [boardHandler, setBoardHandler] = useState<(text: string) => void>(() =>
    addColumnHandler(board, setOpen, boardId, dispatch)
  );

  const handleClose = () => {
    setOpen(false);
  };

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
    setAddColumnContent(setMainContent);
    setBoardHandler(() => addColumnHandler(board, setOpen, boardId, dispatch));
    setOpen(true);
  };

  const addItemClickHandler = (columnId: number, column: ColumnI) => () => {
    setAddItemContent(setMainContent);
    setBoardHandler(() =>
      addItemHandler(board, setOpen, column, columnId, boardId, dispatch)
    );
    setOpen(true);
  };

  const editBoardNameClickHandler = () => {
    setEditBoardNameContent(setMainContent);
    setBoardHandler(() =>
      editBoardNameHandler(board, setOpen, boardId, dispatch)
    );
    setOpen(true);
  };

  const editColumnNameClickHandler =
    (columnId: number, column: ColumnI) => () => {
      setEditColumnNameContent(setMainContent);
      setBoardHandler(() =>
        editColumnNameHandler(
          board,
          setOpen,
          column,
          columnId,
          boardId,
          dispatch
        )
      );
      setOpen(true);
    };

  const editItemClickHandler =
    (columnIndex: number, column: ColumnI, itemIndex: number, item: ItemI) =>
    () => {
      setEditItemContent(setMainContent);
      setBoardHandler(() =>
        editItemHandler(
          board,
          setOpen,
          column,
          columnIndex,
          item,
          itemIndex,
          boardId,
          dispatch
        )
      );
      setOpen(true);
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
                  onDragStart={(event) =>
                    dragColumnStartHandler(
                      event,
                      column,
                      setCurrentDragColumn,
                      setDragType
                    )
                  }
                  onDrop={(event) =>
                    dropColumnHandler(
                      event,
                      column,
                      currentDragColumn,
                      board,
                      dragType,
                      currentDragItem,
                      currentDragColumnOfItem,
                      boardId,
                      dispatch
                    )
                  }
                  onDragOver={(event) => dragColumnOverHandler(event)}
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
                          dragItemStartHandler={(event) =>
                            dragItemStartHandler(
                              event,
                              column,
                              item,
                              setCurrentDragColumnOfItem,
                              setCurrentDragItem,
                              setDragType
                            )
                          }
                          dropItemHandler={(event) =>
                            dropItemHandler(
                              event,
                              column,
                              item,
                              currentDragColumnOfItem,
                              currentDragItem,
                              board,
                              dragType,
                              boardId,
                              dispatch
                            )
                          }
                        />
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Container>
      <BoardDialog
        open={open}
        handleClose={handleClose}
        mainContent={mainContent}
        handler={boardHandler}
      />
    </>
  );
};

export default BoardPage;
