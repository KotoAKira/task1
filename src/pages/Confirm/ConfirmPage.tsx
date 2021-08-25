import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { asyncSigningOutAction } from "../../store/actions/auth";

// eslint-disable-next-line import/prefer-default-export
export const ConfirmPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const handleSignIn = () => {
    dispatch(asyncSigningOutAction(history));
  };
  return (
    <div className={classes.container}>
      <Typography component="h1" className={classes.text} variant="h5">
        Please, confirm your email!
      </Typography>
      <div>
        <Button
          onClick={handleSignIn}
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
