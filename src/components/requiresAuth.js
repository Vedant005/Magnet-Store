import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { UserContext } from "../contexts/UserContext.js";
export  function RequiresAuth({ children }) {
  let location = useLocation();
  // const { isLoggedIn } = useContext(AuthContext);
    const {authState}=useContext(UserContext);
    
  return authState.isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
}
