import React from "react";
import { Route, Redirect } from "react-router-dom";
import LocalStorage from "../utils/localStorage";

export const PrivateRoute = ({ path, component }) => {
  const auth = LocalStorage.getUserInfo();
  if (auth.expiration_time && auth.expiration_time > Date.now()) {
    return <Route path={path} component={component} />;
  } else {
    LocalStorage.setUserInfo({});
    return <Redirect to={"/login"} />;
  }
};

export const PrivateRouteWithoutLogin = ({ path, component }) => {
  const auth = LocalStorage.getUserInfo();
  if (!auth.expiration_time || auth.expiration_time < Date.now()) {
    LocalStorage.setUserInfo({});
    return <Route path={path} component={component} />;
  } else {
    return <Redirect to={"/people"} />;
  }
};
