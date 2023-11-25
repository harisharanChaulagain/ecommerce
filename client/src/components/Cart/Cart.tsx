import React, { useContext } from "react";
import "./Cart.scss";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import CartItem from "./CartItem/CartItem";
import { Context } from "../../utils/context";
import { useProduct } from "../../api/GetApi";

interface ShowCartProps {
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cart: React.FC<ShowCartProps> = ({ setShowCart }) => {
  const { data: productData } = useProduct();
  const { productQuantities, productIds }: any = useContext(Context);
  const cartItems = productIds.map((productId: string, index: number) => {
    const selectedProduct = productData.find(
      (product: any) => product._id === productId
    );
    return (
      <CartItem
        key={index}
        image={selectedProduct.image}
        name={selectedProduct.name}
        quantity={productQuantities[index]}
        price={selectedProduct.price}
      />
    );
  });

  return (
    <div className="cart-panel">
      <div className="opac-layer"></div>
      <div className="cart-content">
        <div className="cart-header">
          <span className="heading">Shopping Cart</span>
          <span className="close-btn" onClick={() => setShowCart(false)}>
            <MdClose />
            <span className="text">Close</span>
          </span>
        </div>
        {productIds.length === 0 ? (
          <div className="empty-cart">
            <BsCartX />
            <span>No products in the cart</span>
            <button className="return-cta">RETURN TO SHOP</button>
          </div>
        ) : (
          <>
            {cartItems}
            <div className="cart-footer">
              <div className="subtotal">
                <span className="text">Subtotal:</span>
                <span className="text total">&#8377;13232</span>
              </div>
              <div className="button">
                <button className="checkout-cta">Checkout</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
