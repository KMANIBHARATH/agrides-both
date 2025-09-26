import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:9001/api/user/all");
      if (!response.ok) throw new Error("Failed to fetch users");

      const users = await response.json();

      // normalize inputs
      const enteredUsername = username.trim().toLowerCase();
      const enteredEmail = email.trim().toLowerCase();

      // find matching user (support both "username" and "name")
      const user = users.find(
        (u) =>
          (u.username?.toLowerCase() === enteredUsername ||
            u.name?.toLowerCase() === enteredUsername) &&
          u.email?.toLowerCase() === enteredEmail
      );

      if (user) {
        setMessage("✅ Login Successful!");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", user.id);
        setTimeout(() => navigate("/ride-confirmation"), 1200);
      } else {
        setMessage("❌ Invalid username or email.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("❌ Server error. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Login to continue your ride</p>

        {/* Username */}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        {/* Remember me */}
        <div className="options-row">
          <label className="remember-me">
            <input type="checkbox" /> Remember me
          </label>
        </div>

        {/* Login button */}
        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        {message && <p className="login-message">{message}</p>}

        <p className="signup-link">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
