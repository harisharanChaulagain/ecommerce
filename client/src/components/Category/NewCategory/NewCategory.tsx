import React, { useContext } from "react";
import "./NewCategory.scss";
import { MdClose } from "react-icons/md";
import { Context } from "../../../utils/context";
import { usePostCategory } from "../../../api/PostApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const NewCategory = () => {
  const { setNewCategory }: any = useContext(Context);
  const { mutation } = usePostCategory();

  const formik = useFormik({
    initialValues: {
      categoryName: "",
      categoryImage: null,
    },
    validationSchema: Yup.object({
      categoryName: Yup.string()
        .min(3, "Product Name must be at least 3 characters")
        .required("Product Name is required"),
      categoryImage: Yup.mixed().required("Image is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("name", values.categoryName);
      if (values.categoryImage) {
        formData.append("image", values.categoryImage);
      }
      try {
        await mutation.mutate(formData);
        toast.success("Category added successfully!");
        resetForm();
        setNewCategory(false);
      } catch (error) {
        console.error("Error creating category:", error);
      }
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      formik.setFieldValue("categoryImage", e.target.files[0]);
    }
  };

  return (
    <div className="new-category-overlay">
      <form className="new-category-main" onSubmit={formik.handleSubmit}>
        <div className=" main-text">
          <span>Add New Category</span>
          <MdClose
            className="close-icon"
            onClick={() => setNewCategory(false)}
          />
        </div>
        <div>
          <div className="mb-20">
            <div>Category Name</div>
            <input
              type="text"
              autoFocus
              placeholder="Add New Category"
              name="categoryName"
              value={formik.values.categoryName}
              onChange={formik.handleChange}
            />
            {formik.touched.categoryName && formik.errors.categoryName ? (
              <div className="error">{formik.errors.categoryName}</div>
            ) : null}
          </div>
          <div>
            <div>Image</div>
            <input
              type="file"
              accept=".png, .jpeg, .jpg"
              onChange={handleImageChange}
            />
            {formik.touched.categoryImage && formik.errors.categoryImage ? (
              <div className="error">{formik.errors.categoryImage}</div>
            ) : null}
          </div>
        </div>
        <div className="button-main">
          <button className="save-btn">Save</button>
        </div>
      </form>
    </div>
  );
};

export default NewCategory;
