import React from "react";
import "./Home.scss";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Products from "../Products/Products";
import { useCompanyDetails, useProduct } from "../../api/GetApi";
import NewProfile from "../Header/ProfileDetails/NewProfile/NewProfile";
import Cookies from "js-cookie";

const Home = () => {
  const { data: productData } = useProduct();
  const { data: companyData }: any = useCompanyDetails();
  const isUserLoggedIn = localStorage.getItem("isLogin") === "true";
  const isAdminLoggedIn = () => {
    return Cookies.get("adminToken") !== undefined;
  };

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
      {Array.isArray(companyData) &&
        companyData.length === 0 &&
        isAdminLoggedIn() &&
        isUserLoggedIn && <NewProfile />}
    </div>
  );
};

export default Home;
