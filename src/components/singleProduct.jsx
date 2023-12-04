import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";

import { useProduct } from "../contexts/productContext";
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
    
       <img className="single-card" src ={img} alt="product"/>
   
    <p>{price}</p>
  <AddToCart singularProduct={getsingle}/>
  
    </div>
  
    
   </div>

)



}

