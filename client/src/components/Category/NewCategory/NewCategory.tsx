import React, { useContext, useEffect } from "react";
import "./NewCategory.scss";
import { MdClose } from "react-icons/md";
import { Context } from "../../../utils/context";
import { usePostCategory } from "../../../api/PostApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useUpdateCategory } from "../../../api/PutApi";
import { useCategory } from "../../../api/GetApi";

const NewCategory = ({
  isUpdate,
  categoryId,
}: {
  isUpdate?: boolean;
  categoryId?: string | null;
}) => {
  const { setNewCategory }: any = useContext(Context);
  const { mutation } = usePostCategory();
  const { putMutation } = useUpdateCategory();
  const { data: existingProductData } = useCategory();
  useEffect(() => {
    if (isUpdate) {
      const categoryToUpdate = existingProductData.find(
        (category: any) => category._id === categoryId
      );
      if (categoryToUpdate) {
        formik.setValues({
          categoryName: categoryToUpdate.name || "",
          categoryImage: null,
        });
      }
    }
  }, []);

  const validationSchema = isUpdate
    ? Yup.object({
        categoryName: Yup.string()
          .min(3, "Product Name must be at least 3 characters")
          .required("Product Name is required"),
      })
    : Yup.object({
        categoryName: Yup.string()
          .min(3, "Product Name must be at least 3 characters")
          .required("Product Name is required"),
        categoryImage: Yup.mixed().required("Image is required"),
      });

  const onSubmit = async (
    values: any,
    { resetForm }: { resetForm: () => void }
  ) => {
    const formData = new FormData();
    formData.append("name", values.categoryName);
    if (values.categoryImage) {
      formData.append("image", values.categoryImage);
    }

    try {
      if (isUpdate) {
        if (existingProductData && categoryId) {
          await putMutation.mutate(
            {
              _id: categoryId,
              data: formData,
            },
            {
              onSuccess: () => {
                toast.success("Category updated successfully!");
                resetForm();
                setNewCategory(false);
              },
              onError: (error) => {
                console.error("Error updating category:", error);
              },
            }
          );
        } else {
          console.error("Error: Category data or _id is undefined");
        }
      } else {
        await mutation.mutate(formData);
        toast.success("Category added successfully!");
        resetForm();
        setNewCategory(false);
      }
    } catch (error) {
      console.error(
        `Error ${isUpdate ? "updating" : "creating"} category:`,
        error
      );
    }
  };

  const formik = useFormik({
    initialValues: {
      categoryName: "",
      categoryImage: null,
    },
    validationSchema,
    onSubmit,
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
          <span>{isUpdate ? "Update" : "Add New"} Category</span>
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
          <button className="save-btn">{isUpdate ? "Update" : "Save"}</button>
        </div>
      </form>
    </div>
  );
};

export default NewCategory;
