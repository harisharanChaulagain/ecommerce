import React, { useContext, useEffect } from "react";
import "./Home.scss";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Products from "../Products/Products";
import { useProduct } from "../../api/GetApi";
import { Context } from "../../utils/context";

const Home = () => {
  const { data: productData } = useProduct();
  const { setProductQuantities, setProductIds, clearCart }: any =
    useContext(Context);

  useEffect(() => {
    if (clearCart === true) {
      setProductQuantities([]);
      setProductIds([]);
    }
  }, [clearCart]);

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
