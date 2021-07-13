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
import { privateRoutes, publicRoutes } from "../routes";
import { RouteType } from "../types/routesType";
import { MAIN_ROUTE } from "../utils/consts";
import { ConfirmPage } from "../pages/Confirm/ConfirmPage";
import Spinner from "./Spinner/Spinner";
import { selectLoginIsLoading } from "../store/selectors/auth";
import {
  authenticatingAction,
  errorAuthenticatingAction,
  successAuthenticatingAction,
} from "../store/actions/auth";

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
      <Switch>
        {authentication.shouldConfirm && (
          <Route exact path="/confirm" component={ConfirmPage} />
        )}
        {authentication.authenticated &&
          privateRoutes.map((rt: RouteType) => (
            <Route
              key={rt.path}
              path={rt.path}
              component={rt.component}
              exact
            />
          ))}
        {publicRoutes.map((rt: RouteType) => (
          <Route key={rt.path} path={rt.path} component={rt.component} exact />
        ))}
        <Redirect to={MAIN_ROUTE} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
