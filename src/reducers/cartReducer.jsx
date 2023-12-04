import { UPDATE_CART ,UPDATE_WISHLIST} from "../variables/variables";



export const cartReducer=(state,action)=>{
    switch(action.type){
        case UPDATE_CART:
            return{...state,cart:action.payload}

         case UPDATE_WISHLIST:
            return{...state,wishlist:action.paylaod}    
     
    
        default:return state;
    
        }

}