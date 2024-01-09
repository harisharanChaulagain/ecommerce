import React, { useState, useEffect } from "react";
import "./Banner.scss";
import { useProduct } from "../../../api/GetApi";
import { useNavigate } from "react-router";
import { typeWriter } from "../../../utils/typewriterUtils";
import { bufferToDataURL } from "../../../utils/imageUtils";

const Banner = () => {
  const { data: productData } = useProduct();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newName, setNewName] = useState("");

  const name =
    "Shop the Future: Elevate Your Style, Elevate Your Life. Explore Endless Possibilities at Hamro Bazar.";

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === productData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? productData.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === productData?.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [productData?.length]);

  useEffect(() => {
    typeWriter(name, setNewName);
  }, []);

  return (
    <div
      className="hero-banner"
      style={{ backgroundImage: "linear-gradient(to right, #374046, #6b7074)" }}
    >
      <div className="content">
        <div className="text-content">
          <h1>SALES</h1>
          <p>{newName}</p>
          <div className="ctas">
            <div
              className="banner-cta"
              onClick={() => {
                navigate(`/product/${productData[currentImageIndex]._id}`);
                window.scrollTo(0, 0);
              }}
            >
              Shop Now
            </div>
          </div>
        </div>
        {productData && productData.length > 0 && (
          <div className="image-container">
            <button className="prev-button" onClick={handlePrevImage}>
              {"<"}
            </button>
            <img
              className="banner-img"
              src={bufferToDataURL(productData[currentImageIndex]?.image?.data)}
              alt="Banner Image"
            />
            <button className="prev-button" onClick={handleNextImage}>
              {">"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
