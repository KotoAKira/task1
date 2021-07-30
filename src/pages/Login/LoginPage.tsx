import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Links from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Link, useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { selectLoginError } from "../../store/selectors/auth";
import { asyncSigningInAction } from "../../store/actions/auth";

const LoginPage: React.FC = function () {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const loginError = useSelector(selectLoginError);

  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");

  // обработчики input'ов
  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
  };

  // обработчик кнопки
  const buttonHandler = (event: React.FormEvent): void => {
    event.preventDefault();
    dispatch(asyncSigningInAction({ email, password: pass, history }));
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={emailHandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={pass}
            onChange={passwordHandler}
          />
          {loginError && (
            <Grid item xs={12}>
              <Alert severity="error">{loginError}</Alert>
            </Grid>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={buttonHandler}
          >
            Sign in
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/registration">
                <Links variant="body2">
                  Don&apos;t have an account? Sign Up
                </Links>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default LoginPage;
