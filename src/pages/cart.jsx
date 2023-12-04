


import { NavLink, useParams } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { useContext, useState } from "react";
import { Header } from "../components/Header";
import { useData } from "../contexts/dataContext";
import { useProduct } from "../contexts/productContext";
import { Footer } from "../components/Footer";



export default function Cart(){
   const{cart, totalItems, addToCart,quantity, productQuantityIncrement, productQuantityDecrement, removeFromCart, priceOfAllItems, totalPriceDiscount, totalPrice ,setCart}=useContext(CartContext);
  
   
  
  
  return(
   <div>
      {/* <div>
      <Header/>
      </div> */}
      <Header/>
      <h1> Items in Cart: {cart.length} </h1>
   
   <div className="cart-info-card">

      {cart.length ===0 ?(
         <div>
            <p>There is nothing in cart</p>
            </div>
      ):(
      <div className="cart-main">
          {
            cart.map((item)=>{
               const {_id,image,title,price,categoryName,ratings}=item;
               return(
               <div className="cart-product-main" key={_id}>
                  
                     

                     <div className="cart-details-div">
                           <h1>{title}</h1>
                          
                          <p>Rating ={ratings}</p>

                              <p>Price ={price}</p>
                                   <div className="quantity">
                               {/* <button className="decrement"  >-</button>
                              <div type="Number" className="quantityDiv">9</div>
                            <button className="increment" >+</button> */}
                              
                        </div>
                        <div>
                        <button className="cartItemActionBtn" > Remove</button>
                           </div>
                           
                    </div>
                     </div>
                     
               )
                             
            }
            )
          }
         </div>
         )}
 
   </div>
    <Footer/>
   </div>
  )

   
}