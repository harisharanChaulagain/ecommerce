import React from "react";
import "./Home.scss";
import Banner from "./Banner/Banner";
import Newsletter from "../Footer/Newsletter/Newsletter";

const Home = () => {
  return (
    <div className="home">
      <Banner />
      <Newsletter />
    </div>
  );
};

export default Home;
