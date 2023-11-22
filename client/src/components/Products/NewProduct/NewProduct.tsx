import React, { useContext } from "react";
import "./NewProduct.scss";
import { MdClose } from "react-icons/md";
import { Context } from "../../../utils/context";
import Select from "react-select";
import { useCategory } from "../../../api/GetApi";

const NewProduct = () => {
  const { setNewProduct }: any = useContext(Context);
  const { data: categoryData } = useCategory();
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
            <input type="text" autoFocus placeholder="Add New product" />
          </div>
          <div>
            <div>Category</div>
            <Select
              options={categories}
              isSearchable={true}
              isClearable={true}
            />
          </div>
        </div>
        <div className="input-fields">
          <div>
            <div>Units</div>
            <input type="text" placeholder="Units" />
          </div>
          <div>
            <div>Price</div>
            <input type="text" placeholder="Price" />
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
              />
            </div>
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

export default NewProduct;
