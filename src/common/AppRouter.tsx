import React, { useState, useEffect } from "react";
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
import { dbService } from "../fbase";

interface AppProps {
  isLoggedIn: boolean;
  userInfo: User | null;
}

const AppRouter = ({ isLoggedIn, userInfo }: AppProps) => {
  const [user, setUser] = useState<any>(userInfo);
  const getUserInfo = async () => {
    if (userInfo) {
      dbService
        .collection("userInfo")
        .where("uid", "==", userInfo.uid)
        .onSnapshot((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            ...doc.data(),
          }));
          setUser(data[0]);
        });
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Router>
      <Route path="/home" render={() => <Header />} />
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
        <Route exact path="/home" render={() => <Home userInfo={user} />} />
        {userInfo && (
          <Route
            exact
            path="/home/me"
            render={() => <AboutMe userInfo={user} />}
          />
        )}
      </Switch>
      <Route path="/" component={Footer} />
    </Router>
  );
};

export default AppRouter;
