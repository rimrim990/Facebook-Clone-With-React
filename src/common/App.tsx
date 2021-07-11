import React, { useState, useEffect } from "react";
import { authService } from "../fbase";
import AppRouter from "./AppRouter";
import userImage from "../image/free-icon-user-picture.png";

export interface User {
  uid: string;
  displayName: string | null;
  photoUrl: string;
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
        let photoUrl: string | null = user.photoURL;

        // set default user image
        if (photoUrl === null) {
          photoUrl = userImage;
        }

        setUserInfo({
          uid: user.uid,
          displayName: user.displayName,
          photoUrl: photoUrl,
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

  if (init && userInfo) {
    return <AppRouter isLoggedIn={isLoggedIn} userInfo={userInfo} />;
  } else {
    return <div>Loading...</div>;
  }
};

export default App;
