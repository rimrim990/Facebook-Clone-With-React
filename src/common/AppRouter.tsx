import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Page from "./Page";
import FindAccount from "../auth/FindAccount";
import CreateAccount from "../auth/CreateAccount";
import { User } from "./App";
import Auth from "../auth/Auth";
import Home from "../home/Home";
import Header from "../home/Header";
import AboutMe from "../home/AboutMe";
import Footer from "./Footer";

interface AppProps {
  isLoggedIn: boolean;
  userInfo: User | null;
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
            </>
          )}
        />
        <Route exact path="/login/find" component={FindAccount} />
        <Route exact path="/login/create" component={CreateAccount} />

        <Route exact path="/home" render={() => <Home userInfo={userInfo} />} />
        {userInfo && (
          <Route
            exact
            path="/home/me"
            render={() => <AboutMe userInfo={userInfo} />}
          />
        )}
      </Switch>
      <Route path="/" component={Footer} />
    </Router>
  );
};

export default AppRouter;
