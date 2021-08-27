import React, { ReactElement } from "react";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddIcon from "@material-ui/icons/Add";
import { deleteColumnHandler } from "../../helpers/DeleteHandlers";
import {
  dragColumnOverHandler,
  dragColumnStartHandler,
  dragItemStartHandler,
  dropColumnHandler,
  dropItemHandler,
} from "../../helpers/DragHandlers";
import Item from "../Item/Item";
import ColumnProps from "./types";
import useStyles from "./styles";

const Column = ({
  column,
  editItemClickHandler,
  columnIndex,
  board,
  boardId,
  dispatch,
  editColumnNameClickHandler,
  addItemClickHandler,
  currentDragColumnOfItem,
  currentDragItem,
  currentDragColumn,
  dragType,
  setCurrentDragColumnOfItem,
  setCurrentDragItem,
  setDragType,
  setCurrentDragColumn,
}: ColumnProps): ReactElement => {
  const classes = useStyles();
  return (
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
      onDragOver={dragColumnOverHandler}
      className={classes.column}
      key={column.id}
    >
      <div className={classes.columnTitle}>{column.columnTitle}</div>
      <EditOutlinedIcon
        className={classes.editColumnIcon}
        onClick={editColumnNameClickHandler(columnIndex, column)}
      />
      <DeleteOutlineIcon
        className={classes.deleteColumnIcon}
        onClick={deleteColumnHandler(column, board, boardId, dispatch)}
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
  );
};

export default Column;
