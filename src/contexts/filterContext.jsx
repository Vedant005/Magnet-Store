import { ProductContext } from "./productContext";

import filterReducer from "../reducers/filterReducer";
import { useContext,createContext,useReducer } from "react";

export const FilterContext = createContext();

const FilterProvider = ({childern})=>{
    const{productState}=useContext(ProductContext);

    const initialFilter = {
        search:"",
        sortBy:"",
        priceRange:5000,
        categoryFilter:[],
        searchItem:"",
        ratings:""
    }

    const [filterState,filterDispatch]=useReducer(filterReducer,initialFilter);
 
    const searchFilteredProducts = filterState?.search?.length > 0 ? productState?.products.filter(({title})=>
    title.toLowerCase().includes(filterState?.search.toLowerCase()) 
    ):productState?.products;

    const priceRangeFilteredProducts = searchFilteredProducts?.filter(
        ({ price }) => Number(price) <= Number(filterState?.priceRange)
      );
    
      const categoryFilteredProducts =
        filterState?.categoryFilter?.length > 0
          ? priceRangeFilteredProducts?.filter(({ categoryName }) =>
              filterState?.categoryFilter?.includes(categoryName)
            )
          : priceRangeFilteredProducts;
    
      
    
      const ratingFilteredProducts =
        filterState?.ratings?.length > 0
          ? categoryFilteredProducts?.filter(
              ({ ratings: { value } }) =>
                Number(value) >= Number(filterState?.ratings)
            )
          : categoryFilteredProducts;
    
      const sortByPriceFilteredProducts =
        filterState?.sortBy?.length > 0
          ? (() => {
              switch (filterState.sortBy) {
                case "LTH":
                  return [...ratingFilteredProducts]?.sort(
                    (product1, product2) => product1.price - product2.price
                  );
                case "HTL":
                  return [...ratingFilteredProducts]?.sort(
                    (product1, product2) => product2.price - product1.price
                  );
                
                default:
                  return ratingFilteredProducts;
              }
            })()
          : ratingFilteredProducts;



    return(
        <FilterContext.Provider value={{filterState,filterDispatch,sortByPriceFilteredProducts}}>
        {childern}
        </FilterContext.Provider>

    )
}

export default FilterProvider;


