import React from "react";
import "./Product.scss";

interface ProductProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
}

const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className="product-card">
      <div className="thumbnail">
        <img
          src={`../../../../public/product/${product.image.split("/")[2]}`}
          alt="product image"
        />
      </div>
      <div className="prod-details">
        <span className="name">{product.name}</span>
        <span className="price">R.S. {product.price}</span>
      </div>
    </div>
  );
};

export default Product;
