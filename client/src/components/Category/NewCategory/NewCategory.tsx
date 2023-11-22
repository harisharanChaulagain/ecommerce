import React, { useContext, useState } from "react";
import "./NewCategory.scss";
import { MdClose } from "react-icons/md";
import { Context } from "../../../utils/context";
import { usePostCategory } from "../../../api/PostApi";

const NewCategory = () => {
  const { setNewCategory }: any = useContext(Context);
  const { mutation } = usePostCategory();

  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCategoryImage(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", categoryName);
    if (categoryImage) {
      formData.append("image", categoryImage);
    }

    try {
      await mutation.mutate(formData);
      console.log("Category created!");
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

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
            <input
              type="text"
              autoFocus
              placeholder="Add New Category"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div>
            <div>Image</div>
            <input
              type="file"
              accept=".png, .jpeg, .jpg"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="button-main">
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewCategory;
