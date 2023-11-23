import React from "react";
import "./RelatedProducts.scss";
import Products from "../../Products/Products";
import { useProduct } from "../../../api/GetApi";
const RelatedProducts = () => {
  const { data: productData } = useProduct();

  return (
    <div>
      <Products
        innerPage={false}
        products={productData}
        headingText="Related Products"
      />
    </div>
  );
};

export default RelatedProducts;
