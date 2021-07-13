import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { authService } from "../fbase";
import "./Auth.css";
import Navigation from "./Navigation";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const histroy = useHistory();

  const onChange = (event: any) => {
    const {
      target: { value, name },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await authService.signInWithEmailAndPassword(email, password);
      histroy.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="content">
        <h1 className="title">facebook</h1>
        <p className="text">
          Connect with friends and the world around you on Facebook.
        </p>
      </div>
      <form onSubmit={onSubmit} className="auth-form">
        <input
          className="auth-input"
          type="email"
          name="email"
          onChange={onChange}
          value={email}
          placeholder="Email"
          required
        />
        <input
          className="auth-input"
          type="password"
          name="password"
          onChange={onChange}
          value={password}
          placeholder="Password"
          required
        />
        <div className="error">{error}</div>
        <input
          className="login-btn"
          type="submit"
          name="login"
          value="Log In"
        />
        <Navigation />
      </form>
    </div>
  );
};
export default Auth;
