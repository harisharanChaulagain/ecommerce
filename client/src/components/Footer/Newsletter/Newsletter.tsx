import React from "react";
import "./Newsletter.scss";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Newsletter = () => {
  return (
    <div className="newsletter-main">
      <div className="newsletter-content">
        <div className="small-text">Newsletter</div>
        <span className="big-text">Sign up for latest updates and offers</span>
        <div className="form">
          <input type="text" placeholder="Email Address" />
          <button>Subscribe</button>
        </div>
        <div className="text">
          Will be used in accordance with our Privacy Policy
        </div>
        <div className="social-icons">
          <a
            href="https://www.facebook.com/harisharan.chaulagain.733/"
            target="_blank"
            className="icon"
          >
            <FaFacebookF size={14} />
          </a>
          <a
            href="https://twitter.com/Harisharan1221"
            target="_blank"
            className="icon"
          >
            <FaTwitter size={14} />
          </a>
          <a
            href="https://www.instagram.com/harisharanchaulagai/"
            target="_blank"
            className="icon"
          >
            <FaInstagram size={14} />
          </a>
          <a
            href="https://www.linkedin.com/in/hari-sharan-chaulagain-592b4225b/"
            target="_blank"
            className="icon"
          >
            <FaLinkedinIn size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
