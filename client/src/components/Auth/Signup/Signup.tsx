import React, { useState } from "react";
import "./Signup.scss";
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

      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),

      dob: Yup.string()
        .matches(
          /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
          "Invalid date format. Use MM-DD-YYYY."
        )
        .required("DOB is required"),

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
      formData.append("fullName", values.fullName);
      formData.append("email", values.email);
      formData.append("dob", values.dob);
      formData.append("password", values.password);
      try {
        await mutation.mutateAsync(formData);
        toast.success("User created successfully!");
        resetForm();
        navigate("/login");
        window.scrollTo(0, 0);
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
          <div className="mb-20 input-element">
            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
            />
            {formik.touched.fullName && formik.errors.fullName ? (
              <div className="error">{formik.errors.fullName}</div>
            ) : null}
          </div>
          <div className="mb-20 input-element">
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
        </div>
        <div className="input-fields">
          <div className="mb-20 input-element">
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formik.values.dob}
              onChange={formik.handleChange}
            />
            {formik.touched.dob && formik.errors.dob ? (
              <div className="error">{formik.errors.dob}</div>
            ) : null}
          </div>
          <div className="mb-20 input-element">
            <label>Password</label>
            <div>
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
              </div>
              <div
                style={{
                  position: "relative",
                  bottom: "27px",
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingRight: "10px",
                }}
                onClick={handleTogglePassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
