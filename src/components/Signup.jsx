import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profiles from "../profiles.json";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      alert("Passwords do not match");
      return;
    }

    if (profiles.some((profile) => profile.username === username)) {
      alert("Username is already taken");
      return;
    } 


    const newProfile = {
      username,
      password,
    };

    profiles.push(newProfile);

    alert("Signup successful! Please login.");
    navigate("/login");
  };

  return (
    <div className="signup-body">
      <div className="signup-page">
        <div className="form">
          <form className="signup-form" onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <button type="submit">Signup</button>
            <p className="message">
              Already registered? <Link to="/login">Login here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
