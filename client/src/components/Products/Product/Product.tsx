import React from "react";
import "./Product.scss";
import { useNavigate } from "react-router-dom";

interface ProductProps {
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      className="product-card"
      onClick={() => {
        navigate(`/product/${product._id}`);
        window.scrollTo(0, 0);
      }}
    >
      <div className="thumbnail">
        <img
          src={`../../../../public/product/${product.image.split("/")[2]}`}
          alt="product image"
        />
      </div>
      <div className="prod-details">
        <span className="name">{product.name}</span>
        <span className="price">&#8377; {product.price}</span>
      </div>
    </div>
  );
};

export default Product;
