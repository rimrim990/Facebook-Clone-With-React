import React from "react";
import { Link } from "react-router-dom";
import { User } from "../common/App";
import NavBar from "./NavBar";
import "./Header.css";

interface AppProps {
  userInfo: User | null;
}

const Header = ({ userInfo }: AppProps) => {
  return (
    <>
      <header className="header">
        <Link to="/home" className="link">
          <h2 className="header-title">facebook</h2>
        </Link>
      </header>
      {userInfo && <NavBar userInfo={userInfo} />}
    </>
  );
};

export default Header;
