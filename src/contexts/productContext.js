import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { createContext,useContext,useEffect,useState } from "react";
import { useReducer } from "react";
import { GET_ALL_PRODUCTS, GET_CATEGORIES } from "../variables/variables";

import { dataReducer } from "../reducers/dataReducer";
import { categories } from "../backend/db/categories";
export const ProductContext= createContext();

const initial_state={
    everyProduct:[],
    singleProduct:{},
    cart:[],
    categories:[]
}
function ProductProvider({children}){

    const[productState,dispatch]= useReducer(dataReducer,initial_state)
    
const fetchData= async()=>{
    try{
       const response = await axios.get("/api/products");
         const everyProduct= await response.data
         dispatch({type:GET_ALL_PRODUCTS,payload:everyProduct})
        
    }
    catch(error){
        console.log("Error in fetching data",error)
    }

}
const getsingleProduct=async(productId)=>{
    try {
        const {status,data} = await axios.get(`/api/products/${productId}`);
       if(status=== 200){
        return data;
       }
        
      } catch (e) {
        console.error(e);
      }
}

const getCategory =async()=>{
    try{
        const{status,data}= await axios.get("api/categories")
        if(status==200){
            dispatch({type:GET_CATEGORIES,payload: data.categories})
        }
    }catch(e){
        console.error(e)
    }
}




useEffect(()=>{
    fetchData();
    getCategory();
        // axios
    // .get("/api/product")
    // .then((res)=>
    // console.log(res)
    // )
},[productState])



return(
    <div>
        <ProductContext.Provider value={{...productState,dispatch,fetchData,getsingleProduct}}>
                   {children}
        </ProductContext.Provider>

    </div>
)
}

const useProduct =()=>
 useContext(ProductContext);

export{ProductProvider,useProduct};