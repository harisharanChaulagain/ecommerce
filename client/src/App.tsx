import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Category from "./components/Category/Category";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import AppContext from "./utils/context";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContext>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:id" element={<Category />} />
        </Routes>
        <Footer />
      </AppContext>
    </BrowserRouter>
  );
};

export default App;
