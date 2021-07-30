import firebase from "firebase";
import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  BrowserRouter,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmPage } from "../../pages/Confirm/ConfirmPage";
import Spinner from "../Spinner/Spinner";
import { selectLoginIsLoading } from "../../store/selectors/auth";
import {
  authenticatingAction,
  errorAuthenticatingAction,
  successAuthenticatingAction,
} from "../../store/actions/auth";
import Navbar from "../Navbar/Navbar";
import { ProtectedRoute } from "./ProtectedRoute";
import MainPage from "../../pages/Main/MainPage";
import BoardsPage from "../../pages/Boards/BoardsPage";
import LoginPage from "../../pages/Login/LoginPage";
import RegistrationPage from "../../pages/Registration/RegistrationPage";
import BoardPage from "../../pages/Board/BoardPage";

const AppRouter: React.FC = function () {
  const history = useHistory();
  const isLoading = useSelector(selectLoginIsLoading);
  const dispatch = useDispatch();
  const [authentication, setAuthState] = useState({
    authenticated: false,
    initializing: true,
    shouldConfirm: false,
  });
  useEffect(() => {
    dispatch(authenticatingAction());
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          setAuthState({
            authenticated: true,
            initializing: false,
            shouldConfirm: false,
          });
          dispatch(successAuthenticatingAction());
        } else {
          setAuthState({
            authenticated: false,
            initializing: false,
            shouldConfirm: true,
          });
          dispatch(errorAuthenticatingAction());
        }
      } else {
        setAuthState({
          authenticated: false,
          initializing: false,
          shouldConfirm: false,
        });
        dispatch(errorAuthenticatingAction());
      }
    });
  }, [setAuthState, history]);

  if (authentication.initializing || isLoading) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      {authentication.authenticated && !authentication.shouldConfirm && (
        <Navbar />
      )}
      <Switch>
        <Route path="/" exact component={MainPage} />
        <ProtectedRoute
          authenticated={authentication.shouldConfirm}
          exact
          path="/confirm"
          component={ConfirmPage}
        />
        <ProtectedRoute
          authenticated={authentication.authenticated}
          exact
          path="/boards"
          component={BoardsPage}
        />
        <ProtectedRoute
          authenticated={authentication.authenticated}
          exact
          path="/board"
          component={BoardPage}
        />
        <ProtectedRoute
          authenticated={!authentication.authenticated}
          exact
          path="/login"
          component={LoginPage}
        />
        <ProtectedRoute
          authenticated={!authentication.authenticated}
          exact
          path="/registration"
          component={RegistrationPage}
        />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
