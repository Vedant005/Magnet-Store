import { useParams } from "react-router-dom";
import { useState,useEffect, useContext } from "react";
import { useData } from "../contexts/dataContext";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../contexts/productContext";
import { CartContext } from "../contexts/CartContext";
import AddToCart from "./AddToCart";
export default function SingleProduct(){
   
   
   
  const {getsingleProduct}= useProduct();

 
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
  getProduct() 
},{})


    // const indvidualProduct= data?.find(({_id})=>productId===_id)
const {title,price,img}= getsingle;
 

// const navigate=useNavigate();
// !indvidualProduct && navigate("/product")
return(

   <div>
    <h1>Single Page</h1>
    <div>
    <h2>{title}</h2>
    
       <img className="single-card-img" src ={img}/>
   
    <p>{price}</p>
  <AddToCart singularProduct={getsingle}/>
  
    </div>
  
    
   </div>

)



}

