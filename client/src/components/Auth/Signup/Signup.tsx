import React, { useState } from "react";
import "./SIgnup.scss";
import { useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="signup-main">
      <div className="top-section">
        <div>Create your Hamro Bazar Account</div>
        <div>
          Already member? <span onClick={() => navigate("/login")}>Login</span>{" "}
          here.
        </div>
      </div>
      <div className="form-fields">
        <div className="input-fields">
          <div>
            <label>Full Name:</label>
            <input type="text" />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" />
          </div>
        </div>
        <div className="input-fields">
          <div>
            <label>Date of Birth:</label>
            <input type="date" />
          </div>
          <div>
            <label>Password</label>
            <input type={showPassword ? "text" : "password"} />
            <div className="password-toggle" onClick={handleTogglePassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>
        <button>Sign Up</button>
      </div>
    </div>
  );
};

export default Signup;
