import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../routes";
import { RouteType } from "../types/routesType";
import useTypedSelector from "../hooks/useTypedSelector";
import { MAIN_ROUTE } from "../utils/consts";

const AppRouter: React.FC = function () {
  const userState = useTypedSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Switch>
        {userState.isAuth &&
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
