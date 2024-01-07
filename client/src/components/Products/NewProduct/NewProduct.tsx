import React, { useContext, useEffect } from "react";
import "./NewProduct.scss";
import { MdClose } from "react-icons/md";
import { Context } from "../../../utils/context";
import Select from "react-select";
import { useCategory } from "../../../api/GetApi";
import { usePostProduct } from "../../../api/PostApi";
import { useUpdateProduct } from "../../../api/PutApi";
import { useProduct } from "../../../api/GetApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const NewProduct = ({
  isUpdate,
  productId,
}: {
  isUpdate?: boolean;
  productId?: string | null;
}) => {
  const { setNewProduct }: any = useContext(Context);
  const { data: categoryData } = useCategory();
  const { mutation } = usePostProduct();
  const { putMutation } = useUpdateProduct();
  const { data: existingProductData, refetch } = useProduct();

  const categories =
    categoryData?.map((category: any) => ({
      value: category.name,
      label: category.name,
    })) || [];
  useEffect(() => {
    if (isUpdate) {
      const productToUpdate = existingProductData.find(
        (product: any) => product._id === productId
      );
      if (productToUpdate) {
        formik.setValues({
          productName: productToUpdate.name || "",
          categoryName: productToUpdate.category || "",
          units: productToUpdate.units || "",
          price: productToUpdate.price || "",
          description: productToUpdate.description || "",
          categoryImage: null,
        });
      }
    }
  }, []);

  const validationSchema = isUpdate
    ? Yup.object({
        productName: Yup.string().min(
          3,
          "Product Name must be at least 3 characters"
        ),
        units: Yup.number().typeError("Units must be a numeric value"),
        price: Yup.number().typeError("Price must be a numeric value"),
        description: Yup.string().test(
          "min-words",
          "Description must contain at least 4 words",
          (value: any) => value.split(/\s+/).length >= 4
        ),
      })
    : Yup.object({
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
      });

  const onSubmit = async (
    values: any,
    { resetForm }: { resetForm: () => void }
  ) => {
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
      if (isUpdate) {
        if (existingProductData && productId) {
          await putMutation.mutate(
            {
              _id: productId,
              data: formData,
            },
            {
              onSuccess: () => {
                toast.success("Product updated successfully!");
                resetForm();
                setNewProduct(false);
                refetch();
              },
              onError: (error) => {
                console.error("Error updating product:", error);
              },
            }
          );
        } else {
          console.error("Error: Product data or _id is undefined");
        }
      } else {
        await mutation.mutate(formData, {
          onSuccess: () => {
            toast.success("Product added successfully!");
            resetForm();
            setNewProduct(false);
            refetch();
          },
        });
      }
    } catch (error) {
      console.error(
        `Error ${isUpdate ? "updating" : "creating"} product:`,
        error
      );
    }
  };

  const formik = useFormik({
    initialValues: {
      productName: "",
      categoryName: "",
      units: "",
      price: "",
      description: "",
      categoryImage: null,
    },
    validationSchema,
    onSubmit,
  });

  const handleImageChange = (e: any) => {
    if (e.target.files) {
      formik.setFieldValue("categoryImage", e.target.files[0]);
    }
  };

  return (
    <div className="new-product-overlay">
      <div className="new-product-main">
        <div className="main-text">
          <span>{isUpdate ? "Update" : "Add New"} Product</span>
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
                value={categories.find(
                  (category: any) =>
                    category.value === formik.values.categoryName
                )}
                onChange={(selectedOption: any) => {
                  formik.setFieldValue(
                    "categoryName",
                    selectedOption?.value || ""
                  );
                }}
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
              {isUpdate ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProduct;
