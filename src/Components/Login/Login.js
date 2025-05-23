import React, { useState } from 'react';
import "./Login.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginUser } from '../../Actions/User'; // Adjust path as needed

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  return (
    <div className="login">
      <form className="loginForm" onSubmit={loginHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>Social App</Typography>
        
        <input
          type="email"
          placeholder="Enter the email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter the password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link to="/forgot/password">
          <Typography>Forgot Password</Typography>
        </Link>

        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>

        <Link to="/register">
          <Typography>Register</Typography>
        </Link>
      </form>
    </div>
  );
};

export default Login;

