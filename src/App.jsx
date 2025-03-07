import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import SingleProductPage from "./pages/SingleProductPage";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import { UserDetails } from "./pages/userDetails";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:productId" element={<SingleProductPage />} />
        <Route path="/cart" element={<ProtectedRoute />}>
          <Route path="" element={<Cart />} />
        </Route>

        <Route path="/wishlist" element={<ProtectedRoute />}>
          <Route path="" element={<Wishlist />} />
        </Route>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userDetails" element={<ProtectedRoute />}>
          <Route path="" element={<UserDetails />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
