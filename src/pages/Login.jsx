import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css";

function Login() {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  async function handleLogin(e){

    e.preventDefault();

    try{

      await login(email,password);

      navigate("/playlist");

    }

    catch{

      alert("Invalid Email or Password");

    }

  }

  return(

    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          🎵 LoopStation
        </div>

        <h2 className="auth-title">
          Welcome Back
        </h2>

        <p className="auth-subtitle">
          Login to continue listening
        </p>

        <form onSubmit={handleLogin}>

          <input
          className="auth-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />

          <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />

          <button
          className="auth-btn"
          type="submit"
          >
          Sign In
          </button>

        </form>

        <div className="auth-footer">

          Don't have an account?{" "}

          <Link to="/register">

          Register

          </Link>

        </div>

      </div>

    </div>

  );

}

export default Login;