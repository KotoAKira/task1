import React, { ReactElement } from "react";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch } from "react-redux";
import Item from "../Item/Item";
import ColumnProps from "./types";
import useStyles from "./styles";
import { asyncUpdateBoardAction } from "../../../../store/actions/boards";
import dropColumn from "../../helpers/drag/DropColumn";
import dropItemInColumn from "../../helpers/drag/DropItemInColumn";
import deleteColumn from "../../helpers/delete/DeleteColumn";
import addItem from "../../helpers/dialog/AddItem";
import { showModal } from "../../../../store/actions/modal";
import { addItemContent, editColumnNameContent } from "../../consts/consts";
import editColumnName from "../../helpers/dialog/EditColumnName";

const Column = ({
  column,
  board,
  boardId,
  currentDragColumnOfItem,
  currentDragItem,
  currentDragColumn,
  setCurrentDragColumnOfItem,
  setCurrentDragItem,
  setCurrentDragColumn,
}: ColumnProps): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleColumnDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const handleColumnDragStart = (e: React.DragEvent<HTMLElement>) => {
    e.dataTransfer.setData("text/plain", "column");
    setCurrentDragColumn(column);
  };

  const handleColumnDrop = (e: React.DragEvent<HTMLElement>) => {
    if (e.dataTransfer.getData("text") === "column") {
      dispatch(
        asyncUpdateBoardAction({
          board: dropColumn(column.id, currentDragColumn.id, board),
          boardId,
        })
      );
    } else {
      dispatch(
        asyncUpdateBoardAction({
          board: dropItemInColumn(
            currentDragColumnOfItem.id,
            column.id,
            currentDragItem,
            board
          ),
          boardId,
        })
      );
    }
  };

  const handleDeleteColumn = () => {
    dispatch(
      asyncUpdateBoardAction({
        board: deleteColumn(column.id, board),
        boardId,
      })
    );
  };

  const addItemHandler = (columnId: string) => (text: string) => {
    dispatch(
      asyncUpdateBoardAction({
        board: addItem(board, columnId, text),
        boardId,
      })
    );
  };
  const addItemClickHandler = () => {
    dispatch(
      showModal({
        mainContent: addItemContent,
        handler: addItemHandler(column.id),
      })
    );
  };

  const editColumnNameHandler = (columnTitle: string) => {
    dispatch(
      asyncUpdateBoardAction({
        board: editColumnName(board, column.id, columnTitle),
        boardId,
      })
    );
  };
  const editColumnNameClickHandler = () => {
    dispatch(
      showModal({
        mainContent: editColumnNameContent,
        handler: editColumnNameHandler,
      })
    );
  };

  return (
    <div
      draggable
      onDragStart={handleColumnDragStart}
      onDrop={handleColumnDrop}
      onDragOver={handleColumnDragOver}
      className={classes.column}
      key={column.id}
    >
      <div className={classes.columnTitle}>{column.columnTitle}</div>
      <EditOutlinedIcon
        className={classes.editColumnIcon}
        onClick={editColumnNameClickHandler}
      />
      <DeleteOutlineIcon
        className={classes.deleteColumnIcon}
        onClick={handleDeleteColumn}
      />
      <AddIcon className={classes.addIcon} onClick={addItemClickHandler} />
      <div className={classes.columnContent}>
        {column.items &&
          column.items.map((item) => (
            <Item
              key={item.id}
              column={column}
              item={item}
              board={board}
              boardId={boardId}
              currentDragColumnOfItem={currentDragColumnOfItem}
              currentDragItem={currentDragItem}
              setCurrentDragColumnOfItem={setCurrentDragColumnOfItem}
              setCurrentDragItem={setCurrentDragItem}
            />
          ))}
      </div>
    </div>
  );
};

export default Column;
