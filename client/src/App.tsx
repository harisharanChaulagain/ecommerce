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
import AdminLogin from "./components/Auth/Admin/AdminLogin";
import CategoryTable from "./components/Category/CategoryTable/CategoryTable";
import ProductsTable from "./components/Products/ProductsTable/ProductsTable";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";

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
          <Route path="admin/login" element={<AdminLogin />} />
          <Route path="/category/table" element={<CategoryTable />} />
          <Route path="/product/table" element={<ProductsTable />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
        <Newsletter />
        <Footer />
        <ScrollUpButton />
      </AppContext>
    </BrowserRouter>
  );
};

export default App;
