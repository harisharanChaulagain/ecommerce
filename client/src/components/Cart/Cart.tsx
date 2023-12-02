import React, { useContext } from "react";
import "./Cart.scss";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import CartItem from "./CartItem/CartItem";
import { Context } from "../../utils/context";
import { useProduct } from "../../api/GetApi";
import { useNavigate } from "react-router-dom";

interface ShowCartProps {
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cart: React.FC<ShowCartProps> = ({ setShowCart }) => {
  const navigate = useNavigate();
  const { data: productData } = useProduct();
  const {
    productQuantities,
    productIds,
    setProductQuantities,
    setProductIds,
  }: any = useContext(Context);

  const total = productIds.reduce(
    (acc: number, productId: string, index: number) => {
      const selectedProduct = productData.find(
        (product: any) => product._id === productId
      );
      const productPrice = selectedProduct ? selectedProduct.price : 0;
      const quantity = productQuantities[index];
      return acc + productPrice * quantity;
    },
    0
  );

  const handleRemoveProduct = (index: number) => {
    const newProductQuantities = [...productQuantities];
    const newProductIds = [...productIds];
    newProductQuantities.splice(index, 1);
    newProductIds.splice(index, 1);
    setProductQuantities(newProductQuantities);
    setProductIds(newProductIds);
  };

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
        onRemove={() => handleRemoveProduct(index)}
        index={index}
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
            <button
              className="return-cta"
              onClick={() => {
                navigate("/");
                setShowCart(false);
              }}
            >
              RETURN TO SHOP
            </button>
          </div>
        ) : (
          <>
            {cartItems}
            <div className="cart-footer">
              <div className="subtotal">
                <span className="text">Subtotal:</span>
                <span className="text total">&#8377;{total}</span>
              </div>
              <div className="button">
                <button
                  className="checkout-cta"
                  onClick={() => {
                    const totals = (total * 100).toFixed(0);
                    navigate(`/payment/${totals}`);
                    setShowCart(false);
                  }}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
