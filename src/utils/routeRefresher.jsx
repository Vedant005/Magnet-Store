import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import apiClient from "./axiosInterceptor";

const RouteRefreshChecker = () => {
  const location = useLocation();

  useEffect(() => {
    const refreshToken = async () => {
      try {
        await apiClient.post(
          "/users/refresh-token",
          {},
          { withCredentials: true }
        );
        console.log("Access token refreshed on navigation.");
      } catch (error) {
        console.error("Error refreshing access token on navigation:", error);
        window.dispatchEvent(new Event("forceLogout"));
      }
    };

    refreshToken();
  }, [location]);

  return null;
};

export default RouteRefreshChecker;
