import React from "react";
import "./CartItem.scss";
import { MdClose } from "react-icons/md";
import prod from "../../../assets/iphone.png";

const CartItem = () => {
  return (
    <div className="cart-products">
      <div className="cart-product">
        <div className="img-container">
          <img src={prod} alt="img" />
        </div>
        <div className="prod-details">
          <span className="name">Product name</span>
          <MdClose className="close-btn" />
          <div className="quantity-buttons">
            <span>-</span>
            <span>3</span>
            <span>+</span>
          </div>
          <div className="text">
            <span>3</span>
            <span>x</span>
            <span className="highlight">&#8377;46533</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
