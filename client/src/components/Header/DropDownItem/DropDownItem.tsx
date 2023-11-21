import React, { useEffect, useState } from "react";
import "./DropDownItem.scss";
import { BsPlusCircle } from "react-icons/bs";

const DropDownItem = () => {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <div className={`dropdown-item ${scrolled ? "sticky-header" : ""}`}>
      <div className="dropdown-content">
        <div>
          Add New Category
          <BsPlusCircle />
        </div>
        <div>
          Add New Product
          <BsPlusCircle />
        </div>
      </div>
    </div>
  );
};

export default DropDownItem;
