import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import React, { ReactElement } from "react";
import useStyles from "./Styles";
import { BoardI, ColumnI, ItemI } from "../../types/boardsType";

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
    setBoard: React.Dispatch<BoardI>,
    board: BoardI
  ) => () => void;
  setBoard: React.Dispatch<BoardI>;
  board: BoardI;
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
  setBoard,
  board,
}: ItemProps) => ReactElement = ({
  column,
  item,
  dragItemStartHandler,
  dropItemHandler,
  editItemClickHandler,
  columnIndex,
  itemIndex,
  deleteItemHandler,
  setBoard,
  board,
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
        onClick={deleteItemHandler(column, columnIndex, item, setBoard, board)}
      />
    </div>
  );
};

export default Item;