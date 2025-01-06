import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/userStore";
import Header from "../components/Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useUserStore();

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      login({ email, password });
      setError("");
      navigate("/");
    } catch (err) {
      console.log(error);
      setError(err.message);
    }
  };

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
