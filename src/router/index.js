import React from "react";
import { LinkedInPopUp } from "react-linkedin-login-oauth2";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import MainLogin from "../containers/MainLogin";
import MainPage from "../containers/MainPage";
import { PrivateRoute, PrivateRouteWithoutLogin } from "./PrivateRoute";

const MainRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route path={"/linkedin"} component={LinkedInPopUp} />
        <PrivateRouteWithoutLogin path={"/login"} component={MainLogin} />
        <PrivateRoute path={"/people"} component={MainPage} exact />
        <PrivateRoute path={"/favorites"} component={MainPage} exact />
        <PrivateRoute path={"/people/:id"} component={MainPage} />
        <Route path={"*"}>
          <Redirect to={"/people"} />
        </Route>
      </Switch>
    </Router>
  );
};

export default MainRoutes;
