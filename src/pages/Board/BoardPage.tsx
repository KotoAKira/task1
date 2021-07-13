import React, { useState } from "react";
import { Button, Container, Typography } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddIcon from "@material-ui/icons/Add";
import Navbar from "../../components/Navbar/Navbar";
import useStyles from "./Styles";
import { BoardOperations } from "../../types/boardsType";
import BoardDialog from "../../components/BoardDialog/BoardDialog";

const BoardPage: React.FC = function () {
  const classes = useStyles();
  // Modal
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<BoardOperations>(BoardOperations.ADD_COLUMN);

  const handleClose = () => {
    setOpen(false);
  };

  // let handler = null;
  //
  // switch (type) {
  //   case BoardOperations.ADD_COLUMN:
  //     handler =
  //     break;
  //   case BoardOperations.ADD_ITEM:
  //     content = "Enter a name for the item and click the Add button";
  //     title = "Add Item";
  //     label = "Item name";
  //     button = "Add";
  //     break;
  //   case BoardOperations.EDIT_BOARD_NAME:
  //     content = "Enter a name for the board and click the Edit button";
  //     title = "Edit board name";
  //     label = "Board name";
  //     button = "Edit";
  //     break;
  //   case BoardOperations.EDIT_COLUMN_NAME:
  //     content = "Enter a name for the column and click the Edit button";
  //     title = "Edit column name";
  //     label = "Column name";
  //     button = "Edit";
  //     break;
  //   case BoardOperations.EDIT_ITEM:
  //     content = "Enter a name for the item and click the Edit button";
  //     title = "Edit item name";
  //     label = "Item name";
  //     button = "Edit";
  //     break;
  // }

  const handleAddColumn = (boardName: string) => () => {
    setOpen(false);
  };

  // click handlers

  const addColumnClickHandler = () => {
    setOpen(true);
    setType(BoardOperations.ADD_COLUMN);
  };

  const addItemClickHandler = () => {
    setOpen(true);
    setType(BoardOperations.ADD_ITEM);
  };

  const editBoardNameClickHandler = () => {
    setOpen(true);
    setType(BoardOperations.EDIT_BOARD_NAME);
  };

  const editColumnNameClickHandler = () => {
    setOpen(true);
    setType(BoardOperations.EDIT_COLUMN_NAME);
  };

  const editItemClickHandler = () => {
    setOpen(true);
    setType(BoardOperations.EDIT_ITEM);
  };

  return (
    <>
      <Navbar />
      <Container>
        <div>
          <div className={classes.wrapper}>
            <Typography variant="h4" className={classes.title}>
              Board name
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
            <div draggable className={classes.column}>
              <div className={classes.columnTitle}>
                Title over big title gym board
              </div>
              <EditOutlinedIcon
                className={classes.editColumnIcon}
                onClick={editColumnNameClickHandler}
              />
              <DeleteOutlineIcon className={classes.deleteColumnIcon} />
              <AddIcon
                className={classes.addIcon}
                onClick={addItemClickHandler}
              />
              <div className={classes.columnContent}>
                <div draggable className={classes.item}>
                  Обычный текст карточки
                  <EditOutlinedIcon
                    className={classes.editItemIcon}
                    onClick={editItemClickHandler}
                  />
                  <DeleteOutlineIcon className={classes.deleteItemIcon} />
                </div>
                <div draggable className={classes.item}>
                  card text card text card text card text card text card text
                  card text card text card text card text card text card text
                  <EditOutlinedIcon
                    className={classes.editItemIcon}
                    onClick={editItemClickHandler}
                  />
                  <DeleteOutlineIcon className={classes.deleteItemIcon} />
                </div>
                <div draggable className={classes.item}>
                  text card text card text card text card text card text
                  <EditOutlinedIcon
                    className={classes.editItemIcon}
                    onClick={editItemClickHandler}
                  />
                  <DeleteOutlineIcon className={classes.deleteItemIcon} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <BoardDialog
        open={open}
        type={type}
        handleClose={handleClose}
        handler={handleAddColumn}
      />
    </>
  );
};

export default BoardPage;
