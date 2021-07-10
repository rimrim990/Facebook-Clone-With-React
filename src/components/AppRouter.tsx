import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Page from "../routes/Page";
import FindAccount from "../routes/FindAccount";
import CreateAccount from "../routes/CreateAccount";

interface AppProps {
  isLoggedIn: boolean;
}

const AppRouter = ({ isLoggedIn }: AppProps) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Page isLoggedIn={isLoggedIn} />} />
        <Route exact path="/find" component={FindAccount} />
        <Route exact path="/create" component={CreateAccount} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
