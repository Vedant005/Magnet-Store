import "./App.css";
import React from "react";
import logo from "./logo.png";
import {useState} from "react"
import { useEffect } from "react";
import axios from "axios";

import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx";
import Login from "./pages/login.jsx";
import Cart from "./pages/cart.jsx";
import { Routes, Route } from "react-router-dom";
import { RequiresAuth } from "./components/requiresAuth.js";
import SingleProduct from "./components/singleProduct";
import ProductPage from "./pages/ProductPage";
import Wishlist from "./pages/Wishlist.jsx";
function App(){
      





   return (
  <div className="App">

     

    <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/product" element={<ProductPage/>} />
       <Route path="/product/:productId" element={<SingleProduct />} />
        <Route path="/cart" element ={<RequiresAuth><Cart/></RequiresAuth>}/>
        <Route path="/wishlist" element ={<RequiresAuth><Wishlist/></RequiresAuth>}/>
       <Route
        path="/login"
        element={
        
            <Login />
         
        }
      />
      
    </Routes>
    {/* <Mockman/> */}
  </div>
);
}

    
export default App;
