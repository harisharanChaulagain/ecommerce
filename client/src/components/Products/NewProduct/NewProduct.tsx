import React, { useContext } from "react";
import "./NewProduct.scss";
import { MdClose } from "react-icons/md";
import { Context } from "../../../utils/context";
import Select from "react-select";
import { useCategory } from "../../../api/GetApi";
import { usePostProduct } from "../../../api/PostApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const NewProduct = () => {
  const { setNewProduct }: any = useContext(Context);
  const { data: categoryData } = useCategory();
  const { mutation } = usePostProduct();

  const categories =
    categoryData?.map((category: any) => ({
      value: category.name,
      label: category.name,
    })) || [];

  const formik = useFormik({
    initialValues: {
      productName: "",
      categoryName: "",
      units: "",
      price: "",
      description: "",
      categoryImage: null,
    },
    validationSchema: Yup.object({
      productName: Yup.string()
        .min(3, "Product Name must be at least 3 characters")
        .required("Product Name is required"),
      categoryName: Yup.string().required("Category is required"),
      units: Yup.number()
        .typeError("Units must be a numeric value")
        .required("Units are required"),
      price: Yup.number()
        .typeError("Price must be a numeric value")
        .required("Price is required"),
      description: Yup.string()
        .test(
          "min-words",
          "Description must contain at least 5 words",
          (value: any) => value.split(/\s+/).length >= 5
        )
        .required("Description is required"),
      categoryImage: Yup.mixed().required("Image is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("name", values.productName);
      formData.append("category", values.categoryName);
      formData.append("units", values.units);
      formData.append("price", values.price);
      formData.append("description", values.description);
      if (values.categoryImage) {
        formData.append("image", values.categoryImage);
      }

      try {
        await mutation.mutate(formData);
        toast.success("Product added successfully!");
        resetForm();
        setNewProduct(false);
      } catch (error) {
        console.error("Error creating product:", error);
      }
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      formik.setFieldValue("categoryImage", e.target.files[0]);
    }
  };

  return (
    <div className="new-product-overlay">
      <div className="new-product-main">
        <div className="main-text">
          <span>Add New Product</span>
          <MdClose
            className="close-icon"
            onClick={() => setNewProduct(false)}
          />
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="input-fields">
            <div>
              <div>Product Name</div>
              <input
                type="text"
                autoFocus
                placeholder="Add New product"
                name="productName"
                value={formik.values.productName}
                onChange={formik.handleChange}
                style={{ marginBottom: "0px" }}
              />
              {formik.touched.productName && formik.errors.productName ? (
                <div className="error">{formik.errors.productName}</div>
              ) : null}
            </div>
            <div>
              <div>Category</div>
              <Select
                options={categories}
                isSearchable={true}
                isClearable={true}
                onChange={(selectedOption: any) =>
                  formik.setFieldValue(
                    "categoryName",
                    selectedOption?.value || ""
                  )
                }
              />
              {formik.touched.categoryName && formik.errors.categoryName ? (
                <div className="error">{formik.errors.categoryName}</div>
              ) : null}
            </div>
          </div>
          <div className="input-fields">
            <div>
              <div>Units</div>
              <input
                type="text"
                placeholder="Units"
                name="units"
                value={formik.values.units}
                onChange={formik.handleChange}
              />
              {formik.touched.units && formik.errors.units ? (
                <div className="error">{formik.errors.units}</div>
              ) : null}
            </div>
            <div>
              <div>Price</div>
              <input
                type="text"
                placeholder="Price"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
              />
              {formik.touched.price && formik.errors.price ? (
                <div className="error">{formik.errors.price}</div>
              ) : null}
            </div>
          </div>
          <div className="input-fields">
            <div>
              <div>Description</div>
              <div>
                <textarea
                  rows={4 as number}
                  cols={20 as number}
                  style={{ resize: "none" }}
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
                {formik.touched.description && formik.errors.description ? (
                  <div className="error">{formik.errors.description}</div>
                ) : null}
              </div>
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
            <button type="submit" className="save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProduct;
