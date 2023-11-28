import React, { useState } from "react";
import "./SIgnup.scss";
import { useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useUserCreate } from "../../../api/PostApi";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { mutation } = useUserCreate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      dob: "",
      password: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),
      email: Yup.string().required("Email is required"),
      dob: Yup.string().required("DOB is required"),
      password: Yup.string().required("Password is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("fullName", values.fullName);
      formData.append("email", values.email);
      formData.append("dob", values.dob);
      formData.append("password", values.password);
      try {
        await mutation.mutateAsync(formData);
        toast.success("User created successfully!");
        resetForm();
      } catch (error) {
        console.error("Signup error:", error);
      }
    },
  });

  return (
    <div className="signup-main">
      <div className="top-section">
        <div>Create your Hamro Bazar Account</div>
        <div>
          Already member? <span onClick={() => navigate("/login")}>Login</span>{" "}
          here.
        </div>
      </div>
      <form className="form-fields" onSubmit={formik.handleSubmit}>
        <div className="input-fields">
          <div>
            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className="input-fields">
          <div>
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formik.values.dob}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <label>Password</label>
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
        </div>
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
