import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <Link to="login/find">forgot password?</Link>
      <Link to="login/create">Create New Account</Link>
    </nav>
  );
};

export default Navigation;
