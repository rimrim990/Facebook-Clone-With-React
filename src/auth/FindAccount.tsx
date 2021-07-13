import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { authService } from "../fbase";
import "./FindAccount.css";

const FindAccount = () => {
  const history = useHistory();
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setEmail(value);
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const confirmFlag = window.confirm("Do you want to send an email?");
      if (confirmFlag) {
        await authService.sendPasswordResetEmail(email);
        history.push("/login");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <header className="header">
        <Link to="/login" className="link">
          facebook
        </Link>
      </header>
      <div className="auth-page">
        <form onSubmit={onSubmit} className="auth-form">
          <h2 className="find-auth-title">Find Your Account!</h2>
          <p className="find-auth-text">
            Please enter your email to search for your account.
          </p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={onChange}
            required
            className="auth-input"
          />
          <div className="error">{error}</div>
          <div className="line"></div>
          <input type="submit" className="submit-btn" value="Send" />
          <Link to="/login" className="cancel-btn">
            Cancel
          </Link>
        </form>
      </div>
    </>
  );
};

export default FindAccount;
