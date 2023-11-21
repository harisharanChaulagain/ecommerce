import React, { useEffect, useState, useContext } from "react";
import "./DropDownItem.scss";
import { BsPlusCircle } from "react-icons/bs";
import { Context } from "../../../utils/context";

const DropDownItem = () => {
  const [scrolled, setScrolled] = useState(false);
  const { setNewCategory }: any = useContext(Context);
  const { setNewProduct }: any = useContext(Context);

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

  const handleNewCategoryClick = () => {
    setNewCategory(true);
  };
  const handleNewProductClick = () => {
    setNewProduct(true);
  };

  return (
    <div className={`dropdown-item ${scrolled ? "sticky-header" : ""}`}>
      <div className="dropdown-content">
        <div onClick={handleNewCategoryClick}>
          Add New Category
          <BsPlusCircle />
        </div>
        <div onClick={handleNewProductClick}>
          Add New Product
          <BsPlusCircle />
        </div>
      </div>
    </div>
  );
};

export default DropDownItem;
