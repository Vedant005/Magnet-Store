import { GET_ALL_PRODUCTS } from "../variables/variables";
import { GET_SINGLE_PRODUCT } from "../variables/variables";
import { GET_CATEGORIES } from "../variables/variables";
export const dataReducer  = (state,action) =>{

   // const {type,payload} = action 
switch(action.type) {
    case GET_ALL_PRODUCTS:
     return{ ...state, everyProduct:action.payload}    
     
     case GET_SINGLE_PRODUCT:
      return {
        ...state,
      
        singleProduct: action.payload,
      };

      case GET_CATEGORIES:
         return{...state , choiceCategory:action.payload}

     default:
        return state;
}


    
}