import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import productReducer from '../reducers/productReducer';
import { GET_ALL_PRODUCTS } from '../variables/variables';

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

  useEffect(() => {
    getProducts();
    console.count("useEffect running!")
  }, []);

  console.log('ProductState:', productState); // Check if products are being set

  return (
    <ProductContext.Provider value={{ productState, productDispatch, getProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

export { ProductProvider };
