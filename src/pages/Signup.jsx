import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import useUserStore from "../stores/userStore";

const SignUp = () => {
  const [fullName, setfullName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { register } = useUserStore();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      register({ fullName, email, phoneNumber, password });

      setError("");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Header className="fixed top-0 w-full z-50 bg-white shadow" />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSignUp}
          className="w-full max-w-sm p-6 bg-white rounded shadow-md"
        >
          <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">
            Sign Up
          </h2>
          {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
          <div className="mb-4">
            <label
              htmlFor="firstname"
              className="block mb-1 text-sm font-semibold text-gray-600"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setfullName(e.target.value)}
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastname"
              className="block mb-1 text-sm font-semibold text-gray-600"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setphoneNumber(e.target.value)}
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter your Phone Number"
              required
            />
          </div>
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
            className="w-full px-3 py-2 text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-200"
          >
            Sign Up
          </button>
          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline"
            >
              Log in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
