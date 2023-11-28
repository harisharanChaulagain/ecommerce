import React from "react";
import Product from "./Product/Product";
import "./Products.scss";
interface ProductsProps {
  innerPage: boolean;
  headingText: string;
  products: any;
}

const Products: React.FC<ProductsProps> = ({
  innerPage,
  headingText,
  products,
}) => {
  if (!products) {
    return <div>Loading products...</div>;
  }
  return (
    <div className="products-container">
      {!innerPage && <div className="sec-heading">{headingText}</div>}
      <div className="products">
        {products.map((product: any) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
