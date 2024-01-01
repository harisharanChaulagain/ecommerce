import React from "react";
import "./Footer.scss";
import { FaLocationArrow, FaMobileAlt, FaEnvelope } from "react-icons/fa";
import PaymentImage from "../../assets/khalti_logo.png";

const Footer = () => {
  return (
    <div className="footer-main">
      <div className="footer-content">
        <div id="about-section" className="col">
          <div className="title">About</div>
          <div className="text">
            Step into Hamro Bazar, where each purchase unfolds a distinctive
            narrative. Explore the seamless blend of tradition and modernity
            through our diverse collection, echoing the soul of Nepal. Immerse
            yourself in a cross-cultural shopping experience, uniting quality
            products with cultural opulence. Begin your quest for extraordinary
            discoveries right here at Hamro Bazar, where the past harmonizes
            with the present.
          </div>
        </div>
        <div className="col">
          <div className="title">Contact</div>
          <div className="c-item">
            <FaLocationArrow />
            <div className="text">Banepa-09, Kavre, Nepal</div>
          </div>
          <div className="c-item">
            <FaMobileAlt />
            <div className="text">Phone: 011341232</div>
          </div>
          <div className="c-item">
            <FaEnvelope />
            <div className="text">Email: hamrobazar@gmail.com</div>
          </div>
        </div>
        <div className="col">
          <div className="title">Categories</div>
          <span className="text">Headphones</span>
          <span className="text">Mobile</span>
          <span className="text">Bluetooth Speakers</span>
          <span className="text">Wireless Earbuds</span>
          <span className="text">Projectors</span>
          <span className="text">Home Theatre</span>
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
          <span className="text">© {new Date().getFullYear()} Hamro Bazar</span>
          <img
            src={PaymentImage}
            alt="payment method img"
            style={{ height: "40px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
