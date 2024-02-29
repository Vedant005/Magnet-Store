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
        search:"",
        sortBy:"",
        pricerange:5000,
        choiceCategory:[],
        searchItem:"",
        ratings:""
     }
    
     const intialValue={
        cart:"",
        wishlist:""
     }
    
     const {everyProduct}=useProduct();
     const [filterProduct,dispatchFilter]= useReducer(filterReducer,initialFilterValue)
const getData =(state)=>{
 
  
  let info= everyProduct?.products
 
    if(state?.search?.length > 0)
       info = info?.filter(({ title }) =>
          title.toLowerCase().includes(state?.search.toLowerCase())
        )
       
        if (state.sortBy === "hightolow")
        info = info.sort(function (a, b) {
          return b.price - a.price;
        });
      else if (state.sortBy === "lowtohigh")
        info = info.sort(function (a, b) {
          return a.price - b.price;
        });
     
      // if(state.pricerange!==""){
      // info=  info.filter(
      //   ({ price }) => Number(price) <= Number(state?.priceRange)
      // );
      // }
      
    if(state?.choiceCategory?.length > 0)
      info = info?.filter(({ categoryName }) =>
          state?.choiceCategory?.includes(categoryName)
        )
     
      
        if (state.pricerange !== "") {
         info = info?.filter(
            ({ price }) => Number(price) <= Number(filterProduct?.pricerange)
          );
               }


      if(state?.ratings?.length > 0){
        info =info?.filter(
            ({ ratings: { value } }) =>
              Number(value) >= Number(filterProduct?.ratings)
          )
        }
          
        return info;

        }

   
    //   const sortByPriceFilter= filterProduct?.searchFilter?.length>0?
    //    console.log(productState?.everyProduct.products)
    // let filterpro = everyProduct?.products
//     const getData = (state) => {
//           if(state.sortBy === "hightolow")
//     filterpro=filterpro.sort(function(a,b){
//         return b.price - a.price;
//         // dispatchFilter({type:SORT_BY_PRICE,payload:product})
//     })

//    else if(state.sortBy === "lowtohigh")
//     filterpro=filterpro.sort(function(a,b){
//         return a.price -  b.price;
//     }) 
  

//     /// Filters for price range input
// //     if (state.pricerange !== "") {
// //         filterpro = filterpro.filter((product) => {
// //           return (
// //             product.price >= state.pricerange.min &&
// //             product.price <= state.pricerange.max
// //           );
// //         });
// //       }
// //   console.log(filterpro)
// // console.log(filter)
// //    if(state.choiceCategory.length>0){
// //     filterpro=filterpro.filter((product)=>{
// //         state.choiceCategory.includes(product.categoryName)
// //     })
// //    }
// //    if(state.searchItem.length>0){
// //     filterpro= filterpro.filter((product)=>{
// //         product.title.toUpperCase().includes(state.searchItem.toUpperCase())
// //     })
// //    }
 
// return filterpro;

//    }


   const [state,dispatch]=useReducer(cartReducer,intialValue)
   return(
    <div>
        
        <DataContext.Provider value={{filterProduct,dispatchFilter,state,dispatch,data:getData(filterProduct)}}>
            {children}
        </DataContext.Provider>
    </div>
   )




}


const useData=()=>useContext(DataContext);
export {DataProvider,useData};

