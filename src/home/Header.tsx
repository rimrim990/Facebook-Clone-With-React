import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import "./Header.css";
import { authService } from "../fbase";

const Header = () => {
  const onClick = async (event: any) => {
    await authService.signOut();
  };
  return (
    <>
      <header className="header">
        <Link draggable={false} to="/home" className="link">
          <h2 className="header-title">facebook</h2>
        </Link>
        <button className="logout" onClick={onClick}>
          Log Out
        </button>
      </header>
      <NavBar />
    </>
  );
};

export default Header;
