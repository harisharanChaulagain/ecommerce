import React from "react";
import "./ProfileDetails.scss";
import { FaRegEdit } from "react-icons/fa";
import logo from "../../../../public/logo.png";
import { CgProfile } from "react-icons/cg";
import {
  FaLocationArrow,
  FaMobileAlt,
  FaEnvelope,
  FaRegAddressBook,
  FaHashtag,
} from "react-icons/fa";

const ProfileDetails = () => {
  return (
    <div className="profile-main">
      <div className="title">Profile</div>
      <hr />
      <div className="company-details">
        <div className="heading">
          <span>Company Details</span>
          <button>
            <FaRegEdit />
            <span> Edit Company Details</span>
          </button>
        </div>
        <div className="logo-section">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="items">
            <span className="name">Hamro Bazar</span>
            <span className="email">hamrobazar@gmail.com</span>
            <span className="email">Banepa-09, Kavre, Nepal</span>
          </div>
        </div>
      </div>
      <hr />
      <div className="other-details">
        <div className="top-section">
          <div className="other-heading">
            <CgProfile />
            <div>
              <div>Name</div>
              <div className="small-title">Hamro Bazar</div>
            </div>
          </div>
          <div className="other-heading">
            <FaEnvelope />
            <div>
              <div>Email</div>
              <div className="small-title">hamrobazar@gmail.com</div>
            </div>
          </div>
        </div>
        <div className="top-section">
          <div className="other-heading">
            <FaLocationArrow />
            <div>
              <div>Address</div>
              <div className="small-title">Banepa-09, Kavre, Nepal</div>
            </div>
          </div>
          <div className="other-heading">
            <FaMobileAlt />
            <div>
              <div>Phone</div>
              <div className="small-title">011341232</div>
            </div>
          </div>
        </div>
        <div className="top-section">
          <div className="other-heading">
            <FaRegAddressBook />
            <div>
              <div>Pan</div>
              <div className="small-title">53666435</div>
            </div>
          </div>
          <div className="other-heading">
            <FaHashtag />
            <div>
              <div>Footer text</div>
              <div className="small-title">
                © {new Date().getFullYear()} Hamro Bazar
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
