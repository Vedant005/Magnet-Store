import React, { useContext } from "react";
import Header from "../components/Header";
import { AuthContext } from "../contexts/authContext";

export const UserDetails = () => {
  const { authState, userLogout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-lg">
          <h1 className="text-2xl font-bold mb-4">
            {authState?.user?.firstName} {authState?.user?.lastName}
          </h1>
          <p className="text-gray-700 mb-6">{authState?.user?.email}</p>

          <button
            onClick={userLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
