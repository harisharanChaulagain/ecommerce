import React, { useContext } from "react";
import "./CartItem.scss";
import { MdClose } from "react-icons/md";
import { Context } from "../../../utils/context";
import { toast } from "react-toastify";
import { bufferToDataURL } from "../../../utils/imageUtils";

const CartItem: React.FC<any> = ({
  image,
  name,
  quantity,
  price,
  onRemove,
  index,
  stock,
}) => {
  const { productQuantities, setProductQuantities }: any = useContext(Context);

  const exceedQuantity = quantity < stock;

  const decrement = () => {
    const newProductQuantities = [...productQuantities];
    newProductQuantities[index] = Math.max(1, newProductQuantities[index] - 1);
    setProductQuantities(newProductQuantities);
  };

  const increment = () => {
    if (exceedQuantity) {
      const newProductQuantities = [...productQuantities];
      newProductQuantities[index] = newProductQuantities[index] + 1;
      setProductQuantities(newProductQuantities);
    } else {
      toast.warn("Exceed the Stock quantity!");
    }
  };

  return (
    <div className="cart-products">
      <div className="cart-product">
        <div className="img-container">
          <img src={bufferToDataURL(image)} alt="img" />
        </div>
        <div className="prod-details">
          <span className="name">{name}</span>
          <MdClose className="close-btn" onClick={() => onRemove()} />
          <div className="quantity-buttons">
            <span onClick={() => decrement()}>-</span>
            <span>{quantity}</span>
            <span onClick={() => increment()}>+</span>
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
