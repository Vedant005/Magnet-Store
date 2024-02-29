import "./App.css";
import React from "react";


import Home from "./pages/Home.jsx";
import Login from "./pages/login.jsx";
import Cart from "./pages/cart.jsx";
import { Routes, Route } from "react-router-dom";
import { RequiresAuth } from "./components/requiresAuth.js";
import SingleProduct from "./components/singleProduct";
import ProductPage from "./pages/ProductPage";
import Wishlist from "./pages/Wishlist.jsx";
import { UserDetails } from "./components/userDetails.jsx";
import Signup from "./pages/Signup.jsx";
import Checkout from "./pages/checkout.jsx";
function App(){
      





   return (
  <div className="App">

     

    <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/product" element={<ProductPage/>} />
       <Route path="/product/:productId" element={<SingleProduct />} />
        <Route path="/cart" element ={<Cart/>}/>
        <Route path="/wishlist" element ={<Wishlist/>}/>
       <Route path="/login"element={ <Login />}/>
       <Route
        path ="userDetails" 
        element={
          <RequiresAuth>
            <UserDetails/>
          </RequiresAuth>
        }
       />
       <Route path="/checkout" element={<Checkout/>}/>
       <Route path="signup" element= {<Signup/>}/>
    </Routes>
   
  </div>
);
}

    
export default App;
