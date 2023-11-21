import React, { useContext } from "react";
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
        <div>
          <div>
            <div>Category Name</div>
            <input type="text" autoFocus placeholder="Add New Category" />
          </div>
          <div>
            <div>Image</div>
            <input type="file" accept=".png, .jpeg, .jpg" />
          </div>
        </div>
        <div className="button-main">
          <button className="save-btn">Save</button>
        </div>
      </div>
    </div>
  );
};

export default NewCategory;
