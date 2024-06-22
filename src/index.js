import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { makeServer } from './server.js'
import { BrowserRouter as Router } from "react-router-dom";
import { ProductProvider } from './contexts/productContext.jsx';
import FilterProvider from './contexts/filterContext.jsx';
import { CartProvider } from './contexts/cartContext.jsx'
import { WishlistProvider } from './contexts/wishlistContext.jsx'

makeServer();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ProductProvider>
        <FilterProvider>
          <CartProvider>
            <WishlistProvider>
           <App />
           </WishlistProvider>
          </CartProvider>
        </FilterProvider>
      </ProductProvider>
    </Router>
  </React.StrictMode>,
)
