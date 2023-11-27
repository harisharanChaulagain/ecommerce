import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="login-main">
      <div className="top-section">
        <div>Welcome to Hamro Bazar! Please Login</div>
        <div>
          New member?{" "}
          <span onClick={() => navigate("/register")}>Register</span> here.
        </div>
      </div>
      <div className="input-fields">
        <div>
          <label>Email:</label>
          <input type="email" />
        </div>
        <div>
          <label>Password:</label>
          <input type={showPassword ? "text" : "password"} />
          <div className="password-toggle" onClick={handleTogglePassword}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <button>Log In</button>
      </div>
    </div>
  );
};

export default Login;
