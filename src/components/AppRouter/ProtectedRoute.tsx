import React from "react";
import { Redirect, Route } from "react-router-dom";

// eslint-disable-next-line import/prefer-default-export
export const ProtectedRoute = ({
  component: Component,
  authenticated,
  ...rest
}: any) => (
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
