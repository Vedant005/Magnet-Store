import axios from "axios";

import { useReducer,useContext,useEffect,createContext } from "react";

import productReducer from "../reducers/productReducer";
import { GET_ALL_PRODUCTS } from "../variables/variables";
export const ProductContext = createContext();

function ProductProvider({children}){

    const initialState = {
        products: [],
        cart: [],
        wishlist: [],
        categories: [],
        
      };

    const[productState,productDispatch]=useReducer(productReducer,initialState);

    const getProducts = async()=>{
        try{
            const {status,data}= await axios.get("/api/products");
            if(status === 200){
                productDispatch({type:GET_ALL_PRODUCTS,payload:data.products })
            }
            console.log(data)
       }catch(error){
           console.error("Get-products error---->  ",error);
        }
    }

    const getSingleProduct = async(productId)=>{
        try{
            const{status,data}= await axios.get(`/api/products/${productId}`)
            if(status===200){
                return data;
            }
        
        }catch(error){
            console.error("Single product fetch error ----> ",error)
        }
    }

    useEffect(()=>{
        getProducts();

    },[])


   console.log(productState);


    return(
        
            <ProductContext.Provider value={{...productState,productDispatch,getProducts,getSingleProduct}}>
                       {children}
            </ProductContext.Provider>
    
        
    )
}


export{ProductProvider,};