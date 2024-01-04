import "./header.css"
import { NavLink } from "react-router-dom";
import { IoMdCart } from "react-icons/io";
import { useUser } from "../contexts/UserContext";

const getStyle=({isActive})=>({
    color: isActive ? "red" : "",
    border: "1 rem",
    padding: "0.5 rem",
    margin: "6rem",
 textDecoration : "none",
  texAlign:"center"
})

export function Header() {
  // const {filterProuct,dispatchFilter} = useData();
  // const navigate = useNavigate();
  // const handleSearch = (e) => {
  //   dispatchFilter({ type: SEARCH_PRODUCT, payload: e.target.value });
  //   navigate("/products");
  // };
   const {authState}= useUser();
    return (
        <header>
          <div className="container">
              <h2 className="title">  magnet store</h2>
            <nav>
              
        <NavLink style={getStyle} to="/" className="nav-link">
          Home
        </NavLink>

        <NavLink style={getStyle} to="/product"  className="nav-link">
         Product
        </NavLink>

     </nav>
      <label className="search-bar" >
        <input type="text"  
         placeholder="search for item"
        //  value={filterProuct.searchItem}
        //  onChange={handleSearch}
         />
        
      </label>
     <nav>
     {/* <NavLink style={getStyle} to="/profile"  className="nav-link">
          Profile  </NavLink> */}

        <NavLink style={getStyle} to="/wishlist"  className="nav-link">
          Wishlist
        </NavLink>
        <NavLink style={getStyle} to="/cart">
        <IoMdCart />

        </NavLink>
     <NavLink style={getStyle} 
     to={
      authState?.isLoggedIn
      ? "/userDetails"
      : "/login"
     }
     
     
     className="nav-link">
         Login
        </NavLink>
     </nav>
    
     
      </div>
      </header>
    );
  }

  