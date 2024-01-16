import React, { useState, useContext } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaCartPlus,
  FaPinterest,
  FaExclamationCircle,
} from "react-icons/fa";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import "./SingleProduct.scss";
import { useParams } from "react-router-dom";
import { useProduct } from "../../api/GetApi";
import { Context } from "../../utils/context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import StarRating from "../StarRating/StarRating";
import Cookies from "js-cookie";
import { bufferToDataURL } from "../../utils/imageUtils";
import { Axios } from "../../lib/Axios";

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
  const [userRating, setUserRating] = useState<number | null>(null);

  const selectedProduct = productData?.find(
    (product: Product) => product._id === id
  );
  const outOfStock = selectedProduct?.units === 0;
  const exceedQuantity = quantity < selectedProduct?.units;

  const isUserLoggedIn = () => {
    return Cookies.get("token") !== undefined;
  };

  const decrement = () => {
    setQuantity((prevState: any) => {
      if (prevState === 1) return 1;
      return prevState - 1;
    });
  };

  const increment = () => {
    if (exceedQuantity) {
      setQuantity((prevState: any) => prevState + 1);
    } else {
      toast.warn("Exceed the Stock quantity!");
    }
  };
  const addToCart = () => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    const adminToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)adminToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (adminToken) {
      toast.warn("Admin can't add product to cart!");
    } else if (token) {
      setProductQuantities((prevQuantities: any) => [
        ...prevQuantities,
        quantity,
      ]);
      setProductIds((prevIds: any) => [...prevIds, selectedProduct._id]);
    } else {
      toast.warn("Login before add to cart!");
      navigate("/login");
    }
  };

  const handleRating = async (rating: number) => {
    try {
      await Axios.post(`/api/v1/products/${id}/rate`, {
        rating,
      });

      setUserRating(rating);
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <div className="single-product-main-content">
      <div className="layout">
        <div className="single-product-page">
          <div className="left">
            <img
              src={
                selectedProduct?.image?.data
                  ? bufferToDataURL(selectedProduct?.image?.data)
                  : ""
              }
              alt={selectedProduct?.name}
            />
          </div>
          <div className="right">
            <span className="name">{selectedProduct?.name}</span>
            <span className="price">&#8377; {selectedProduct?.price}</span>
            <span className="desc">{selectedProduct?.description}</span>
            <div className="cart-buttons">
              <div className="quantity-buttons">
                <span onClick={decrement}>-</span>
                <span>{quantity}</span>
                <span onClick={increment}>+</span>
              </div>
              <div>
                <button
                  className={`add-to-cart-button ${
                    outOfStock ? "disable" : ""
                  }`}
                  onClick={addToCart}
                >
                  <FaCartPlus size={20} />
                  ADD TO CART
                </button>
                {outOfStock && (
                  <div className="out-of-stock">
                    <FaExclamationCircle size={20} />
                    Out of Stock!
                  </div>
                )}
              </div>
            </div>
            <span className="divider" />
            <div className="info-item">
              <span className="text-bold">
                Category:
                <span> {selectedProduct?.category}</span>
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
            <span className="divider" />
            {isUserLoggedIn() && (
              <div className="info-item">
                <span className="text-bold">Ratings & Reviews </span>
                {userRating !== null ? (
                  <div className="user-rating">
                    <StarRating rating={userRating} />
                  </div>
                ) : (
                  <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => handleRating(star)}
                        className={star <= (userRating ?? 0) ? "selected" : ""}
                      >
                        <StarRating rating={star} />
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <RelatedProducts currentProductCategory={selectedProduct?.category} />
      </div>
    </div>
  );
};

export default SingleProduct;
