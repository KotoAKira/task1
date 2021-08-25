import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import React, { ReactElement } from "react";
import useStyles from "./styles";
import ItemProps from "./types";

const Item = ({
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
}: ItemProps): ReactElement => {
  const classes = useStyles();
  return (
    <div
      draggable
      onDragStart={dragItemStartHandler()}
      onDrop={dropItemHandler()}
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
