import React, { ReactElement, useEffect, useState } from "react";
import Filled from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase";
import useStyles from "./Styles";
import AddBoardDialog from "../AddBoardModal/AddBoardModal";
import { loadingProcess, selectBoards } from "../../store/selectors/boards";
import { fetchUserName } from "../../services/boards";
import Spinner from "../Spinner/Spinner";
import {
  createBoard,
  deleteBoard,
  fetchBoards,
} from "../../store/thunks/boards";
import { successSetCurrentBoardAction } from "../../store/actions/boards";

const Table = function (): ReactElement {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const boards = useSelector(selectBoards);
  const load = useSelector(loadingProcess);
  const [userName, setUserName] = useState("");
  const [userUid, setUserUid] = useState("");
  // modal
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
    dispatch(createBoard(boardName, userUid, userName));
    setOpen(false);
  };

  const deleteBoardHandler =
    (boardId: string) => (event: React.MouseEvent<React.ReactNode>) => {
      event.stopPropagation();
      dispatch(deleteBoard(boardId));
    };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserUid(user.uid);
        fetchUserName().then((e) => {
          setUserName(e.val().name.concat(" ", e.val().secondName));
        });
      }
    });
    dispatch(fetchBoards());
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
          return <div />;
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
