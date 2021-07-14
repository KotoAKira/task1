import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { BoardOperations } from "../../types/boardsType";

export interface SimpleDialogProps {
  open: boolean;
  handleClose: () => void;
  handler: (text: string) => any;
  type: BoardOperations;
}

function AddBoardDialog({
  open,
  handleClose,
  handler,
  type,
}: SimpleDialogProps) {
  const [text, setText] = useState("");
  const [disabled, setDisabled] = useState(true);

  let title: string | null = null;
  let content: string | null = null;
  let label: string | null = null;
  let button: string | null = null;

  // eslint-disable-next-line default-case
  switch (type) {
    case BoardOperations.ADD_COLUMN:
      content = "Enter a name for the column and click the Add button";
      title = "Add column";
      label = "Column name";
      button = "Add";
      break;
    case BoardOperations.ADD_ITEM:
      content = "Enter a text for the item and click the Add button";
      title = "Add Item";
      label = "Item text";
      button = "Add";
      break;
    case BoardOperations.EDIT_BOARD_NAME:
      content = "Enter a name for the board and click the Edit button";
      title = "Edit board name";
      label = "Board name";
      button = "Edit";
      break;
    case BoardOperations.EDIT_COLUMN_NAME:
      content = "Enter a name for the column and click the Edit button";
      title = "Edit column name";
      label = "Column name";
      button = "Edit";
      break;
    case BoardOperations.EDIT_ITEM:
      content = "Enter a text for the item and click the Edit button";
      title = "Edit item text";
      label = "Item text";
      button = "Edit";
      break;
  }

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
    if (e.currentTarget.value) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label={label}
          type="text"
          fullWidth
          value={text}
          onChange={changeHandler}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handler(text)} color="primary" disabled={disabled}>
          {button}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddBoardDialog;
