import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";
import useStyles from "./Styles";
import ItemProps from "./types";
import { dragRefactor } from "../../helpers/DragHandlers";
import { asyncUpdateBoardAction } from "../../../../store/actions/boards";

const Item = ({
  column,
  item,
  dragItemStartHandler,
  editItemClickHandler,
  columnIndex,
  itemIndex,
  deleteItemHandler,
  board,
  boardId,
  currentDragColumnOfItem,
  currentDragItem,
}: ItemProps): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleItemDrop = (e: React.DragEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch(
      asyncUpdateBoardAction({
        board: dragRefactor(
          currentDragColumnOfItem?.id,
          column?.id,
          currentDragItem,
          item,
          board
        ),
        boardId,
      })
    );
  };

  return (
    <div
      draggable
      onDragStart={dragItemStartHandler()}
      onDrop={handleItemDrop}
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
