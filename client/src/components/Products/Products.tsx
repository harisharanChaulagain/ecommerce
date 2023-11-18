import React from "react";
import Product from "./Product/Product";
import "./Products.scss";

interface ProductsProps {
  innerPage: boolean;
}
interface HeadingProps {
  headingText: string;
}

const Products: React.FC<ProductsProps & HeadingProps> = ({
  innerPage,
  headingText,
}) => {
  return (
    <div className="products-container">
      {!innerPage && <div className="sec-heading">{headingText}</div>}
      <div className="products">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </div>
  );
};

export default Products;
