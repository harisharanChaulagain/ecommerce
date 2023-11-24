import React from "react";
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

  const selectedProduct = productData.find(
    (product: Product) => product._id === id
  );

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
                <span>-</span>
                <span>3</span>
                <span>+</span>
              </div>
              <button className="add-to-cart-button">
                <FaCartPlus size={20} />
                ADD TO CART
              </button>
            </div>
            <span className="divider" />
            <div className="info-item">
              <span className="text-bold">
                Category:
                <span>Phone</span>
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
