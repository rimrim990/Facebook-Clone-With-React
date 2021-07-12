import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { authService } from "../fbase";

const CreateAccount = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const user = await authService.createUserWithEmailAndPassword(
        email,
        password
      );
      if (user.user) {
        await user.user.updateProfile({
          displayName: name,
        });
      } else {
        console.log("profile update err!");
      }
      history.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const onChange = (event: any) => {
    const {
      target: { value, name },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "name") {
      setName(value);
    }
  };

  return (
    <>
      <header className="auth-header">
        <Link to="/login" className="link">
          facebook
        </Link>
      </header>
      <div className="auth-page">
        <form onSubmit={onSubmit} className="auth-form">
          <h2 className="find-auth-title">Sign Up</h2>
          <p className="find-auth-text">It's quick and easy!</p>
          <input
            type="email"
            name="email"
            onChange={onChange}
            value={email}
            placeholder="Email or Phone Number"
            required
            className="auth-input"
          />
          <input
            type="password"
            name="password"
            onChange={onChange}
            value={password}
            placeholder="Password"
            required
            className="auth-input"
          />
          <input
            type="text"
            name="name"
            onChange={onChange}
            value={name}
            placeholder="name"
            className="auth-input"
            required
          />
          <div className="error">{error}</div>
          <div className="line"></div>
          <input type="submit" value="Sign Up" className="submit-btn" />
          <Link to="/login" className="cancel-btn">
            Cancel
          </Link>
        </form>
      </div>
    </>
  );
};

export default CreateAccount;
