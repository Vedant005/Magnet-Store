import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useCartStore from "../stores/cartStore";
import useWishlistStore from "../stores/wishlistStore";
import useUserStore from "../stores/userStore";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import useProductStore from "../stores/productStore";

function ProductCard(product) {
  const { _id, title, ratings, price, img, brandName, discount } = product;

  const { addToCart, cartItems, fetchCartItems } = useCartStore();
  const { wishlistItems, toggleWishlist, fetchWishlistItems } =
    useWishlistStore();
  const navigate = useNavigate();
  const { user } = useUserStore();

  useEffect(() => {
    if (user) {
      fetchCartItems();
      fetchWishlistItems();
    }
    useProductStore.getState().fetchAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!_id || !title || !price || !img) {
    console.error("Missing required product props:", {
      _id,
      title,
      ratings,
      price,
      img,
      brandName,
      discount,
    });
    return null;
  }

  const handleButtonClick = () => {
    if (user) {
      if (cartItems?.some((item) => item.product === _id)) {
        navigate("/cart");
      } else {
        addToCart(_id);
        toast.success("Product added to cart!");
      }
    } else {
      navigate("/login");
    }
  };

  const toggleWishlistHandler = async (e) => {
    e.stopPropagation();
    if (user) {
      await toggleWishlist(_id);
    } else {
      navigate("/login");
    }
  };

  const isWishlisted = wishlistItems?.some((item) => item._id === _id);

  const dis = discount / 100;
  const remaining = price * dis;
  const finalPrice = price - remaining;

  return (
    <div className="bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <div key={_id} className="flex flex-col h-full">
        <div className="h-48 overflow-hidden relative">
          <img
            className="w-full h-full object-cover rounded-t-xl cursor-pointer"
            src={img}
            alt={title}
            onClick={() => navigate(`/products/${_id}`)}
          />
          <button
            onClick={toggleWishlistHandler}
            className="absolute top-2 right-2 p-1 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill={isWishlisted ? "red" : "none"}
              viewBox="0 0 24 24"
              stroke={isWishlisted ? "red" : "currentColor"}
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
          <span className="text-gray-400 text-xs uppercase">{brandName}</span>
          <p className="text-lg font-bold text-black truncate capitalize mt-1">
            {title}
          </p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-lg font-semibold text-black">₹{finalPrice}</p>
            <div className="flex items-center ">
              <p className="mr-2">{ratings}</p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < ratings ? "text-yellow-400" : "text-gray-300"
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <del className="text-xs text-gray-600 mt-1">{price}</del>
            <p className="text-xs text-gray-600 mt-1">({discount}% off)</p>
          </div>
          <button
            onClick={handleButtonClick}
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
    </div>
  );
}

export default ProductCard;
