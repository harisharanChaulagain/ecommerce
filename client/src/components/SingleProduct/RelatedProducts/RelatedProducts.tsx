import React from "react";
import "./RelatedProducts.scss";
import Products from "../../Products/Products";

const RelatedProducts = () => {
  return (
    <div>
      <Products innerPage={false} headingText="Related Products" />
    </div>
  );
};

export default RelatedProducts;
