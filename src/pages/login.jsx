import React, { useState } from "react";
import { Header } from "../components/Header.jsx";

import { useUser } from "../contexts/UserContext.js";
import { useNavigate } from "react-router-dom";
import "./login.css"

export default function Login() {
    const navigate = useNavigate();
   const {userLogin,authState}=useUser(); 
console.log(authState)
  // const[username,setUsername]= useState(" ")
  // const [password,setPassword]= useState("")  
  
  //  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  // const navigate = useNavigate();
  // const location = useLocation();
  // const handleLogin = () => {
   
  //   setIsLoggedIn(!isLoggedIn);
  //   navigate(location?.state?.from?.pathname);
  // };
  
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const guestData = {
    email: "adarshbalika@gmail.com",
    password: "adarshbalika",
  };

  const loginHandler = (e) => {
     e.preventDefault();
     
      userLogin(userData);
    }
  

  const loginAsGuestHandler = (e) => {
    e.preventDefault();
    setUserData(guestData);
    userLogin(guestData);
  };
    return(
       <div>
           <Header/>
    
    

     <div class="login-container">
     <h1>LOGIN HERE</h1>
       <div>
       {/* <label>Enter email</label> */}
       <input 
       type="text"
        id="email" 
        className="email-in"
        placeholder="Enter email"
        value={userData.email}
        onChange={(e)=>
        setUserData((item)=>({...item,email:e.target.value}))

        }
        required
        />
        </div>
        <div>
       {/* <label>Enter password</label> */}
       <input type="password" 
       id="password"
        className="password-in"
        placeholder="Enter password"
        value={userData.password}
        onChange={(e) =>
         setUserData((item) => ({ ...item, password: e.target.value }))
                }
          required
         />
         </div>

        
       <button className="login-button" onClick={loginHandler}>
            Login
          </button>

          <button className="login-button guest" onClick={loginAsGuestHandler}>
            Login As Guest
          </button>

          <p onClick={() => navigate("/signup")}>
          Create New account
        </p>
     </div>
     </div>
        
    )
}
