import firebase from "firebase";
import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  BrowserRouter,
  useLocation,
} from "react-router-dom";
import { privateRoutes, publicRoutes } from "../routes";
import { RouteType } from "../types/routesType";
import { MAIN_ROUTE } from "../utils/consts";
import { ConfirmPage } from "../pages/Confirm/ConfirmPage";
import Spinner from "./Spinner/Spinner";
import Navbar from "./Navbar/Navbar";

const AppRouter: React.FC = function () {
  const history = useHistory();
  const [authentication, setAuthState] = useState({
    authenticated: false,
    initializing: true,
    shouldConfirm: false,
  });
  useEffect(
    () =>
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          if (user.emailVerified) {
            setAuthState({
              authenticated: true,
              initializing: false,
              shouldConfirm: false,
            });
            console.log("verified");
          } else {
            setAuthState({
              authenticated: false,
              initializing: false,
              shouldConfirm: true,
            });
            console.log("not verified");
          }
        } else {
          setAuthState({
            authenticated: false,
            initializing: false,
            shouldConfirm: false,
          });
        }
      }),
    [setAuthState, history]
  );

  if (authentication.initializing) {
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
