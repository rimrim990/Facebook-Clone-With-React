import React, { useState, useEffect } from "react";
import { authService } from "../fbase";
import AppRouter from "./AppRouter";

interface User {
  creator: string;
  createdAt: number;
  displayName: string | null;
  photoUrl: string | null;
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
          creator: user.uid,
          createdAt: Date.now(),
          displayName: user.displayName,
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
    return <AppRouter isLoggedIn={isLoggedIn} />;
  } else {
    return <div>Initializing...</div>;
  }
};

export default App;
