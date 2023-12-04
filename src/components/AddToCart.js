import { NavLink } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function AddToCart({singularProduct}){
  const {addToCart}=useCart();
    return(
    <div>
         
       <NavLink to = "/cart" onClick={()=>addToCart(singularProduct)}>
        
         <button className="addtocart" >Add to cart </button>
        </NavLink>
        
    </div>
    )
}


