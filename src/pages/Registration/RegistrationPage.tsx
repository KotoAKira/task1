import React, { useContext, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link, useHistory } from "react-router-dom";
import Links from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@material-ui/lab";
import useStyles from "./styles";
import { selectRegisterError } from "../../store/selectors/auth";
import { register } from "../../store/thunks/auth";

const RegistrationPage: React.FC = function () {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const registerError = useSelector(selectRegisterError);

  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [secondName, setSecondName] = useState<string>("");

  // обработчики input'ов
  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
  };

  const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const secondNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSecondName(event.target.value);
  };
  // обработчик кнопки
  const buttonHandler = (event: React.FormEvent): void => {
    event.preventDefault();
    dispatch(register(email, pass, name, secondName, history));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={name}
                onChange={nameHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={secondName}
                onChange={secondNameHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={emailHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
            {registerError && (
              <Grid item xs={12}>
                <Alert severity="error">{registerError}</Alert>
              </Grid>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={buttonHandler}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">
                <Links href="#" variant="body2">
                  Already have an account? Sign in
                </Links>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default RegistrationPage;
