import React, { useState } from "react";
import "./AdminLogin.scss";
import { useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAdminLogin } from "../../../api/PostApi";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { mutation } = useAdminLogin();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("username is required"),
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
      formData.append("username", values.username);
      formData.append("password", values.password);

      try {
        const response = await mutation.mutateAsync(formData);

        if (response?.status === 200) {
          toast.success(response.data.message);
          resetForm();
          navigate("/");
          window.scrollTo(0, 0);
          localStorage.setItem("isLogin", "true");
        } else {
          toast.error("An unexpected error occurred");
        }
      } catch (error: any) {}
    },
  });

  return (
    <div className="login-main-admin">
      <div className="top-section">Hello Admin!</div>
      <form className="input-fields" onSubmit={formik.handleSubmit}>
        <div>
          <label>User Name:</label>
          <input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="error">{formik.errors.username}</div>
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
        <button className="login-btn" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
