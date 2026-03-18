// frontend\admin-frontend\src\components\Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import your CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const API = "https://btmg-project.vercel.app/api"; // Base API URL

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Make POST request to backend login endpoint
    
const res = await axios.post(`${API}/admin-login`, { email, password });
      // Check response from backend
      if (res.data.success) {
        // Save session info
        sessionStorage.setItem("admin", true);
        alert("Login successful!");
        navigate("/", { replace: true });
      } else {
        alert(res.data.message || "Invalid login credentials.");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert(
        err.response?.data?.message || "Login failed. Check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-heading">Admin Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;