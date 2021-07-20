import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export interface MainContentI {
  title: string;
  content: string;
  label: string;
  button: string;
}

export interface SimpleDialogProps {
  open: boolean;
  handleClose: () => void;
  mainContent: MainContentI;
  handler: (text: string) => void;
}

function AddBoardDialog({
  open,
  handleClose,
  mainContent,
  handler,
}: SimpleDialogProps) {
  const [text, setText] = useState("");
  const [disabled, setDisabled] = useState(true);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
    if (e.currentTarget.value) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const buttonHandler = () => {
    handler(text);
    setText("");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{mainContent.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{mainContent.content}</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label={mainContent.label}
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
        <Button onClick={buttonHandler} color="primary" disabled={disabled}>
          {mainContent.button}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddBoardDialog;
