import React, { useContext, useState } from "react";
import "./NewProduct.scss";
import { MdClose } from "react-icons/md";
import { Context } from "../../../utils/context";
import Select from "react-select";
import { useCategory } from "../../../api/GetApi";
import { usePostProduct } from "../../../api/PostApi";

const NewProduct = () => {
  const { setNewProduct }: any = useContext(Context);
  const { data: categoryData } = useCategory();
  const { mutation } = usePostProduct();
  const [productName, setProductName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [units, setUnits] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryImage, setCategoryImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCategoryImage(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("category", categoryName);
    formData.append("units", units);
    formData.append("price", price);
    formData.append("description", description);
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

  const categories =
    categoryData?.map((category: any) => ({
      value: category.name,
      label: category.name,
    })) || [];

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
        <div className="input-fields">
          <div>
            <div>Product Name</div>
            <input
              type="text"
              autoFocus
              placeholder="Add New product"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div>
            <div>Category</div>
            <Select
              options={categories}
              isSearchable={true}
              isClearable={true}
              onChange={(selectedOption: any) =>
                setCategoryName(selectedOption?.value || "")
              }
            />
          </div>
        </div>
        <div className="input-fields">
          <div>
            <div>Units</div>
            <input
              type="text"
              placeholder="Units"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
            />
          </div>
          <div>
            <div>Price</div>
            <input
              type="text"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
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

export default NewProduct;
