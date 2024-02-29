
import "./ProductPage.css"
import React from "react";
import Filter from "./filter";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import Product from "./Product.jsx";

import { useData } from "../contexts/dataContext.js";
export default function ProductPage(){
    
  const {data }= useData();

  return(
    <div>
    <div className="header-div">
          <Header/>

    </div>
    <div className="filter-and-products">
    <div className="filter-div">
        <Filter/>

    </div>
 <div className="product-div">
 

       {data && data.map((allproducts)=>{
        return( 
        <Product product={allproducts} />
        )

       
       })}

 </div>
 </div>
 <div className="footer-div">
    <Footer/>
 </div>
    </div>
    
        )
}