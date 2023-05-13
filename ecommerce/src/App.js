import React from "react";
import Products from "./Componnents/Products";
import Product from "./Componnents/Product";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./ComponnentGlobal/Header";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="product/:id" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
