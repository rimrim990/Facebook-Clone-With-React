import React, { useState, useEffect } from "react";
import { authService } from "../fbase";
import AppRouter from "./AppRouter";

export interface User {
  uid: string;
  displayName: string | null;
  photoUrl: string | null;
}

export interface FeedObj {
  creator: string;
  createdAt: number;
  photoUrl: string | null;
  content: string;
}

const App = () => {
  const [init, setInit] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setUserInfo({
          uid: user.uid,
          // default user name
          displayName: "fb user",
          photoUrl: user.photoURL,
        });
        setIsLoggedIn(true);
      } else {
        // User is signed out
        setUserInfo(null);
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  if (init) {
    return <AppRouter isLoggedIn={isLoggedIn} userInfo={userInfo} />;
  } else {
    return <div>Initializing...</div>;
  }
};

export default App;
