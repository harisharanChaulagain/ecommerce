import React, { useState, useContext } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaCartPlus,
  FaPinterest,
} from "react-icons/fa";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import "./SingleProduct.scss";
import { useParams } from "react-router-dom";
import { useProduct } from "../../api/GetApi";
import { Context } from "../../utils/context";
import { useNavigate } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  category: string;
  units: number;
  price: number;
}

const SingleProduct = () => {
  const { id } = useParams();
  const { data: productData } = useProduct();
  const [quantity, setQuantity] = useState(1);
  const { setProductQuantities }: any = useContext(Context);
  const { setProductIds }: any = useContext(Context);
  const navigate = useNavigate();

  const selectedProduct = productData.find(
    (product: Product) => product._id === id
  );

  const decrement = () => {
    setQuantity((prevState: any) => {
      if (prevState === 1) return 1;
      return prevState - 1;
    });
  };

  const increment = () => {
    setQuantity((prevState: any) => prevState + 1);
  };
  const addToCart = () => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (!token) {
      navigate("/login");
    } else {
      setProductQuantities((prevQuantities: any) => [
        ...prevQuantities,
        quantity,
      ]);
      setProductIds((prevIds: any) => [...prevIds, selectedProduct._id]);
    }
  };

  return (
    <div className="single-product-main-content">
      <div className="layout">
        <div className="single-product-page">
          <div className="left">
            <img
              src={`../../../../public/product/${
                selectedProduct.image.split("/")[2]
              }`}
              alt="product image"
            />
          </div>
          <div className="right">
            <span className="name">{selectedProduct.name}</span>
            <span className="price">&#8377; {selectedProduct.price}</span>
            <span className="desc">{selectedProduct.description}</span>
            <div className="cart-buttons">
              <div className="quantity-buttons">
                <span onClick={decrement}>-</span>
                <span>{quantity}</span>
                <span onClick={increment}>+</span>
              </div>
              <button className="add-to-cart-button" onClick={addToCart}>
                <FaCartPlus size={20} />
                ADD TO CART
              </button>
            </div>
            <span className="divider" />
            <div className="info-item">
              <span className="text-bold">
                Category:
                <span> {selectedProduct.category}</span>
              </span>
              <span className="text-bold">
                Share:
                <span className="social-icons">
                  <FaFacebookF size={16} />
                  <FaTwitter size={16} />
                  <FaInstagram size={16} />
                  <FaLinkedinIn size={16} />
                  <FaPinterest size={16} />
                </span>
              </span>
            </div>
          </div>
        </div>
        <RelatedProducts />
      </div>
    </div>
  );
};

export default SingleProduct;
