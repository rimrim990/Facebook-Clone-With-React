import React from "react";
import Home from "../components/Home";
import Auth from "../components/Auth";
import Navigation from "../components/Navigation";
import { User } from "../components/App";

interface AppProps {
  isLoggedIn: boolean;
  userInfo: User | null;
}

const Page = ({ isLoggedIn, userInfo }: AppProps) => {
  if (isLoggedIn && userInfo) {
    return <Home userInfo={userInfo} />;
  } else {
    return (
      <>
        <Auth />
        <Navigation />
      </>
    );
  }
};

export default Page;
