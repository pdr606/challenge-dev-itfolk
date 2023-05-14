import React from "react";
import Products from "./Componnents/Products";
import Product from "./Componnents/Product";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./ComponnentGlobal/Header";
import { GlobalProvider } from "./Context/GlobalContext";
import Storage from "./Componnents/Storage";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="/shoppingCart" element={<Storage />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
