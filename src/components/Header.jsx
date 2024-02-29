import "./header.css"
import { NavLink } from "react-router-dom";
import { IoMdCart } from "react-icons/io";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useData } from "../contexts/dataContext";

import { BsShop } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";



import { useState } from "react";
const getStyle=({isActive})=>({
    color: isActive ? "red" : "",
    border: "1 rem",
    padding: "0.5 rem",
    margin: "6rem",
 textDecoration : "none",
  texAlign:"center"
})

export function Header() {
  const navigate = useNavigate();
  const {dispatchFilter} = useData();
  const [searchText,setSearchText] =  useState("")

   const {authState}= useUser();
    return (
        <header>
          <div>
          <div className= "container">
            <div className="title-container">
              <h2 className="title" onClick={()=> navigate("/")}>  magnet store</h2>
          </div>
   <div className="links-container">
      <label className="search-bar" >
        <input type="text"  
          className="search-item"
          value = {searchText}
          onChange={(e)=>{
            setSearchText(e.target.value);
            e.target.value.trim() !== "" && navigate("/product");
            dispatchFilter({ type: "SEARCH_PRODUCT", payload:searchText });
          }          }
         placeholder="search for item" 
      
         ></input>
        
      </label>
 
 
     <NavLink style={getStyle} to="/product"  className="nav-link">
        <BsShop className="shop"/>
        </NavLink>


        <NavLink style={getStyle} to="/wishlist"  className="nav-link">
        <FaRegHeart className="heart"/>
        </NavLink>

        <NavLink style={getStyle} to="/cart">
        <IoMdCart className="cart"/>
        </NavLink>


     <NavLink style={getStyle} 
     to={
      authState?.isLoggedIn
      ? "/userDetails"
      : "/login"
     }   
     className="nav-link">
         <FaRegUser className="login"/>
        </NavLink>
    
     </div>
      </div>
      </div>
      </header>
    );
  }

  