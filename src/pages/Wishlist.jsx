import React, { useContext } from "react";
import Header from "../components/Header";
import { WishlistContext } from "../contexts/wishlistContext";
import { CartContext } from "../contexts/cartContext";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa";
import Lottie from "react-lottie";
import animationData from "../animations/empty-wishlist.json"; // Lottie animation file

export default function Wishlist() {
  const { wishList, addToWishListHandler } = useContext(WishlistContext);
  const { addToCart, cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate("/cart");
  };

  const toggleWishlist = (product, e) => {
    e.stopPropagation(); // Prevent the event from triggering other handlers
    addToWishListHandler(product);
  };

  // Lottie animation options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Wishlist Items: {wishList.length}
        </h1>
        {wishList.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-64 h-64 mx-auto">
              <Lottie options={defaultOptions} height={256} width={256} />
            </div>
            <p className="text-gray-600 text-lg mt-4 animate-fadeIn">
              Your wishlist is currently empty. Start adding items to build your
              dream collection!
            </p>
            <button
              onClick={() => navigate("/products")}
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 animate-bounce"
            >
              Explore Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishList.map((item) => {
              const { _id, title, price, ratings, img } = item;
              const isInCart = cart.some((cartItem) => cartItem._id === _id);

              return (
                <div
                  key={_id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={img}
                      alt={title}
                      className="w-full h-48 object-cover cursor-pointer"
                      onClick={() => navigate(`/products/${_id}`)}
                    />
                    <button
                      onClick={(e) => toggleWishlist(item, e)}
                      className="absolute top-2 right-2 text-red-500"
                    >
                      <FaHeart size={24} fill="red" />
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-500 uppercase">Brand</p>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                      {title}
                    </h2>
                    <div className="flex items-center mb-2">
                      <span className="text-lg font-bold text-gray-800 mr-2">
                        {price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        MRP: {price}
                      </span>
                    </div>
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < ratings ? "text-yellow-400" : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className={`w-full text-white font-bold py-2 px-4 rounded transition duration-300 ${
                        isInCart
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                    >
                      {isInCart ? "GO TO CART" : "Add to cart"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
