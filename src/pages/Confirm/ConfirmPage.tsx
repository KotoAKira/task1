import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { signOut } from "../../store/thunks/auth";
import useStyles from "./style";

// eslint-disable-next-line import/prefer-default-export
export const ConfirmPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const handleSignOut = () => {
    dispatch(signOut(history));
  };
  return (
    <div className={classes.container}>
      <Typography component="h1" className={classes.text} variant="h5">
        Please, confirm your email!
      </Typography>
      <div>
        <Button
          onClick={handleSignOut}
          size="small"
          variant="outlined"
          color="primary"
        >
          Sign in
        </Button>
      </div>
    </div>
  );
};
