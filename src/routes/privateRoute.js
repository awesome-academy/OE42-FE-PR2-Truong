import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, token, ...restProps }) {
  return (
    <Route
      {...restProps}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
