import React from "react";
import { useUserDetails } from "../../../api/GetApi";
import { FaUserShield } from "react-icons/fa";
import "./TotalUser.scss";

const TotalUser = () => {
  const { data: userData }: any = useUserDetails();
  return (
    <div className="total-user-main">
      <div className="first-div">
        <FaUserShield />
        <span>Total User</span>
      </div>
      <div className="second-div">{userData?.userCount}</div>
    </div>
  );
};

export default TotalUser;
