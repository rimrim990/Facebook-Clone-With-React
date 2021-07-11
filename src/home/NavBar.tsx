import React from "react";
import { Link } from "react-router-dom";
import { User } from "../common/App";

interface AppProps {
  userInfo: User;
}

const NavBar = ({ userInfo }: AppProps) => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/home/freinds">Friends</Link>
        </li>
        <li>
          <Link to="/home/me">About Me</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
