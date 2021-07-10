import React, { useState } from "react";
import { authService } from "../fbase";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div>
        <h1>facebook</h1>
        <p>Connect with friends and the world around you on Facebook.</p>
      </div>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          onChange={onChange}
          value={email}
          placeholder="Email"
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
        <input type="submit" name="login" value="Log In" />
      </form>
    </>
  );
};
export default Auth;
