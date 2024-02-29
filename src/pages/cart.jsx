


import { CartContext } from "../contexts/CartContext";
import { useContext } from "react";
import { Header } from "../components/Header";
import { NavLink } from "react-router-dom";
import "./cart.css"
import { useNavigate } from "react-router-dom";

export default function Cart(){
   const{cart, totalItems, productQuantityIncrement, productQuantityDecrement, removeFromCart, totalPrice ,}=useContext(CartContext);
  
    const navigate = useNavigate();
  
  
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
         <div className="cart-div">
          {
            cart.map((item)=>{
               const {_id,title,price,ratings,img,quantity}=item;
               return(
               <div className="cart-product-main">
                  
     <NavLink to={`/product/${_id}`}> <div className="cartItemImgDiv">
      <img className="cartItemImg" src={`${img}`} alt="cartItemImg" />
      </div>
      </NavLink>

                     <div className="cart-details-div">
                        
                           <h1 className="cart-title">{title}</h1>
                          
                          <p>Rating ={ratings}</p>

                              <p>Price ={price}</p>
                                   <div className="quantity">
                               {/* <button className="decrement"  >-</button>
                              <div type="Number" className="quantityDiv">9</div>
                            <button className="increment" >+</button> */}
                  <button className="decrement" onClick={() => productQuantityDecrement(item)}disabled={quantity=== 1} >-</button>
                             <div type="Number" className="quantityDiv">{quantity}</div>
                             <button className="increment" onClick={() => productQuantityIncrement(item)} >+</button>
                            </div>
                        <div>
                        <button onClick={() => {removeFromCart(item)}}className="cartItemBtn"  > Remove</button>
                           </div>
                           
                    </div>
                     </div>
                     
               )
                             
            }
            )
          }
          </div>

          <div className="cartSummary">
            <div className="summary-details">
               <div className="cartTotal">
                  <div className="product-item">
                  <div className="product-details">
                  <p>Price :({totalItems} items) </p>
                {/* <p>Discount</p> */}
                <p>Delivery Charges</p>
                {/* <p>Coupon Discount</p> */}
                <p><b>Total Amount</b></p>
                     </div>

                     <div className="product-price">
                     <p>₹{totalPrice}</p>
                              {/* <p>₹{totalPriceDiscount}</p> */}
                              <p>Free</p>
                               <p><b>₹{totalPrice}</b></p>
                        </div>
                        <button className="checkout " onClick={()=> navigate("/checkout")} > Checkout</button>
                        </div>
                  </div>
               </div>
            </div>
         </div>
         )}
 
   </div>
  
   </div>
  )

   
}