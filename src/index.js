import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
// import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";

import { ProductProvider } from "./contexts/productContext";
import { CartProvider } from "./contexts/CartContext";
import { DataProvider } from "./contexts/dataContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { UserProvider } from "./contexts/UserContext";
// export {AuthContext};
// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
        {/* <AuthProvider> */}
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
    {/* </AuthProvider> */}
    </Router>
    </React.StrictMode>,
  document.getElementById("root")
);
