import React from "react";
import { Header } from "../components/Header.jsx";
import { useLocation, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.js";


export default function Login() {
   const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
    navigate(location?.state?.from?.pathname);
  };
    return(
       <div>
        <div>
        <Header/>
    </div>
         <div class="main-container">
       <h1>LOGIN HERE</h1>
    <button onClick={handleLogin}>{isLoggedIn ? "Logout" : "Login"}</button>

     </div>
     </div>
        
    )
}