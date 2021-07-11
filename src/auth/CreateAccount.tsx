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
      <input
        type="text"
        name="name"
        onChange={onChange}
        value={name}
        placeholder="name"
        required
      />
      <div>{error}</div>
      <Link to="/login">Cancel</Link>
      <input type="submit" value="Sign Up" />
    </form>
  );
};

export default CreateAccount;
