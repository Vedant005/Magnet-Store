import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" />;
  }

  // Render the protected component if logged in
  return children;
};

export default ProtectedRoute;
