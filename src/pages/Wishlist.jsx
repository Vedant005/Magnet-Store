import React, { useEffect } from "react";
import Header from "../components/Header";

import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Lottie from "react-lottie";
import animationData from "../animations/empty-wishlist.json"; // Lottie animation file
import useWishlistStore from "../stores/wishlistStore";
import useCartStore from "../stores/cartStore";
import { toast } from "react-toastify";

export default function Wishlist() {
  const { addToCart, cartItems } = useCartStore();
  const navigate = useNavigate();

  const { fetchWishlistItems, wishlistItems, toggleWishlist, clearWishlist } =
    useWishlistStore();

  const handleAddToCart = (productId) => {
    if (cartItems?.some((item) => item.product === productId)) {
      navigate("/cart");
    } else {
      addToCart(productId);
      toast.success("Product added to cart!");
    }
  };

  const toggleList = (productId, e) => {
    e.stopPropagation();

    toggleWishlist(productId);
  };

  const clearList = () => {
    clearWishlist();
    toast.success("Wishlist cleared!");
  };

  useEffect(() => {
    fetchWishlistItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {wishlistItems?.length === 0 ? (
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
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-5xl mx-auto m-10">
            <div className="flex justify-end mb-4 gap-5">
              <h1 className="text-xl font-bold text-gray-800 mt-3 ">
                Wishlist Items: {wishlistItems?.length}
              </h1>
              <button
                onClick={clearList}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Clear Wishlist
              </button>
            </div>

            <div className="overflow-y-auto h-[500px] border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems?.map((item) => {
                  const {
                    _id,
                    title,
                    price,
                    ratings,
                    img,
                    brandName,
                    discount,
                  } = item;

                  const dis = discount / 100;
                  const remaining = price * dis;
                  const finalPrice = price - remaining;

                  return (
                    <div
                      key={_id}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <div className="h-48 overflow-hidden relative">
                        <img
                          className="w-full h-full object-cover rounded-t-xl cursor-pointer"
                          src={img}
                          alt={title}
                          onClick={() => navigate(`/products/${_id}`)}
                        />
                        <button
                          onClick={(e) => toggleList(_id, e)}
                          className="absolute top-2 right-2 p-1 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 transition-all duration-300"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill={"red"}
                            viewBox="0 0 24 24"
                            stroke={"red"}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="p-4 flex flex-col flex-grow">
                        <span className="text-gray-400 text-xs uppercase">
                          {brandName}
                        </span>
                        <p className="text-lg font-bold text-black truncate capitalize mt-1">
                          {title}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-lg font-semibold text-black">
                            ₹{finalPrice}
                          </p>
                          <div className="flex items-center ">
                            <p className="mr-2">{ratings}</p>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <FaStar
                                  key={i}
                                  className={
                                    i < ratings
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <del className="text-xs text-gray-600 mt-1">
                            {price}
                          </del>
                          <p className="text-xs text-gray-600 mt-1">
                            ({discount}% off)
                          </p>
                        </div>
                        <button
                          onClick={() => handleAddToCart(_id)}
                          className={`mt-auto w-full text-white px-3 py-2 rounded-lg transition duration-300 text-sm ${
                            cartItems?.some((item) => item.product === _id)
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-blue-600 hover:bg-blue-700"
                          }`}
                        >
                          {cartItems?.some((item) => item.product === _id)
                            ? "Go to cart"
                            : "Add to cart"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
