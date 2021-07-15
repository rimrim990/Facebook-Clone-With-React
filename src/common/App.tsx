import React, { useState, useEffect } from "react";
import { authService, dbService } from "../fbase";
import AppRouter from "./AppRouter";
import userImage from "../image/free-icon-user-picture.png";
import "./App.css";

export interface User {
  uid: string;
  displayName: string;
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
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in
        const querySnapshot = await dbService
          .collection("userInfo")
          .where("uid", "==", user.uid)
          .get();
        querySnapshot.forEach((doc) => {
          const { uid, displayName, photoUrl } = doc.data();
          setUserInfo({
            uid: uid,
            displayName: displayName,
            photoUrl: photoUrl,
          });
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
    return (
      <div className="app">
        <AppRouter isLoggedIn={isLoggedIn} userInfo={userInfo} />
      </div>
    );
  } else {
    return (
      <div className="app">
        <div className="load-page">Loading</div>
      </div>
    );
  }
};

export default App;
