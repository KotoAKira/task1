import React, { ReactElement, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import selectModal from "../../../../store/selectors/modal";
import { hideModal } from "../../../../store/actions/modal";

function AddBoardDialog(): ReactElement {
  const modal = useSelector(selectModal);

  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [disabled, setDisabled] = useState(true);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setText(value);
    if (value) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleClose = () => {
    dispatch(hideModal());
  };

  const buttonHandler = () => {
    if (modal) {
      modal.handler(text);
      dispatch(hideModal());
      setText("");
    }
  };

  return (
    <Dialog
      open={!!modal}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {modal?.mainContent.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{modal?.mainContent.content}</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label={modal?.mainContent.label}
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
          {modal?.mainContent.button}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddBoardDialog;
