import React, { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import Search from "./Search/Search";
import Cart from "../Cart/Cart";
import "./Header.scss";
import { FaAngleDown } from "react-icons/fa";
import DropDownItem from "./DropDownItem/DropDownItem";
import { Context } from "../../utils/context";
import NewCategory from "../Category/NewCategory/NewCategory";
import NewProduct from "../Products/NewProduct/NewProduct";
import logo from "../../../public/logo.png";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [newCategory, setNewCategory] = useState(false);
  const [newProduct, setNewProduct] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<any>(null);
  const context = useContext<any>(Context);

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
  };

  return (
    <>
      <div className={`main-header ${scrolled ? "sticky-header" : ""}`}>
        <div className="header-content">
          <ul className="left">
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={handleAboutClick}>About</li>
            <li onClick={() => navigate("/category/:id")}>Categories</li>
            <li
              className="dropdown-item"
              onClick={handleDropdownClick}
              ref={dropdownRef}
            >
              Add New <FaAngleDown />
            </li>
          </ul>
          <div className="center" onClick={() => navigate("/")}>
            <img src={logo} alt="logo" style={{ height: "30px" }} />
            Hamro Bazar
          </div>
          <div className="right">
            <TbSearch onClick={() => setShowSearch(true)} />
            <AiOutlineHeart />
            <span className="cart-icon" onClick={() => setShowCart(true)}>
              <CgShoppingCart />
              <span>10</span>
            </span>
          </div>
        </div>
      </div>
      {showCart && <Cart setShowCart={setShowCart} />}
      {showSearch && <Search setShowSearch={setShowSearch} />}
      {newCategory && <NewCategory />}
      {newProduct && <NewProduct />}
      {showDropdown && <DropDownItem />}
    </>
  );
};

export default Header;
