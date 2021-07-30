import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import Button from "@material-ui/core/Button";
import useStyles from "./Styles";
import { selectAuthenticated } from "../../store/selectors/auth";
import { asyncSigningOutAction } from "../../store/actions/auth";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const authenticated = useSelector(selectAuthenticated);

  const signOutHandler = (): void => {
    dispatch(asyncSigningOutAction());
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
