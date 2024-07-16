import React, { createContext, useReducer } from "react";
import authReducer from "../reducers/authReducer";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const initialAuth = {
    isLoggedIn: false,
    user: {},
    token: "",
  };

  const navigate = useNavigate();
  const location = useLocation();

  const [authState, authDispatch] = useReducer(authReducer, initialAuth);

  const userLogin = async (loginData) => {
    try {
      const { status, data } = await axios.post(`/api/auth/login`, loginData);
      console.log("API Response:", { status, data });
      if (status === 200) {
        localStorage.setItem("token", data?.encodedToken);
        authDispatch({ type: "SET_LOGGEDIN_TRUE", payload: true });
        authDispatch({ type: "SET_USER", payload: data?.foundUser });
        authDispatch({ type: "SET_TOKEN", payload: data?.encodedToken });
        navigate(
          location?.state?.from?.pathname
            ? location?.state?.from?.pathname
            : "/"
        );
      }
    } catch (e) {
      console.error("Login Error:", e);
      if (e.response) {
        // Server responded with a status other than 200 range
        console.error("Error Response Data:", e.response.data);
        console.error("Error Response Status:", e.response.status);
        console.error("Error Response Headers:", e.response.headers);
      } else if (e.request) {
        // Request was made but no response received
        console.error("Error Request:", e.request);
      } else {
        // Something else happened in setting up the request
        console.error("Error Message:", e.message);
      }
      authDispatch({ type: "SET_LOGGEDIN_FALSE", payload: false });
    }
  };

  const userSignup = async (signupData) => {
    try {
      const { status, data } = await axios.post(`/api/auth/signup`, signupData);
      if (status === 201) {
        localStorage.setItem("token", data?.encodedToken);
        authDispatch({ type: "SET_LOGGEDIN_TRUE", payload: true });
        authDispatch({ type: "SET_USER", payload: data?.createdUser });
        authDispatch({ type: "SET_TOKEN", payload: data?.encodedToken });

        navigate("/");
      }
    } catch (e) {
      authDispatch({ type: "SET_LOGGEDIN_FALSE", payload: false });
      console.error(e);
    }
  };

  const userLogout = () => {
    localStorage.removeItem("token");
    authDispatch({ type: "SET_LOGGEDIN_FALSE", payload: false });
    authDispatch({ type: "SET_USER", payload: {} });
    authDispatch({ type: "SET_TOKEN", payload: "" });

    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ authState, userLogin, userSignup, userLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
