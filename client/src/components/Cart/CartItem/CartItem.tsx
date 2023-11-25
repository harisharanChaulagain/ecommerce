import React from "react";
import "./CartItem.scss";
import { MdClose } from "react-icons/md";

const CartItem: React.FC<any> = ({ image, name, quantity, price }) => {
  return (
    <div className="cart-products">
      <div className="cart-product">
        <div className="img-container">
          <img
            src={`../../../../public/product/${image.split("/")[2]}`}
            alt="img"
          />
        </div>
        <div className="prod-details">
          <span className="name">{name}</span>
          <MdClose className="close-btn" />
          <div className="quantity-buttons">
            <span>-</span>
            <span>{quantity}</span>
            <span>+</span>
          </div>
          <div className="text">
            <span>{quantity}</span>
            <span>x</span>
            <span className="highlight">&#8377;{price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
