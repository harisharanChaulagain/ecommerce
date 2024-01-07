import React from "react";
import "./Footer.scss";
import { FaLocationArrow, FaMobileAlt, FaEnvelope } from "react-icons/fa";
import PaymentImage from "../../assets/khalti_logo.png";
import { useCompanyDetails, useCategory } from "../../api/GetApi";
import { companyDetails } from "../Header/ProfileDetails/ProfileDetails";
import { ICategory } from "../Home/Category/Category";

const Footer = () => {
  const { data: companyData } = useCompanyDetails();
  const { data: categoryData } = useCategory();

  return (
    <>
      {companyData?.map((detail: companyDetails) => (
        <div className="footer-main" key={detail?._id}>
          <div className="footer-content">
            <div id="about-section" className="col">
              <div className="title">About</div>
              <div className="text">{detail?.description}</div>
            </div>
            <div className="col">
              <div className="title">Contact</div>
              <div className="c-item">
                <FaLocationArrow />
                <div className="text">{detail?.address}</div>
              </div>
              <div className="c-item">
                <FaMobileAlt />
                <div className="text">Phone: {detail?.phone}</div>
              </div>
              <div className="c-item">
                <FaEnvelope />
                <div className="text">Email: {detail?.email}</div>
              </div>
            </div>
            <div className="col">
              <div className="title">Categories</div>
              {categoryData?.map((category: ICategory) => (
                <span key={category?._id} className="text">
                  {category?.name}
                </span>
              ))}
            </div>
            <div className="col">
              <div className="title">Pages</div>
              <span className="text">Home</span>
              <span className="text">About</span>
              <span className="text">Privacy Policy</span>
              <span className="text">Returns</span>
              <span className="text">Terms & Conditions</span>
              <span className="text">Contact Us</span>
            </div>
          </div>
          <div className="bottom-bar">
            <div className="bottom-bar-content">
              <span className="text">
                © {new Date().getFullYear()} {detail?.name}
              </span>
              <img
                src={PaymentImage}
                alt="payment method img"
                style={{ height: "40px" }}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Footer;
