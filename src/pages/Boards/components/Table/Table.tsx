import React, { ReactElement, useEffect, useState } from "react";
import Filled from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase";
import useStyles from "./styles";
import AddBoardDialog from "../AddBoardModal/AddBoardModal";
import {
  loadingProcess,
  selectBoards,
} from "../../../../store/selectors/boards";
import { fetchUserName } from "../../../../services/boards";
import {
  asyncCreateBoardAction,
  asyncDeleteBoardAction,
  asyncFetchBoardsAction,
  successSetCurrentBoardAction,
} from "../../../../store/actions/boards";
import Spinner from "../../../../components/Spinner/Spinner";
import { selectUid, selectUserName } from "../../../../store/selectors/auth";

const Table = function (): ReactElement {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const boards = useSelector(selectBoards);
  const load = useSelector(loadingProcess);
  const userUid = useSelector(selectUid);
  const userName = useSelector(selectUserName);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // table
  const clickHandler = (boardId: string) => () => {
    history.push("/board");
    dispatch(successSetCurrentBoardAction(boardId));
  };

  const handleAdd = (boardName: string) => () => {
    dispatch(
      asyncCreateBoardAction({
        boardName,
        managerUid: userUid,
        managerName: userName,
      })
    );
    setOpen(false);
  };

  const deleteBoardHandler =
    (boardId: string) => (event: React.MouseEvent<React.ReactNode>) => {
      event.stopPropagation();
      dispatch(asyncDeleteBoardAction(boardId));
    };

  useEffect(() => {
    dispatch(asyncFetchBoardsAction());
  }, []);

  if (load) {
    return <Spinner />;
  }

  return (
    <>
      <table className={classes.table}>
        <tr>
          <th className={classes.th}>Name</th>
          <th className={classes.th}>Manager</th>
          <th className={classes.th}>
            <AddIcon className={classes.addIcon} onClick={handleClickOpen} />
          </th>
        </tr>
        {Object.entries(boards).map(([key, value]) => {
          if (value.managerUid === userUid) {
            return (
              <tr onClick={clickHandler(key)} key={key}>
                <td className={classes.td}>{value.boardName}</td>
                <td className={classes.td}>{value.managerName}</td>
                <td className={classes.td}>
                  <Filled onClick={deleteBoardHandler(key)} />
                </td>
              </tr>
            );
          }
          return <div key={key} />;
        })}
      </table>
      <AddBoardDialog
        open={open}
        handleClose={handleClose}
        handleAdd={handleAdd}
      />
    </>
  );
};

export default Table;
