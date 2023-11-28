import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useUserLogin } from "../../../api/PostApi";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data: loginData }: any = useUserLogin();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      await loginData.mutateAsync(formData);
    } catch (error) {
      console.error("Login error:", error);
    }
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
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="password-toggle" onClick={handleTogglePassword}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <button onClick={handleLogin}>Log In</button>
      </div>
    </div>
  );
};

export default Login;
