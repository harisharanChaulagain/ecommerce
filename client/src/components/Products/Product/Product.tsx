import React, { useState } from "react";
import "./Product.scss";
import { useNavigate } from "react-router-dom";
import StarRating from "../../StarRating/StarRating";

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
  // const [averageRating, setAverageRating] = useState<number | null>(null);
  const averageRating = 4.5;

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
        {averageRating !== null && (
          <div className="price">
            <StarRating rating={averageRating} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
