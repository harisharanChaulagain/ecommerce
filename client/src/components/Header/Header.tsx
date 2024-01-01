import React, { useEffect, useRef, useState, useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { FaUser } from "react-icons/fa";
import Search from "./Search/Search";
import Cart from "../Cart/Cart";
import "./Header.scss";
import { FaAngleDown } from "react-icons/fa";
import DropDownItem from "./DropDownItem/DropDownItem";
import { Context } from "../../utils/context";
import NewCategory from "../Category/NewCategory/NewCategory";
import NewProduct from "../Products/NewProduct/NewProduct";
import logo from "../../../public/logo.png";
import ProfileItem from "./ProfileDetails/ProfileItem";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [newCategory, setNewCategory] = useState(false);
  const [newProduct, setNewProduct] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<any>(null);
  const profileRef = useRef<any>(null);
  const context = useContext<any>(Context);
  const { productQuantities, showProfile, setShowProfile }: any =
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

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfile(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setNewCategory(() => {
      return context.newCategory;
    });
    setNewProduct(() => {
      return context.newProduct;
    });
  }, [context.newCategory, context.newProduct]);

  const handleAboutClick = () => {
    const aboutSection = document.getElementById("about-section");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
    window.scrollTo(0, 0);
  };
  const handleProfileItem = () => {
    setShowProfile(!showProfile);
    window.scrollTo(0, 0);
  };

  const isUserLoggedIn = () => {
    return Cookies.get("token") !== undefined;
  };

  const isAdminLoggedIn = () => {
    return Cookies.get("adminToken") !== undefined;
  };

  const isLoggedIn = () => {
    return isUserLoggedIn() || isAdminLoggedIn();
  };

  return (
    <>
      <div className={`main-header ${scrolled ? "sticky-header" : ""}`}>
        <div className="header-content">
          <ul className="left">
            <li
              onClick={() => {
                navigate("/");
                window.scrollTo(0, 0);
              }}
            >
              Home
            </li>
            <li onClick={handleAboutClick}>About</li>
            <li
              onClick={() => {
                navigate("/category/:id");
                window.scrollTo(0, 0);
              }}
            >
              Categories
            </li>
            {isAdminLoggedIn() && (
              <li
                className="dropdown-item"
                onClick={handleDropdownClick}
                ref={dropdownRef}
              >
                More... <FaAngleDown />
              </li>
            )}
          </ul>
          <div
            className="center"
            onClick={() => {
              navigate("/");
              window.scrollTo(0, 0);
            }}
          >
            Hamro Bazar
          </div>
          <div className="right">
            <TbSearch onClick={() => setShowSearch(true)} />
            {!isLoggedIn() && (
              <FaUser
                onClick={() => {
                  navigate("/login");
                  window.scrollTo(0, 0);
                }}
              />
            )}
            {!isLoggedIn() && (
              <div
                onClick={() => {
                  navigate("/register");
                  window.scrollTo(0, 0);
                }}
                className="sign-up"
              >
                Sign Up
              </div>
            )}
            {isUserLoggedIn() && (
              <span className="cart-icon" onClick={() => setShowCart(true)}>
                <CgShoppingCart />
                {productQuantities.length > 0 && (
                  <span>{productQuantities.length}</span>
                )}
              </span>
            )}
            {isLoggedIn() && (
              <span
                className="profile-section"
                onClick={handleProfileItem}
                ref={profileRef}
              >
                <img src={logo} alt="logo" />
              </span>
            )}
          </div>
        </div>
      </div>
      {showCart && <Cart setShowCart={setShowCart} />}
      {showSearch && <Search setShowSearch={setShowSearch} />}
      {newCategory && <NewCategory isUpdate={false} />}
      {newProduct && <NewProduct isUpdate={false} />}
      {showDropdown && <DropDownItem />}
      {showProfile && <ProfileItem />}
    </>
  );
};

export default Header;
