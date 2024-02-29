import React from "react";

import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";

import "./Home.css"
import { useData } from "../contexts/dataContext.js";
import { useProduct } from "../contexts/productContext.js";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const {dispatchFilter}=useData();
  const {choiceCategory}= useProduct();
  const navigate = useNavigate();


  return (
   <div class="main-container">
    <div className="header-div">

 
      <Header />
     </div> 
   <div className="main-content">
   <div class="hero-container">
     <div className="heroimg">

      <div className=" hero-details">
      <div className="desc">
       Welcome!
      
      
        <button className="primary" onClick={()=> navigate("/product")}> SHOP NOW</button>
        </div>
      </div>


     </div>
 
    
    </div>
    <div className="category-heading">
    <h1>Featured Categories</h1>
    </div>
     
     <div class="category-container">
         
         <div className="e-category">
         {choiceCategory?.map(({ _id, categoryName,img  }) => {
          return(
            <div key={_id}
              
               className="featured-cat-details"
                onClick={() =>{
                  dispatchFilter({
                    type: "FILTER_BY_CATEGORY",
                    payload: categoryName,
                  })
                  navigate("./product")
                }}
              >    
                <div className="featured-card-image">
                    <img src={img} alt={categoryName} width="100%" height="100%" />
                  
                   <div className="featured-card-details">
                     <p className="featured-card-title">{categoryName}</p>
                   </div>  
                  </div>    
            </div>
          )})}
         </div>
         </div>

        </div>
     
    <div className="footer-section">

    <Footer/>
    </div>
    </div>
  );
}
