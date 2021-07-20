import React, { useEffect, useState } from "react";
import { Button, Container, Typography } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useStyles from "./Styles";
import { ColumnI, ItemI } from "../../types/boardsType";
import BoardDialog, {
  MainContentI,
} from "../../components/BoardDialog/BoardDialog";
import {
  selectCurrentBoard,
  selectCurrentBoardId,
} from "../../store/selectors/boards";
import { updateBoard } from "../../store/thunks/boards";
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

const BoardPage: React.FC = function () {
  const classes = useStyles();
  const dispatch = useDispatch();
  // Board logic
  const boardId = useSelector(selectCurrentBoardId);
  const [board, setBoard] = useState(useSelector(selectCurrentBoard));

  useEffect(() => {
    if (boardId != null) {
      dispatch(updateBoard(board, boardId));
    }
  }, [board]);

  const [open, setOpen] = useState(false);
  const [mainContent, setMainContent] = useState<MainContentI>({
    title: "",
    button: "",
    content: "",
    label: "",
  });
  const [boardHandler, setBoardHandler] = useState<(text: string) => void>(() =>
    addColumnHandler(board, setBoard, setOpen)
  );

  const handleClose = () => {
    setOpen(false);
  };

  // click handlers

  const addColumnClickHandler = () => {
    setAddColumnContent(setMainContent);
    setBoardHandler(() => addColumnHandler(board, setBoard, setOpen));
    setOpen(true);
  };

  const addItemClickHandler = (columnId: number, column: ColumnI) => () => {
    setAddItemContent(setMainContent);
    setBoardHandler(() =>
      addItemHandler(board, setBoard, setOpen, column, columnId)
    );
    setOpen(true);
    console.log(boardHandler);
    console.log(column);
  };

  const editBoardNameClickHandler = () => {
    setEditBoardNameContent(setMainContent);
    setBoardHandler(() => editBoardNameHandler(board, setBoard, setOpen));
    setOpen(true);
  };

  const editColumnNameClickHandler =
    (columnId: number, column: ColumnI) => () => {
      setEditColumnNameContent(setMainContent);
      setBoardHandler(() =>
        editColumnNameHandler(board, setBoard, setOpen, column, columnId)
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
          setBoard,
          setOpen,
          column,
          columnIndex,
          item,
          itemIndex
        )
      );
      setOpen(true);
    };

  // drag column handlers
  const [currentDragColumn, setCurrentDragColumn] = useState<ColumnI | null>(
    null
  );

  // eslint-disable-next-line no-shadow
  enum dragStartType {
    dragItem,
    dragColumn,
  }

  const [dragType, setDragType] = useState<dragStartType>(
    dragStartType.dragItem
  );

  function dragColumnOverHandler(e: React.DragEvent<HTMLElement>) {
    e.preventDefault();
  }

  function dragColumnStartHandler(
    e: React.DragEvent<HTMLElement>,
    column: ColumnI
  ) {
    setCurrentDragColumn(column);
    setDragType(dragStartType.dragColumn);
  }

  function dropColumnHandler(e: React.DragEvent<HTMLElement>, column: ColumnI) {
    e.preventDefault();
    if (
      currentDragColumn &&
      board.columns &&
      dragType === dragStartType.dragColumn
    ) {
      const currentColumnIndex = board.columns?.indexOf(currentDragColumn);
      const currentDropColumnIndex = board.columns?.indexOf(column);
      const editColumns = [...board.columns];
      editColumns.splice(currentColumnIndex, 1, column);
      editColumns.splice(currentDropColumnIndex, 1, currentDragColumn);
      setBoard({ ...board, columns: editColumns });
    } else if (
      currentDragItem &&
      currentDragColumnOfItem &&
      board.columns &&
      dragType === dragStartType.dragItem &&
      column.items
    ) {
      column.items.push(currentDragItem);
      const currentItemIndex =
        currentDragColumnOfItem.items.indexOf(currentDragItem);
      currentDragColumnOfItem.items.splice(currentItemIndex, 1);
      setBoard({
        ...board,
        columns: board.columns.map((col) => {
          if (col.id === currentDragColumnOfItem.id)
            return currentDragColumnOfItem;
          if (col.id === column.id) return column;
          return col;
        }),
      });
    } else if (
      currentDragItem &&
      currentDragColumnOfItem &&
      board.columns &&
      dragType === dragStartType.dragItem
    ) {
      const newColumn = { ...column, items: [currentDragItem] };
      const currentItemIndex =
        currentDragColumnOfItem.items.indexOf(currentDragItem);
      currentDragColumnOfItem.items.splice(currentItemIndex, 1);
      setBoard({
        ...board,
        columns: board.columns.map((col) => {
          if (col.id === currentDragColumnOfItem.id)
            return currentDragColumnOfItem;
          if (col.id === newColumn.id) return newColumn;
          return col;
        }),
      });
    }
  }

  // drag item handlers

  const [currentDragColumnOfItem, setCurrentDragColumnOfItem] =
    useState<ColumnI | null>(null);
  const [currentDragItem, setCurrentDragItem] = useState<ItemI | null>(null);

  function dragItemStartHandler(
    e: React.DragEvent<HTMLElement>,
    column: ColumnI,
    item: ItemI
  ) {
    e.stopPropagation();
    setCurrentDragColumnOfItem(column);
    setCurrentDragItem(item);
    setDragType(dragStartType.dragItem);
  }

  function dropItemHandler(
    e: React.DragEvent<HTMLElement>,
    column: ColumnI,
    item: ItemI
  ) {
    e.preventDefault();
    e.stopPropagation();
    if (currentDragColumnOfItem && currentDragItem && board.columns) {
      const currentItemIndex =
        currentDragColumnOfItem.items.indexOf(currentDragItem);
      currentDragColumnOfItem.items.splice(currentItemIndex, 1);
      const dropItemIndex = column.items.indexOf(item);
      column.items.splice(dropItemIndex + 1, 0, currentDragItem);
      setBoard({
        ...board,
        columns: board.columns.map((col) => {
          if (col.id === currentDragColumnOfItem.id)
            return currentDragColumnOfItem;
          if (col.id === column.id) return column;
          return col;
        }),
      });
    }
  }

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
                  onDragStart={(event) => dragColumnStartHandler(event, column)}
                  onDrop={(event) => dropColumnHandler(event, column)}
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
                    onClick={deleteColumnHandler(column, setBoard, board)}
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
                          setBoard={setBoard}
                          editItemClickHandler={editItemClickHandler}
                          deleteItemHandler={deleteItemHandler}
                          dragItemStartHandler={dragItemStartHandler}
                          dropItemHandler={dropItemHandler}
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
