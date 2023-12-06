import React, { useEffect, useState, useContext } from "react";
import "./DropDownItem.scss";
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
        <div onClick={handleNewCategoryClick}>Add New Category</div>
        <div onClick={handleNewProductClick}>Add New Product</div>
        <div>Category Table</div>
        <div>Product Table</div>
        <div>Reports</div>
        <div>Admin Dashboard</div>
      </div>
    </div>
  );
};

export default DropDownItem;
