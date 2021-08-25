import React, { ReactElement, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { SimpleDialogProps } from "./types";

function AddBoardDialog({
  open,
  handleClose,
  handleAdd,
}: SimpleDialogProps): ReactElement {
  const [boardName, setBoardName] = useState("");
  const [disabled, setDisabled] = useState(true);
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardName(e.currentTarget.value);
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
      <DialogTitle id="form-dialog-title">Add board</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter the name of the board and click on the Create button to create a
          new board
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Board Name"
          type="text"
          fullWidth
          value={boardName}
          onChange={changeHandler}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleAdd(boardName)}
          color="primary"
          disabled={disabled}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddBoardDialog;
