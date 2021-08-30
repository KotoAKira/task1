import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import ItemProps from "./types";
import { asyncUpdateBoardAction } from "../../../../store/actions/boards";
import dropItem from "../../helpers/drag/DropItem";
import deleteItem from "../../helpers/delete/DeleteItem";
import { showModal } from "../../../../store/actions/modal";
import { editItemContent } from "../../consts/consts";
import editItem from "../../helpers/dialog/EditItem";

const Item = ({
  column,
  item,
  board,
  boardId,
  currentDragColumnOfItem,
  currentDragItem,
  setCurrentDragColumnOfItem,
  setCurrentDragItem,
}: ItemProps): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleItemDragStart = (e: React.DragEvent<HTMLElement>) => {
    e.stopPropagation();
    e.dataTransfer.setData("text/plain", "item");
    setCurrentDragColumnOfItem(column);
    setCurrentDragItem(item);
  };

  const handleItemDrop = (e: React.DragEvent<HTMLElement>) => {
    e.stopPropagation();
    if (e.dataTransfer.getData("text") === "item")
      dispatch(
        asyncUpdateBoardAction({
          board: dropItem(
            currentDragColumnOfItem.id,
            column.id,
            currentDragItem,
            item,
            board
          ),
          boardId,
        })
      );
  };

  const handleDeleteItem = () => {
    dispatch(
      asyncUpdateBoardAction({
        board: deleteItem(column.id, item.id, board),
        boardId,
      })
    );
  };

  const editItemHandler = (itemText: string) => {
    dispatch(
      asyncUpdateBoardAction({
        board: editItem(board, column.id, item.id, itemText),
        boardId,
      })
    );
  };
  const editItemClickHandler = () => {
    dispatch(
      showModal({
        mainContent: editItemContent,
        handler: editItemHandler,
      })
    );
  };

  return (
    <div
      draggable
      onDragStart={handleItemDragStart}
      onDrop={handleItemDrop}
      className={classes.item}
      key={item.id}
    >
      {item.text}
      <EditOutlinedIcon
        className={classes.editItemIcon}
        onClick={editItemClickHandler}
      />
      <DeleteOutlineIcon
        className={classes.deleteItemIcon}
        onClick={handleDeleteItem}
      />
    </div>
  );
};

export default Item;
