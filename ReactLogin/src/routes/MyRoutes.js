import React from "react";
import { Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export default function MyRoutes({ component: Component, isClosed, ...rest }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isClosed && !isLoggedIn) {
    return (
      <Navigate
        to={{ pathname: "/login", state: { prevPath: rest.location.pathname } }}
      />
    );
  }
  return <Route {...rest} element={<Component />} />;
}

MyRoutes.defaultProps = {
  isClosed: false,
};

MyRoutes.propTypes = {
  component: PropTypes.oneOfType([PropTypes.elementType, PropTypes.func])
    .isRequired,
  isClosed: PropTypes.bool,
};
