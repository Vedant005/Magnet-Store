import React, { useState } from "react";
import { useAuth } from "../contexts/authContext";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, currentUser, logout } = useAuth();

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      login(email, password);
      setError("");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  // if (currentUser) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-gray-100">
  //       <div className="p-6 bg-white rounded shadow-md">
  //         <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">
  //           Welcome, {currentUser.email}!
  //         </h2>
  //         <button
  //           onClick={logout}
  //           className="w-full px-3 py-2 text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-200"
  //         >
  //           Logout
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div>
      <Header className="fixed top-0 w-full z-50 bg-white shadow" />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm p-6 bg-white rounded shadow-md"
        >
          <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">
            Login
          </h2>
          {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-semibold text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-semibold text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-3 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Login
          </button>
          <p className="mt-4 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-blue-600 hover:underline"
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../contexts/authContext";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import Header from "../components/Header";

// const Login = () => {
//   const navigate = useNavigate();
//   const { userLogin } = useContext(AuthContext);

//   const [isPasswordHide, setIsPasswordHide] = useState(true);
//   const [userData, setUserData] = useState({ email: "", password: "" });
//   const [rememberMe, setRememberMe] = useState(false);

//   const guestUserData = {
//     email: "adarshbalika@gmail.com",
//     password: "adarshbalika",
//   };

//   const loginHandler = (e) => {
//     e.preventDefault();
//     if (userData.email.trim() && userData.password.trim()) {
//       userLogin(userData);
//     }
//   };

//   const loginAsGuestHandler = (e) => {
//     e.preventDefault();
//     setUserData(guestUserData);
//     userLogin(guestUserData);
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-4">
//       <Header />
//       <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg transform transition-all hover:scale-105 duration-300 w-full max-w-md">
//         <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
//           Welcome Back
//         </h2>
//         <form className="space-y-4">
//           <div>
//             <label
//               htmlFor="email"
//               className="text-gray-700 font-semibold block mb-2"
//             >
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               placeholder="you@example.com"
//               value={userData.email}
//               onChange={(e) =>
//                 setUserData((prev) => ({ ...prev, email: e.target.value }))
//               }
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="text-gray-700 font-semibold block mb-2"
//             >
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 id="password"
//                 type={isPasswordHide ? "password" : "text"}
//                 placeholder="Enter your password"
//                 value={userData.password}
//                 onChange={(e) =>
//                   setUserData((prev) => ({ ...prev, password: e.target.value }))
//                 }
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 type="button"
//                 onClick={() => setIsPasswordHide(!isPasswordHide)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//               >
//                 {isPasswordHide ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <input
//                 id="remember-me"
//                 type="checkbox"
//                 checked={rememberMe}
//                 onChange={() => setRememberMe(!rememberMe)}
//                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//               />
//               <label
//                 htmlFor="remember-me"
//                 className="ml-2 block text-sm text-gray-700"
//               >
//                 Remember me
//               </label>
//             </div>
//             {/* <div className="text-sm">
//               <a
//                 href="#"
//                 className="font-medium text-blue-600 hover:text-blue-500"
//               >
//                 Forgot your password?
//               </a>
//             </div> */}
//           </div>

//           <button
//             className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold transition-colors duration-300 hover:bg-blue-700"
//             onClick={loginHandler}
//           >
//             Login
//           </button>
//           <button
//             className="w-full bg-gray-500 text-white py-2 rounded-lg font-semibold transition-colors duration-300 hover:bg-gray-600"
//             onClick={loginAsGuestHandler}
//           >
//             Login As Guest
//           </button>
//         </form>

//         <p className="text-center mt-6 text-gray-600">
//           Don't have an account?{" "}
//           <span
//             onClick={() => navigate("/signup")}
//             className="text-blue-600 font-semibold cursor-pointer hover:underline"
//           >
//             Sign Up
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
