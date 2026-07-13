import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css";

function Register(){

const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [confirmPassword,setConfirmPassword]=useState("");

const { register } = useAuth();

const navigate = useNavigate();

async function handleRegister(e){

e.preventDefault();

if(password!==confirmPassword){

alert("Passwords do not match");

return;

}

try{

await register(name,email,password);

navigate("/playlist");

}

catch{

alert("Registration Failed");

}

}

return(

<div className="auth-page">

<div className="auth-card">

<div className="auth-logo">

🎵 LoopStation

</div>

<h2 className="auth-title">

Create Account

</h2>

<p className="auth-subtitle">

Create your free LoopStation account

</p>

<form onSubmit={handleRegister}>

<input
className="auth-input"
placeholder="Full Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

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

<input
className="auth-input"
type="password"
placeholder="Confirm Password"
value={confirmPassword}
onChange={(e)=>setConfirmPassword(e.target.value)}
/>

<button
className="auth-btn"
type="submit"
>

Register

</button>

</form>

<div className="auth-footer">

Already have an account?{" "}

<Link to="/login">

Login

</Link>

</div>

</div>

</div>

);

}

export default Register;