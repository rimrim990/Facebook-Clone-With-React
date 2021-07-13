import React from "react";
import { Link } from "react-router-dom";
import { User } from "../common/App";
import "./NavBar.css";
import home from "../image/facebook-home.png";
import friend from "../image/facebook-friend.png";
import menu from "../image/facebook-menu.png";

interface AppProps {
  userInfo: User;
}

const NavBar = ({ userInfo }: AppProps) => {
  return (
    <nav className="header-nav">
      <ul>
        <li>
          <Link to="/home" className="nav-btn">
            <img src={home} alt="home" width="50px" height="50px" />
          </Link>
        </li>
        <li>
          <Link to="/home/freinds" className="nav-btn">
            <img src={friend} alt="friend" width="50px" height="50px" />
          </Link>
        </li>
        <li>
          <Link to="/home/me" className="nav-btn">
            <img src={menu} alt="menu" width="50px" height="50px" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
