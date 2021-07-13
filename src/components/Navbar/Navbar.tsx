import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import firebase from "firebase";
import { signOut } from "../../store/thunks/auth";
import useStyles from "./Styles";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(
    () =>
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      }),
    [setAuthenticated, history]
  );

  const signOutHandler = (): void => {
    dispatch(signOut(history));
  };

  const redirect =
    (path: string): (() => void) =>
    () => {
      history.push(path);
    };

  return (
    <header className={classes.header}>
      <div className={classes.wrapper}>
        <Link to="/" className={classes.logo}>
          TaskBoards
        </Link>

        <div>
          {authenticated ? (
            <>
              <Button
                className={classes.button}
                variant="outlined"
                color="primary"
                onClick={redirect("/boards")}
              >
                My boards
              </Button>
              <Button
                className={classes.button}
                variant="outlined"
                color="secondary"
                onClick={signOutHandler}
              >
                Sign out
              </Button>
            </>
          ) : (
            <Button
              className={classes.button}
              variant="outlined"
              color="primary"
              onClick={redirect("/login")}
            >
              Sign in
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
