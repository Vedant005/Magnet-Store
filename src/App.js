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
function App(){
      





   return (
  <div className="App">

     

    <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/product" element={<ProductPage/>} />
       <Route path="/product/:productId" element={<SingleProduct />} />
        <Route path="/cart" element ={<RequiresAuth><Cart/></RequiresAuth>}/>
        <Route path="/wishlist" element ={<RequiresAuth><Wishlist/></RequiresAuth>}/>
       <Route path="/login"element={ <Login />}/>
       <Route
        path ="userDetails" 
        element={
          <RequiresAuth>
            <UserDetails/>
          </RequiresAuth>
        }
       />
       <Route path="signup" element= {<Signup/>}/>
      
    </Routes>
    {/* <Mockman/> */}
  </div>
);
}

    
export default App;
