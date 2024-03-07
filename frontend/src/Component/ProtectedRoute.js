import React from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { Fragment } from "react";

const ProtectedRoute = ({ component: Component, token, ...rest }) => {
  return (
    <Fragment>
    <Route
      {...rest}
      render={props =>
        token ? <Component {...props} /> : <useNavigate to="/login" />
      }
    />
    </Fragment>
  );
};

export default ProtectedRoute;
