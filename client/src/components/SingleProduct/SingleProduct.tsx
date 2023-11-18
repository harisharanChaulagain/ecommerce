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
import iphone from "../../assets/iphone.png";
import "./SingleProduct.scss";

const SingleProduct = () => {
  return (
    <div className="single-product-main-content">
      <div className="layout">
        <div className="single-product-page">
          <div className="left">
            <img src={iphone} alt="img" />
          </div>
          <div className="right">
            <span className="name">Iphone</span>
            <span className="price">R.S.435343</span>
            <span className="desc">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Dignissimos reiciendis amet dolorum hic deleniti doloremque
              tenetur non exercitationem autem. Nostrum nihil vitae quae
              distinctio similique quas sequi quis numquam earum?
            </span>
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
