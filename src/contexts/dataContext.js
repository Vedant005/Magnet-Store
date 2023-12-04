import React from "react";
import { useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { filterReducer } from "../reducers/filterReducer.jsx";
import { useProduct } from "./productContext";
// import { SORT_BY_PRICE } from "../variables/variables.js";
import { cartReducer } from "../reducers/cartReducer.jsx";



const DataContext = createContext();
 

 
 
function DataProvider({children}){



    const initialFilterValue={
        sortBy:"",
        pricerange:5000,
        choiceCategory:[],
        searchItem:""
     }
    
     const intialValue={
        cart:"",
        wishlist:""
     }
     
    
    let {everyProduct}=useProduct();
    
    //    console.log(productState?.everyProduct.products)
    let filterpro = everyProduct?.products
    const getData = (state) => {
    
          if(state.sortBy === "hightolow")
    filterpro=filterpro.sort(function(a,b){
        return b.price - a.price;
        // dispatchFilter({type:SORT_BY_PRICE,payload:product})
    })

   else if(state.sortBy === "lowtohigh")
    filterpro=filterpro.sort(function(a,b){
        return a.price -  b.price;
    })

    /// Filters for price range input
    // if (state.pricerange !== "") {
    //  filterpro= filterpro.filter(({price}) => 
    //     //   return (
    //     //     product.price >= state.pricerange.min &&
    //     //     product.price <= state.pricerange.max
    //     //   );
    //      Number(price)<=Number*filterProduct?.pricerange
    //     );
    //   }
// console.log(filter)
//    if(state.choiceCategory.length>0){
//     filterpro=filterpro.filter((product)=>{
//         state.choiceCategory.includes(product.categoryName)
//     })
//    }
//    if(state.searchItem.length>0){
//     filterpro= filterpro.filter((product)=>{
//         product.title.toUpperCase().includes(state.searchItem.toUpperCase())
//     })
//    }
 
return filterpro;

   }

   const [filterProduct,dispatchFilter]= useReducer(filterReducer,initialFilterValue)

   const [state,dispatch]=useReducer(cartReducer,intialValue)
   return(
    <div>
        
        <DataContext.Provider value={{filterProduct,dispatchFilter,data:getData(filterProduct),state,dispatch}}>
            {children}
        </DataContext.Provider>
    </div>
   )




}


const useData=()=>useContext(DataContext);
export {DataProvider,useData};

