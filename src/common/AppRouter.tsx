import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Page from "./Page";
import FindAccount from "../auth/FindAccount";
import CreateAccount from "../auth/CreateAccount";
import { User } from "./App";
import Auth from "../auth/Auth";
import Navigation from "../auth/Navigation";
import Home from "../home/Home";
import Header from "../home/Header";
import AboutMe from "../home/AboutMe";

interface AppProps {
  isLoggedIn: boolean;
  userInfo: User;
}

const AppRouter = ({ isLoggedIn, userInfo }: AppProps) => {
  return (
    <Router>
      <Route path="/home" render={() => <Header userInfo={userInfo} />} />
      <Switch>
        <Route exact path="/" render={() => <Page isLoggedIn={isLoggedIn} />} />
        <Route
          exact
          path="/login"
          render={() => (
            <>
              <Auth />
              <Navigation />
            </>
          )}
        />
        <Route exact path="/login/find" component={FindAccount} />
        <Route exact path="/login/create" component={CreateAccount} />

        <Route exact path="/home" render={() => <Home userInfo={userInfo} />} />
        <Route
          exact
          path="/home/me"
          render={() => <AboutMe userInfo={userInfo} />}
        />
      </Switch>
    </Router>
  );
};

export default AppRouter;
