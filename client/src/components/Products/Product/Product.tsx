import React from "react";
import ProductImage from "../../../assets/iphone.png";
import "./Product.scss";

const Product = () => {
  return (
    <div className="product-card">
      <div className="thumbnail">
        <img src={ProductImage} alt="product image" />
      </div>
      <div className="prod-details">
        <span className="name">Iphone 14</span>
        <span className="price">R.S.150000</span>
      </div>
    </div>
  );
};

export default Product;
