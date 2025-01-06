import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../stores/userStore";

const ProtectedRoute = ({ redirectTo = "/login" }) => {
  const { user } = useUserStore();

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
