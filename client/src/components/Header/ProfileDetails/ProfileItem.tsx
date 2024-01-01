import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileItem.scss";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { Context } from "../../../utils/context";

const ProfileItem = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const { setProductQuantities, setProductIds, setShowProfile }: any =
    useContext(Context);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignOut = () => {
    Cookies.remove("token");
    Cookies.remove("adminToken");
    setShowProfile(false);
    navigate("/");
    setProductQuantities([]);
    setProductIds([]);
    toast.success("Log Out Successfully!");
  };
  return (
    <div className={`profile-dropdown ${scrolled ? "sticky-header" : ""}`}>
      <div className="dropdown-content">
        <div>
          <CgProfile />
          <span>Profile</span>
        </div>
        <div>
          <IoMdSettings />
          <span>Setting</span>
        </div>
        <div onClick={handleSignOut}>
          <BiLogOut />
          <span>LogOut</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileItem;
