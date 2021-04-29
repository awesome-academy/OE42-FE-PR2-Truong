import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { LOGIN_PAGE_PATH } from "../constants/routes";

function PrivateRoute({ component: Component, ...restProps }) {
  const { token } = useSelector((state) => state.auth);

  return (
    <Route
      {...restProps}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: LOGIN_PAGE_PATH,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
