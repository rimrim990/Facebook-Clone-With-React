import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Page from "../routes/Page";
import FindAccount from "../routes/FindAccount";
import CreateAccount from "../routes/CreateAccount";
import { User } from "./App";
import Auth from "./Auth";
import Navigation from "./Navigation";
import Home from "./Home";

interface AppProps {
  isLoggedIn: boolean;
  userInfo: User | null;
}

const AppRouter = ({ isLoggedIn, userInfo }: AppProps) => {
  return (
    <Router>
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
        <Route exact path="/home" render={() => <Home userInfo={userInfo} />} />
        <Route exact path="/login/find" component={FindAccount} />
        <Route exact path="/login/create" component={CreateAccount} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
