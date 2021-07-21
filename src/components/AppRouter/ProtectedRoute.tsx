import React, { ReactElement } from "react";
import { Redirect, Route } from "react-router-dom";

// eslint-disable-next-line
export const ProtectedRoute = ({
  component: Component,
  authenticated,
  ...rest
}: any): ReactElement => (
  <Route
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    {...rest}
    render={(props) => {
      if (authenticated) {
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <Component {...props} />;
      }
      return (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      );
    }}
  />
);
