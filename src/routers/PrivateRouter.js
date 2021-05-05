import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router";

export const PrivateRouter = ({ isAuth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/auth/login" />
      }
    />
  );
};

PrivateRouter.prototypes = {
  isAuth: PropTypes.bool.isRequired,
};
