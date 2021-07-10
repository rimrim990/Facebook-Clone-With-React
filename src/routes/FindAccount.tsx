import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../fbase";

interface AppProps {
  history: any;
}

const FindAccount = ({ history }: AppProps) => {
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
        history.push("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Find Your Account!</h1>
      <p>Please enter your email to search for your account.</p>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={onChange}
        required
      />
      <Link to="/">Cancel</Link>
      <input type="submit" value="Send Email" />
      <div>{error}</div>
    </form>
  );
};

export default FindAccount;
