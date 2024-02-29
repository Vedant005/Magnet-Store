import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";

import { BrowserRouter as Router } from "react-router-dom";

import { ProductProvider } from "./contexts/productContext";
import { CartProvider } from "./contexts/CartContext";
import { DataProvider } from "./contexts/dataContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { UserProvider } from "./contexts/UserContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      
          <UserProvider>
           <ProductProvider>
             <DataProvider>
               <CartProvider>
                <WishlistProvider>
                  <App />
                </WishlistProvider>
              </CartProvider>
              </DataProvider>
          </ProductProvider>
        </UserProvider>
  
    </Router>
    </React.StrictMode>,
  document.getElementById("root")
);
