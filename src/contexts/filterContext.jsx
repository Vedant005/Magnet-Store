import { ProductContext } from "./productContext";

import filterReducer from "../reducers/filterReducer";
import { useContext,createContext,useReducer } from "react";

export const FilterContext = createContext();

const FilterProvider = ({childern})=>{
    const{productState}=useContext(ProductContext);

    const initialFilter = {
        search:"",
        sortBy:"",
        pricerange:5000,
        choiceCategory:[],
        searchItem:"",
        ratings:""
    }

    const [filterState,filterDispatch]=useReducer(filterReducer,initialFilter);




    return(
        <FilterContext.Provider value={{filterState,filterDispatch}}>
        {childern}
        </FilterContext.Provider>

    )
}

export default FilterProvider;


