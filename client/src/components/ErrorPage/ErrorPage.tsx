import React from "react";
import { useNavigate } from "react-router";
import pageNotFound from "../../../public/page_not_found.png";
import "./ErrorPage.scss";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="error-page-container">
      <img src={pageNotFound} alt="pageNotFound" className="error-image" />
      <h4>PAGE NOT FOUND!</h4>
      <button onClick={() => navigate("/")}>GO TO HOMEPAGE</button>
    </div>
  );
};

export default ErrorPage;
