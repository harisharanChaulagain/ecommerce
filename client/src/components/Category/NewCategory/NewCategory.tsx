import React, { useContext, useState } from "react";
import "./NewCategory.scss";
import { MdClose } from "react-icons/md";
import { Context } from "../../../utils/context";

const NewCategory = () => {
  const { setNewCategory }: any = useContext(Context);

  return (
    <div className="new-category-overlay">
      <div className="new-category-main">
        <div className=" main-text">
          <span>Add New Category</span>
          <MdClose
            className="close-icon"
            onClick={() => setNewCategory(false)}
          />
        </div>
        <input type="text" autoFocus placeholder="Add New Category" />
        <button className="save-btn">Save</button>
      </div>
    </div>
  );
};

export default NewCategory;
