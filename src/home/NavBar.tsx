import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="header-nav">
      <ul>
        <li>
          <Link to="/home" className="nav-btn">
            Home
          </Link>
        </li>
        <li>
          <Link to="/home/freinds" className="nav-btn">
            Friend
          </Link>
        </li>
        <li>
          <Link to="/home/me" className="nav-btn">
            Menu
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
