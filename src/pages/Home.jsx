import React from "react";

import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import  bowl from "../images/bowl.jpg";
import  glass from "../images/glass.jpg";
import  plates from "../images/plates.jpg";
import  dinnerset from "../images/dinnerset.jpg";
import  milton from "../images/milton.png";
import  Borosil from "../images/Borosil.png";
import  treo from "../images/treo.png";
import  claycraft from "../images/claycraft.jpg";
import "./Home.css"

export default function Home() {
        
  // useEffect(()=>{
  // axios 
  // .get("/api/products")
  // .then((res)=>
  // console.log(res))
  // },[])
  return (
   <div class="main-container">
 <Header />
 
   
   <div class="hero-container">
    <div class="info">
        <h1>Unveiling the new</h1>
    <p>Upto 80% off</p>
    <button class="primary"> SHOP NOW</button>
    </div>
    
    </div>
    <h1>Featured Categories</h1>
    <div class="category-container">
         

          <div>
            <img class="category" src={bowl}alt="bowl"/>
           <div>Bowl</div>
          </div>

        
          <div>
            <img class="category" src={glass}alt="glass"/>
            <div>Glass</div>
          </div>

          <div>
            <img class="category" src={plates}alt="plates"/>
            <div>Plates</div>
          </div>
          <div>
            <img class="category" src={dinnerset}alt="dinnerset"/>
            <div>Dinnerset</div>
          </div>
    </div>
    <h1> Featured Brands</h1>
    <div class="featured-brands">
       
      < div>
            <img class="brand" src={milton}alt="milton"/>
          
          </div>
          < div>
            <img class="brand" src={Borosil}alt="borosil"/>
          
          </div>
          < div>
            <img class="brand" src={treo}alt="treo"/>
          
          </div>
          < div>
            <img class="brand" src={claycraft}alt="claycraft"/>
          
          </div>
          
    </div>
    <Footer/>
    </div>
  );
}
