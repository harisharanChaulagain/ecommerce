import React from "react";
import "./Home.scss";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Products from "../Products/Products";
import { useProduct } from "../../api/GetApi";

const Home = () => {
  const { data: productData } = useProduct();

  return (
    <div>
      <Banner />
      <div className="main-content">
        <div className="layout">
          <Category />
          <Products
            headingText={"Popular Products"}
            innerPage={false}
            products={productData}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
