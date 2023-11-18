import React from "react";
import "./Banner.scss";
import BannerImg from "../../../assets/banner-image1.png";

const Banner = () => {
  return (
    <div
      className="hero-banner"
      style={{ backgroundImage: "linear-gradient(to right, #8e2de2, #4a00e0)" }}
    >
      <div className="content">
        <div className="text-content">
          <h1>SALES</h1>
          <p>
            Shop the Future: Elevate Your Style, Elevate Your Life. Explore
            Endless Possibilities at Hamro Bazar.
          </p>
          <div className="ctas">
            <div className="banner-cta">Read More...</div>
            <div className="banner-cta v2">Shop Now</div>
          </div>
        </div>
        <img className="banner-img" src={BannerImg} alt="Banner Image" />
      </div>
    </div>
  );
};

export default Banner;
