import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../fbase";

interface AppProps {
  history: any;
}

const CreateAccount = ({ history }: AppProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await authService.createUserWithEmailAndPassword(email, password);
      console.log("Log In Success!");
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
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <h2>Sign Up</h2>
        <p>It's quick and easy!</p>
      </div>
      <input
        type="email"
        name="email"
        onChange={onChange}
        value={email}
        placeholder="Email or Phone Number"
        required
      />
      <input
        type="password"
        name="password"
        onChange={onChange}
        value={password}
        placeholder="Password"
        required
      />
      <div>{error}</div>
      <Link to="/">Cancel</Link>
      <input type="submit" value="Sign Up" />
    </form>
  );
};

export default CreateAccount;
