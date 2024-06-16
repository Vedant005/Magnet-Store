import React from "react";
import { NavLink } from "react-router-dom";
import { IoMdCart } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { BsShop } from "react-icons/bs";
import { FaRegHeart, FaRegUser } from "react-icons/fa";

export default function Header() {
  const navigate = useNavigate();
  
  return (
    <header className="bg-gray-100 shadow-md w-full fixed top-0 z-10 flex">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h2 className="text-xl font-bold cursor-pointer text-red-500" onClick={() => navigate("/")}>
              Magnet Store
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <label className="relative">
              <input
                type="text"
                className="border rounded px-3 py-1"
                placeholder="Search for item"
              />
            </label>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `p-2 no-underline ${isActive ? 'text-red-500' : 'text-gray-700'}`
              }
            >
              <BsShop className="text-2xl" />
            </NavLink>
            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                `p-2 no-underline ${isActive ? 'text-red-500' : 'text-gray-700'}`
              }
            >
              <FaRegHeart className="text-2xl" />
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `p-2 no-underline ${isActive ? 'text-red-500' : 'text-gray-700'}`
              }
            >
              <IoMdCart className="text-2xl" />
            </NavLink>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `p-2 no-underline ${isActive ? 'text-red-500' : 'text-gray-700'}`
              }
            >
              <FaRegUser className="text-2xl" />
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
