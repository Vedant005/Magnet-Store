import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Header from "../components/Header";

const Login = () => {
  const navigate = useNavigate();
  const { userLogin } = useContext(AuthContext);

  const [isPasswordHide, setIsPasswordHide] = useState(true);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);

  const guestUserData = {
    email: "sudiptachakroborty20@gmail.com",
    password: "sudiptacha",
  };

  const loginHandler = (e) => {
    e.preventDefault();
    if (userData.email.trim() && userData.password.trim()) {
      userLogin(userData);
    }
  };

  const loginAsGuestHandler = (e) => {
    e.preventDefault();
    setUserData(guestUserData);
    userLogin(guestUserData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-4">
      <Header />
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg transform transition-all hover:scale-105 duration-300 w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="text-gray-700 font-semibold block mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={userData.email}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, email: e.target.value }))
              }
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-gray-700 font-semibold block mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={isPasswordHide ? "password" : "text"}
                placeholder="Enter your password"
                value={userData.password}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, password: e.target.value }))
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setIsPasswordHide(!isPasswordHide)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {isPasswordHide ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold transition-colors duration-300 hover:bg-blue-700"
            onClick={loginHandler}
          >
            Login
          </button>
          <button
            className="w-full bg-gray-500 text-white py-2 rounded-lg font-semibold transition-colors duration-300 hover:bg-gray-600"
            onClick={loginAsGuestHandler}
          >
            Login As Guest
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
