import React from "react";
import { User } from "../common/App";
import NavBar from "./NavBar";
import logo from "../image/facebook-circular-logo.png";

interface AppProps {
  userInfo: User | null;
}

const Header = ({ userInfo }: AppProps) => {
  return (
    <div>
      <img src={logo} alt="logo" width="30px" height="30px" />
      <h2>Facebook</h2>
      <div>Search</div>
      <div>Messenger</div>
      {userInfo && <NavBar userInfo={userInfo} />}
    </div>
  );
};

export default Header;
