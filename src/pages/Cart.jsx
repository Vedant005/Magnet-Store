import React from 'react'
import Header from '../components/Header';

function Cart() {
    const{cart, totalItems, productQuantityIncrement, productQuantityDecrement, removeFromCart, totalPrice ,}=useContext(CartContext);


  return (
    <div>
      
      <div>
        <Header/>
      </div>
      <div>
         {cart.lenght === 0} ?(
            <div>
                <p>There is nothing in here</p>
            </div>
         ):(
            <div className='cart-main'>
                {cart.map((item)=>{
                const {_id,title,price,ratings,img,quantity}=item;

                return(
                    <div className="cart-product-main">
                  
                     <NavLink to={`/product/${_id}`}> 
                      <div className="cartItemImgDiv">
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

                })}
                
            </div>
         )
      </div>
        
    </div>
  )
}

export default Cart