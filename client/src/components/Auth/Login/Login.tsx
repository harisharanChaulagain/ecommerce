import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useUserLogin } from "../../../api/PostApi";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { mutation } = useUserLogin();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
        .required("Password is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);

      try {
        const response = await mutation.mutateAsync(formData);
        console.log("hari", response);

        if (response?.status === 200) {
          toast.success(response.data.message);
          resetForm();
          navigate("/");
          window.scrollTo(0, 0);
        } else {
          toast.error("An unexpected error occurred");
        }
      } catch (error: any) {}
    },
  });

  return (
    <div className="login-main">
      <div className="top-section">
        <div>Welcome to Hamro Bazar! Please Login</div>
        <div>
          New member?{" "}
          <span onClick={() => navigate("/register")}>Register</span> here.
        </div>
      </div>
      <form className="input-fields" onSubmit={formik.handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>
        <div>
          <label>Password:</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <div className="password-toggle" onClick={handleTogglePassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>
        <button>Log In</button>
      </form>
    </div>
  );
};

export default Login;
