import React from "react";
import Home from "../components/Home";
import Auth from "../components/Auth";
import Navigation from "../components/Navigation";

interface AppProps {
  isLoggedIn: boolean;
}

const Page = ({ isLoggedIn }: AppProps) => {
  if (isLoggedIn) {
    return <Home />;
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
