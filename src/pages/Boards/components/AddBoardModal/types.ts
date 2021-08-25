export interface SimpleDialogProps {
  open: boolean;
  handleClose: () => void;
  handleAdd: (boardName: string) => () => void;
}
