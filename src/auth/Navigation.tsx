import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  return (
    <nav>
      <Link to="login/find" className="auth-find-link">
        Forgot password?
      </Link>
      <div className="line"></div>
      <Link to="login/create" className="auth-create-link">
        Create New Account
      </Link>
    </nav>
  );
};

export default Navigation;
