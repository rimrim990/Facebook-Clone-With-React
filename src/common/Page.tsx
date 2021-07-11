import React from "react";
import { useHistory } from "react-router-dom";

interface AppProps {
  isLoggedIn: boolean;
}

const Page = ({ isLoggedIn }: AppProps) => {
  const history = useHistory();

  if (isLoggedIn) {
    history.push("/home");
    return <></>;
  } else {
    history.push("/login");
    return <></>;
  }
};

export default Page;
