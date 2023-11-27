import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Category from "./components/Category/Category";
import Footer from "./components/Footer/Footer";
import Newsletter from "./components/Footer/Newsletter/Newsletter";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import AppContext from "./utils/context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollUpButton from "./components/ScrollUpButton/ScrollUpButton";
import Khalti from "./components/Khalti/Khalti";
import Login from "./components/Auth/Login/Login";
import Signup from "./components/Auth/Signup/Signup";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContext>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/payment/:id" element={<Khalti />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Routes>
        <Newsletter />
        <Footer />
        <ScrollUpButton />
      </AppContext>
    </BrowserRouter>
  );
};

export default App;
