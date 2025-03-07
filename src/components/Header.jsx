import React, { useEffect, useRef, useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { IoMdCart } from "react-icons/io";
import { BsShop } from "react-icons/bs";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import useUserStore from "../stores/userStore";
import useProductStore from "../stores/productStore";
import useFilterStore from "../stores/filterStore";

export default function Header() {
  const { user } = useUserStore();

  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-md w-full fixed top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h2
              className="text-xl font-bold cursor-pointer text-red-500"
              onClick={() => navigate("/")}
            >
              Magnet Store
            </h2>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <SearchBar />
            <NavIcons authState={user} />
          </div>

          <button className="md:hidden text-gray-600" onClick={toggleMenu}>
            {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <SearchBar />
            <div className="flex justify-around mt-4">
              <NavIcons authState={user} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

const SearchBar = () => {
  const { filters, setFilter } = useFilterStore();
  const { fetchFilteredProducts } = useProductStore();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleSearch = (event) => {
    const value = event.target.value;
    setFilter("search", value);
    navigate("/products");
    fetchFilteredProducts();
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <label className="relative w-full md:w-auto">
      <input
        ref={inputRef}
        type="text"
        className="w-full md:w-64 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
        placeholder="Search for item"
        value={filters.search || ""}
        onChange={handleSearch}
      />
    </label>
  );
};

const NavIcons = ({ authState }) => (
  <>
    <NavLink
      to="/products"
      className={({ isActive }) =>
        `p-2 rounded-full transition-colors duration-300 ${
          isActive
            ? "text-red-500 bg-red-100"
            : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      <BsShop className="text-2xl" />
    </NavLink>
    <NavLink
      to="/wishlist"
      className={({ isActive }) =>
        `p-2 rounded-full transition-colors duration-300 ${
          isActive
            ? "text-red-500 bg-red-100"
            : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      <FaRegHeart className="text-2xl" />
    </NavLink>
    <NavLink
      to="/cart"
      className={({ isActive }) =>
        `p-2 rounded-full transition-colors duration-300 ${
          isActive
            ? "text-red-500 bg-red-100"
            : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      <IoMdCart className="text-2xl" />
    </NavLink>

    <NavLink
      to={authState ? "/userDetails" : "/login"}
      className={({ isActive }) =>
        `p-2 rounded-full transition-colors duration-300 ${
          isActive
            ? "text-red-500 bg-red-100"
            : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      <FaRegUser className="text-2xl" />
    </NavLink>
  </>
);
