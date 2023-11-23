import React from "react";
import "./Category.scss";
import Products from "../Products/Products";
import { useProduct } from "../../api/GetApi";

const Category = () => {
  const { data: productData, isLoading, isError } = useProduct();

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (isError) {
    return <div>Error fetching products from API</div>;
  }

  return (
    <div className="category-main-content">
      <div className="layout">
        <div className="category-title">Category Title</div>
        <Products
          headingText={"Category Title"}
          innerPage={true}
          products={productData}
        />
      </div>
    </div>
  );
};

export default Category;
