
// import { useData } from "../contexts/dataContext";
import "./ProductPage.css"
import React from "react";
import Filter from "./filter";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import Product from "./Product.jsx";
import { useData } from "../contexts/dataContext";
export default function ProductPage(){
    // {state.map((product)=>{
    //     <Product product={product} key={product._id}/>
    //    })}
//   const data=useProduct();

 const {data}=useData();
  // console.log(data?.everyProduct)
//  console.log(data.everyProduct.products)
//   const info=data.everyProduct
//   console.log(info)
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
   {/* <div>
   <h1>Products</h1>

   </div> */}

       {data && data?.map((allproducts)=>{
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