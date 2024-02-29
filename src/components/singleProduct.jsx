import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import "./single.css"
import { useProduct } from "../contexts/productContext";
import { CartContext } from "../contexts/CartContext";
import { useContext } from "react";

import { Header } from "./Header";
import { useWish } from "../contexts/WishlistContext";
export default function SingleProduct(){
   
   
   
  const {getsingleProduct}= useProduct();

  const {addToCart}= useContext(CartContext);

  
  const {addToWishListHandler}=useWish(); 

  const [getsingle,setsingleProduct]= useState({});

  const {productId}= useParams();
   
  
  const getProduct=async()=>{
   try{
       const product = await getsingleProduct(productId)
      
       setsingleProduct(product?.product)
      
   }
   catch(e){
      console.log(e)
  
   }
}
useEffect(()=>{
  getProduct();
// eslint-disable-next-line
},[])


    // const indvidualProduct= data?.find(({_id})=>productId===_id)
const {title,price,img,ratings}= getsingle;
 


return(
   <div>
      <Header/>
 <div className="main">
 
   <div className="single-main-container">
   
    <div className="image-container">
     <img className="single-card" src ={img} alt="product"/>
   </div>
   <div className="details-container">
      <div>
      <h1>{title}</h1>
     
       <p>MRP: {price}</p>
       <p>Rating : {ratings}⭐</p>
       </div>
       <div className="wishlist">
       <button className="wishlist-tag" onClick={()=>addToWishListHandler(getsingle)}>Add to wishlist</button>
       </div>
       <div>
       <button onClick={()=>addToCart(getsingle)} className="addCart">Add to cart</button>
      </div>

    </div>
  
    
   </div>
   </div>
</div>
)



}

