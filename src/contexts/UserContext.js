import { createContext, useContext ,useReducer } from "react";
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom";
import authReducer from "../reducers/authRecuder";
export const UserContext = createContext()


function UserProvider ({children}){
    
    const initialAuth={
        isLoggedIn: false,
        user: {},
        token: "",
    }
        // const [showUser ,setUser]= useState();
    
    const navigate = useNavigate();
    const location = useLocation();
    const [authState, authDispatch] = useReducer(authReducer, initialAuth);



    const userLogin = async (loginData) => {
        try {
          const { status, data } = await axios.post(`/api/auth/login`, loginData);
          if (status === 200) {
            localStorage.setItem("token", data?.encodedToken);
            authDispatch({ type: "SET_LOGGEDIN_TRUE", payload: true });
            authDispatch({ type: "SET_USER", payload: data?.foundUser });
            authDispatch({ type: "SET_TOKEN", payload: data?.encodedToken });
            // toast.success("Login Successful!");
            navigate(
              location?.state?.from?.pathname
            );
          }
        } catch (e) {
          authDispatch({ type: "SET_LOGGEDIN_FALSE", payload: false });
          console.error(e);
        //   toast.error(e.response.data.errors[0]);
        }
      };
    const signup = async(signData)=>{

          try{
              const {data,status} = await axios.post(`/api/auth/signup`,signData)
              if(status===201){
                localStorage.setItem("token", data?.encodedToken);
                authDispatch({ type: "SET_LOGGEDIN_TRUE", payload: true });
                authDispatch({ type: "SET_USER", payload: data?.createdUser });
                authDispatch({ type: "SET_TOKEN", payload: data?.encodedToken });
                navigate("/")  
              }
            }catch(e){
              authDispatch({ type: "SET_LOGGEDIN_FALSE", payload: false });
                console.log(e);

            }

          }
const userLogout = () => {
    localStorage.removeItem("token");
    authDispatch({ type: "SET_LOGGEDIN_FALSE", payload: false });
    authDispatch({ type: "SET_USER", payload: {} });
    authDispatch({ type: "SET_TOKEN", payload: "" });
    // toast.success("You're logged out!");
    navigate("/");
  };

   return (
    <div>
        <UserContext.Provider value={{userLogin,userLogout,authState,authDispatch,signup}}>
            {children}
        </UserContext.Provider>
    </div>
   )



}

const useUser = () => useContext(UserContext);

export{UserProvider,useUser};