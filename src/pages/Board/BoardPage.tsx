import React, { useEffect, useState } from "react";
import { Button, Container, Typography } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Navbar from "../../components/Navbar/Navbar";
import useStyles from "./Styles";
import { BoardOperations, ColumnI, ItemI } from "../../types/boardsType";
import BoardDialog from "../../components/BoardDialog/BoardDialog";
import {
  selectCurrentBoard,
  selectCurrentBoardId,
} from "../../store/selectors/boards";
import { updateBoard } from "../../store/thunks/boards";

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

  // Modal
  const [handlerColumnId, setHandlerColumnId] = useState<number | null>(null);
  const [handlerColumn, setHandlerColumn] = useState<ColumnI | null>(null);
  const [handlerItemId, setHandlerItemId] = useState<number | null>(null);
  const [handlerItem, setHandlerItem] = useState<ItemI | null>(null);

  const [open, setOpen] = useState(false);
  const [type, setType] = useState<BoardOperations>(
    BoardOperations.EDIT_BOARD_NAME
  );

  const handleClose = () => {
    setOpen(false);
  };

  let handler = (boardName: string) => () => {
    setBoard({
      ...board,
      boardName,
    });
    setOpen(false);
  };

  // eslint-disable-next-line default-case
  switch (type) {
    case BoardOperations.ADD_COLUMN:
      handler = (columnTitle: string) => () => {
        if (board.columns) {
          setBoard({
            ...board,
            columns: [
              ...board.columns,
              { id: uuidv4(), columnTitle, items: [] },
            ],
          });
        } else {
          setBoard({
            ...board,
            columns: [{ id: uuidv4(), columnTitle, items: [] }],
          });
        }
        setOpen(false);
      };
      break;
    case BoardOperations.ADD_ITEM:
      handler = (text: string) => () => {
        if (
          board.columns &&
          handlerColumn &&
          handlerColumnId !== null &&
          board.columns[handlerColumnId].items?.length
        ) {
          const editColumn = {
            ...handlerColumn,
            items: [
              ...board.columns[handlerColumnId].items,
              { id: uuidv4(), text },
            ],
          };
          setBoard({
            ...board,
            columns: board.columns.map((b) => {
              if (b.id === editColumn.id) {
                return editColumn;
              }
              return b;
            }),
          });
        } else if (board.columns && handlerColumnId !== null && handlerColumn) {
          const editColumn = {
            ...handlerColumn,
            items: [{ id: uuidv4(), text }],
          };
          setBoard({
            ...board,
            columns: board.columns.map((b) => {
              if (b.id === editColumn.id) {
                return editColumn;
              }
              return b;
            }),
          });
        }

        setOpen(false);
      };
      break;
    case BoardOperations.EDIT_BOARD_NAME:
      handler = (boardName: string) => () => {
        setBoard({
          ...board,
          boardName,
        });
        setOpen(false);
      };
      break;
    case BoardOperations.EDIT_COLUMN_NAME:
      handler = (columnTitle: string) => () => {
        if (board.columns && handlerColumnId !== null && handlerColumn) {
          const editColumn = { ...handlerColumn, columnTitle };
          setBoard({
            ...board,
            columns: board.columns.map((b) => {
              if (b.id === editColumn.id) {
                return editColumn;
              }
              return b;
            }),
          });
        }

        setOpen(false);
      };
      break;
    case BoardOperations.EDIT_ITEM:
      handler = (itemText: string) => () => {
        if (
          board.columns &&
          handlerColumnId !== null &&
          handlerColumn &&
          handlerItem &&
          handlerItemId !== null
        ) {
          const editItem = { ...handlerItem, text: itemText };
          const editColumn = {
            ...handlerColumn,
            items: board.columns[handlerColumnId].items.map((item) => {
              if (item.id === editItem.id) {
                return editItem;
              }
              return item;
            }),
          };

          setBoard({
            ...board,
            columns: board.columns.map((b) => {
              if (b.id === editColumn.id) {
                return editColumn;
              }
              return b;
            }),
          });
        }

        setOpen(false);
      };
      break;
  }

  // click handlers

  const deleteItemHandler =
    (column: ColumnI, columnIndex: number, item: ItemI) => () => {
      setBoard({
        ...board,
        columns: board.columns?.map((col) => {
          if (col.id === column.id && board.columns) {
            const editedColumn = {
              ...column,
              items: board.columns[columnIndex].items.filter((it) => {
                if (it.id === item.id) {
                  return false;
                }
                return true;
              }),
            };
            return editedColumn;
          }
          return col;
        }),
      });
    };

  const deleteColumnHandler = (column: ColumnI) => () => {
    setBoard({
      ...board,
      columns: board.columns?.filter((col) => {
        if (col.id === column.id) {
          return false;
        }
        return true;
      }),
    });
  };

  const addColumnClickHandler = () => {
    setOpen(true);
    setType(BoardOperations.ADD_COLUMN);
  };

  const addItemClickHandler = (columnId: number, column: ColumnI) => () => {
    setOpen(true);
    setHandlerColumnId(columnId);
    setHandlerColumn(column);
    setType(BoardOperations.ADD_ITEM);
  };

  const editBoardNameClickHandler = () => {
    setOpen(true);
    setType(BoardOperations.EDIT_BOARD_NAME);
  };

  const editColumnNameClickHandler =
    (columnId: number, column: ColumnI) => () => {
      setOpen(true);
      setHandlerColumnId(columnId);
      setHandlerColumn(column);
      setType(BoardOperations.EDIT_COLUMN_NAME);
    };

  const editItemClickHandler =
    (columnIndex: number, column: ColumnI, itemIndex: number, item: ItemI) =>
    () => {
      setOpen(true);
      setHandlerColumnId(columnIndex);
      setHandlerColumn(column);
      setHandlerItemId(itemIndex);
      setHandlerItem(item);
      setType(BoardOperations.EDIT_ITEM);
    };

  if (!boardId) {
    return (
      <>
        <Navbar />
        <div className={classes.emptyBoardWrapper}>
          <Typography className={classes.title} variant="h4">
            Please, choose <Link to="/boards">board</Link>!
          </Typography>
        </div>
      </>
    );
  }

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
    if (e.currentTarget.className.includes("-column-")) {
      e.currentTarget.style.boxShadow = "0 4px 3px gray";
    }
  }

  function dragColumnLeaveHandler(e: React.DragEvent<HTMLElement>) {
    e.currentTarget.style.boxShadow = "none";
  }

  function dragColumnStartHandler(
    e: React.DragEvent<HTMLElement>,
    column: ColumnI
  ) {
    setCurrentDragColumn(column);
    setDragType(dragStartType.dragColumn);
  }

  function dragColumnEndHandler(e: React.DragEvent<HTMLElement>) {
    e.currentTarget.style.boxShadow = "none";
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
      dragType === dragStartType.dragItem
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
    }
  }

  // drag item handlers

  const [currentDragColumnOfItem, setCurrentDragColumnOfItem] =
    useState<ColumnI | null>(null);
  const [currentDragItem, setCurrentDragItem] = useState<ItemI | null>(null);

  // function dragItemOverHandler(e: React.DragEvent<HTMLElement>) {
  //   e.preventDefault();
  //   if (e.currentTarget.className.includes("-item-")) {
  //     e.currentTarget.classList.
  //   }
  // }
  //
  // function dragItemLeaveHandler(e: React.DragEvent<HTMLElement>) {
  //   e.currentTarget.style.boxShadow = "none";
  // }

  // function dragItemEndHandler(e: React.DragEvent<HTMLElement>) {
  //   e.currentTarget.style.boxShadow = "none";
  // }

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

  return (
    <>
      <Navbar />
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
                  onDragOver={(event) => dragColumnOverHandler(event)}
                  onDragLeave={(event) => dragColumnLeaveHandler(event)}
                  onDragStart={(event) => dragColumnStartHandler(event, column)}
                  onDragEnd={(event) => dragColumnEndHandler(event)}
                  onDrop={(event) => dropColumnHandler(event, column)}
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
                    onClick={deleteColumnHandler(column)}
                  />
                  <AddIcon
                    className={classes.addIcon}
                    onClick={addItemClickHandler(columnIndex, column)}
                  />
                  <div className={classes.columnContent}>
                    {column.items &&
                      column.items.map((item, itemIndex) => (
                        <div
                          draggable
                          onDragStart={(event) =>
                            dragItemStartHandler(event, column, item)
                          }
                          onDrop={(event) =>
                            dropItemHandler(event, column, item)
                          }
                          className={classes.item}
                          key={item.id}
                        >
                          {item.text}
                          <EditOutlinedIcon
                            className={classes.editItemIcon}
                            onClick={editItemClickHandler(
                              columnIndex,
                              column,
                              itemIndex,
                              item
                            )}
                          />
                          <DeleteOutlineIcon
                            className={classes.deleteItemIcon}
                            onClick={deleteItemHandler(
                              column,
                              columnIndex,
                              item
                            )}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Container>
      <BoardDialog
        open={open}
        type={type}
        handleClose={handleClose}
        handler={handler}
      />
    </>
  );
};

export default BoardPage;
