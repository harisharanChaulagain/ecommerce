import React, { useContext } from "react";
import "./ProfileDetails.scss";
import { FaRegEdit } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import {
  FaLocationArrow,
  FaMobileAlt,
  FaEnvelope,
  FaRegAddressBook,
  FaHashtag,
  FaCalendarAlt,
} from "react-icons/fa";
import { useCompanyDetails, useUsersDetails } from "../../../api/GetApi";
import { bufferToDataURL } from "../../../utils/imageUtils";
import NewProfile from "./NewProfile/NewProfile";
import { Context } from "../../../utils/context";
import Cookies from "js-cookie";

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
  description: string;
}
export interface UserDetails {
  _id: string;
  fullName: string;
  email: string;
  dob: string;
}

const ProfileDetails = () => {
  const { updateCompanyDetails, setUpdateCompanyDetails }: any =
    useContext(Context);
  const { data: companyData } = useCompanyDetails();
  const { data: userData } = useUsersDetails();
  const userId = Cookies.get("userId");
  const filteredUserData = userData?.filter(
    (user: UserDetails) => user?._id === userId
  );
  const isAdminLoggedIn = () => {
    return Cookies.get("adminToken") !== undefined;
  };
  const isUserLoggedIn = () => {
    return Cookies.get("token") !== undefined;
  };
  if (
    !companyData ||
    companyData.length === 0 ||
    (filteredUserData?.length === 0 && !isAdminLoggedIn() && !isUserLoggedIn())
  ) {
    return null;
  }
  const id = companyData[0]?._id;

  return (
    <div className="profile-main">
      {isAdminLoggedIn() ? (
        <div>
          {companyData?.map((detail: companyDetails) => (
            <div key={detail?._id}>
              <div className="title">Profile</div>
              <hr />
              <div className="company-details">
                <div className="heading">
                  <span>Company Details</span>
                  <button onClick={() => setUpdateCompanyDetails(true)}>
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
      ) : isUserLoggedIn() ? (
        <div>
          {filteredUserData?.map((detail: UserDetails) => (
            <div key={detail?._id}>
              <div className="title">Profile</div>
              <hr />
              <div className="other-details">
                <div className="top-section">
                  <div className="other-heading">
                    <CgProfile />
                    <div>
                      <div>Name</div>
                      <div className="small-title">{detail?.fullName}</div>
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
                    <FaCalendarAlt />
                    <div>
                      <div>Date of Birth</div>
                      <div className="small-title">
                        {new Date(detail?.dob).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Not logged in...</div>
      )}
      {updateCompanyDetails && <NewProfile isUpdate={true} cId={id} />}
    </div>
  );
};
export default ProfileDetails;
