import React from "react";
import "./Banner.scss";
import { useProduct } from "../../../api/GetApi";
import { useNavigate } from "react-router";

const Banner = () => {
  const { data: productData } = useProduct();
  const navigate = useNavigate();

  return (
    <div
      className="hero-banner"
      style={{ backgroundImage: "linear-gradient(to right, #374046, #6b7074)" }}
    >
      <div className="content">
        <div className="text-content">
          <h1>SALES</h1>
          <p>
            Shop the Future: Elevate Your Style, Elevate Your Life. Explore
            Endless Possibilities at Hamro Bazar.
          </p>
          <div className="ctas">
            <div
              className="banner-cta"
              onClick={() => {
                navigate(`/product/${productData[0]._id}`);
                window.scrollTo(0, 0);
              }}
            >
              Shop Now
            </div>
          </div>
        </div>
        {productData && productData.length > 0 && (
          <img
            className="banner-img"
            src={`../../../../public/product/${
              productData[0].image.split("/")[2]
            }`}
            alt="Banner Image"
          />
        )}
      </div>
    </div>
  );
};

export default Banner;
