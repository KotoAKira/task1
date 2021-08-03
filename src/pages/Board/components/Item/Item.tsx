import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import React, { ReactElement } from "react";
import { Dispatch } from "redux";
import { Action } from "redux-actions";
import useStyles from "./Styles";
import ColumnI from "../../../../interfaces/Column";
import ItemI from "../../../../interfaces/Item";
import BoardI from "../../../../interfaces/Board";

interface ItemProps {
  column: ColumnI;
  item: ItemI;
  dragItemStartHandler: (
    event: React.DragEvent<HTMLDivElement>,
    column: ColumnI,
    item: ItemI
  ) => void;
  dropItemHandler: (
    event: React.DragEvent<HTMLDivElement>,
    column: ColumnI,
    item: ItemI
  ) => void;
  editItemClickHandler: (
    columnIndex: number,
    column: ColumnI,
    itemIndex: number,
    item: ItemI
  ) => () => void;
  columnIndex: number;
  itemIndex: number;
  deleteItemHandler: (
    column: ColumnI,
    columnIndex: number,
    item: ItemI,
    board: BoardI,
    boardId: string,
    dispatch: Dispatch<Action<{ board: BoardI; boardId: string }>>
  ) => () => void;
  board: BoardI;
  boardId: string;
  dispatch: Dispatch<Action<{ board: BoardI; boardId: string }>>;
}

const Item: ({
  column,
  item,
  dragItemStartHandler,
  dropItemHandler,
  editItemClickHandler,
  columnIndex,
  itemIndex,
  deleteItemHandler,
  board,
  boardId,
  dispatch,
}: ItemProps) => ReactElement = ({
  column,
  item,
  dragItemStartHandler,
  dropItemHandler,
  editItemClickHandler,
  columnIndex,
  itemIndex,
  deleteItemHandler,
  board,
  boardId,
  dispatch,
}: ItemProps) => {
  const classes = useStyles();
  return (
    <div
      draggable
      onDragStart={(event) => dragItemStartHandler(event, column, item)}
      onDrop={(event) => dropItemHandler(event, column, item)}
      className={classes.item}
      key={item.id}
    >
      {item.text}
      <EditOutlinedIcon
        className={classes.editItemIcon}
        onClick={editItemClickHandler(columnIndex, column, itemIndex, item)}
      />
      <DeleteOutlineIcon
        className={classes.deleteItemIcon}
        onClick={deleteItemHandler(
          column,
          columnIndex,
          item,
          board,
          boardId,
          dispatch
        )}
      />
    </div>
  );
};

export default Item;
