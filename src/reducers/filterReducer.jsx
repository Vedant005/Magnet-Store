
import { SORT_BY_PRICE,SORT_BY_RANGE,FILTER_BY_CATEGORY, SEARCH_PRODUCT } from "../variables/variables.js";
const filterReducer=(state,action)=>{
    switch(action.type){
        case  SORT_BY_PRICE:
            return {...state,sortBy:action.payload};

          
        case SORT_BY_RANGE:
            return{...state,pricerange:action.payload}
    
        case FILTER_BY_CATEGORY:
            const updatedCategory = state.choiceCategory.includes(action.payload)
            ? state.choiceCategory.filter(
                (addedCategory) => addedCategory !== action.payload
              )
            : [...state.choiceCategory, action.payload];
        return{...state,choiceCategory:updatedCategory}

        case SEARCH_PRODUCT:
            return{...state,searchItem:action.payload}







            default:
                return state;
    
    
        }
};

export {filterReducer};