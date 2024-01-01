import React from "react";
import "./ProfileDetails.scss";
import { FaRegEdit } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import {
  FaLocationArrow,
  FaMobileAlt,
  FaEnvelope,
  FaRegAddressBook,
  FaHashtag,
} from "react-icons/fa";
import { useCompanyDetails } from "../../../api/GetApi";
import { bufferToDataURL } from "../../../utils/imageUtils";

export interface companyDetails {
  name: string;
  email: string;
  address: string;
  phone: string;
  pan: string;
  logo: {
    data: Buffer;
  };
  _id: string;
}

const ProfileDetails = () => {
  const { data: companyData } = useCompanyDetails();

  return (
    <div className="profile-main">
      {companyData?.map((detail: companyDetails) => (
        <div key={detail?._id}>
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
                {detail?.logo?.data && (
                  <img
                    src={bufferToDataURL(detail?.logo?.data)}
                    alt={detail.name}
                  />
                )}
              </div>
              <div className="items">
                <span className="name">{detail?.name}</span>
                <span className="email">{detail?.email}</span>
                <span className="email">{detail?.address}</span>
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
                  <div className="small-title">{detail?.name}</div>
                </div>
              </div>
              <div className="other-heading">
                <FaEnvelope />
                <div>
                  <div>Email</div>
                  <div className="small-title">{detail?.email}</div>
                </div>
              </div>
            </div>
            <div className="top-section">
              <div className="other-heading">
                <FaLocationArrow />
                <div>
                  <div>Address</div>
                  <div className="small-title">{detail?.email}</div>
                </div>
              </div>
              <div className="other-heading">
                <FaMobileAlt />
                <div>
                  <div>Phone</div>
                  <div className="small-title">{detail?.phone}</div>
                </div>
              </div>
            </div>
            <div className="top-section">
              <div className="other-heading">
                <FaRegAddressBook />
                <div>
                  <div>Pan</div>
                  <div className="small-title">{detail?.pan}</div>
                </div>
              </div>
              <div className="other-heading">
                <FaHashtag />
                <div>
                  <div>Footer text</div>
                  <div className="small-title">
                    © {new Date().getFullYear()} {detail?.name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileDetails;
