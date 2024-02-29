import React, { useContext } from "react";

import "./Product.css"

import { FaHeart } from "react-icons/fa6";
import {  useWish } from "../contexts/WishlistContext.js";
import {  useNavigate} from "react-router-dom";
import { CartContext } from "../contexts/CartContext.js";
import { useUser } from "../contexts/UserContext.js";
export default function Product({product}){
   const {addToCart}= useContext(CartContext);
    const {authState}= useUser();
   
     const {addToWishListHandler}=useWish(); 
   const {
    _id,
    title,
    ratings,
    price,
   
    img
  } = product

  //  const isItemInCart = (data, id) => {
  //   return data?.find((item) => item._id === id) ? true : false;
  // };
  const navigate=useNavigate();

    return(
        <div >
         
            <div className="product-container"
            key={_id}
            >
                      
                           
                <div className="card-img"
                 
                 >
                    
                     <img className="image-tag" 
                     src={`${img}`} alt="product"
                     onClick={() => navigate(`/product/${_id}`)} />

                  <button className="wishlist-icon" onClick={()=>addToWishListHandler(product)}><FaHeart/></button>

                </div>
                                
            <div className="title-div">
                <h2>{title}</h2>
             
               </div>
              
                <div className="price-rating">
                  <div>
                <p>
                <span className="stirke-through">MRP: {price} </span>
                 
                </p>
                </div>
                <div>
                  <p>{ratings}⭐</p>

                </div>


                </div>
               
            
              <div className="cart-btn">
           <button onClick={()=>{
            if (authState.isLoggedIn) {
              
               addToCart(product)
              
            } else {
              navigate("/login");
            }
           }} className="addCart">Cart</button>
            </div>
               </div>
            </div>
            
              
            
    )
              }