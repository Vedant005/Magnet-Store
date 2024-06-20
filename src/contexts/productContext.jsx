import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import productReducer from '../reducers/productReducer';
import { GET_ALL_PRODUCTS ,GET_CATEGORIES} from '../variables/variables';

export const ProductContext = createContext();

function ProductProvider({ children }) {
  const initialState = {
    products: [],
    cart: [],
    wishlist: [],
    categories: []
  };

  const [productState, productDispatch] = useReducer(productReducer, initialState);

  const getProducts = async () => {
    try {
      const { status, data } = await axios.get("/api/products");
      if (status === 200) {
        productDispatch({ type: GET_ALL_PRODUCTS, payload: data.products });
      }
    } catch (error) {
      console.error('Get-products error:', error);
    }
  };
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
  const getCategories = async()=>{
    try{

      const {status,data} = await axios.get("/api/categories");
      if(status===200){
        productDispatch({type:GET_CATEGORIES , payload:data.categories})
      }

    }catch(error){
        console.error("Get-categories error", error);
    }
  }

  useEffect(() => {
    getProducts();
    getCategories();
    console.count("useEffect running!")
  }, []);

  // console.log('ProductState:', productState); // Check if products are being set

  return (
    <ProductContext.Provider value={{ productState, productDispatch, getProducts,getsingleProduct ,getCategories}}>
      {children}
    </ProductContext.Provider>
  );
}

export { ProductProvider };
