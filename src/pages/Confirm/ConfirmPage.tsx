import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import useStyles from "./style";

// eslint-disable-next-line import/prefer-default-export
export const ConfirmPage = (): JSX.Element => {
  const history = useHistory();
  const classes = useStyles();
  const handleSignIn = () => {
    history.push("/login");
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
