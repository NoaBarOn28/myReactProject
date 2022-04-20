import { useSelector } from "react-redux";
import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AuthGuardRoute = ({ component: Component, ...rest }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const userData = useSelector((state) => state.auth.userData);

  const location = useLocation();
  const [fromPage, setFormPage] = useState(location.pathname);

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn === true && userData.biz === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/onlybizpermitted",
              state: { fromPage },
            }}
          />
        )
      }
    ></Route>
  );
};

export default AuthGuardRoute;
