
import { SORT_BY_PRICE,SORT_BY_RANGE,FILTER_BY_CATEGORY, SEARCH_PRODUCT ,SORT_BY_RATING ,CLEAR_ALL_FILTERS} from "../variables/variables.js";


const filterReducer=(state,action)=>{
    switch(action.type){
        case  SORT_BY_PRICE:
            return {...state,sortBy:action.payload};

          
        case SORT_BY_RANGE:
            return{...state,priceRange:action.payload}
    
        case FILTER_BY_CATEGORY:
            const updatedCategory = state.categoryFilter.includes(action.payload)
            ? state.categoryFilter.filter(
                (addedCategory) => addedCategory !== action.payload
              )
            : [...state.categoryFilter, action.payload];
        return{...state,categoryFilter:updatedCategory}

        case SORT_BY_RATING:
            return{...state,ratings:action.payload}


        case SEARCH_PRODUCT:
            return{...state,search:action.payload}

         case CLEAR_ALL_FILTERS:
          return {
            search:"",
            sortBy:"",
            priceRange:5000,
            categoryFilter:[],
            searchItem:"",
            ratings:""
                };
          





            default:
                return state;
    
    
        }
};

export default filterReducer;