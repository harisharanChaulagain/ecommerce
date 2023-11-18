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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
            voluptates obcaecati explicabo sapiente. Quis iusto tempora
            voluptate optio, soluta excepturi eligendi corporis corrupti,
            pariatur sapiente eveniet fugit maxime accusantium nesciunt.
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
