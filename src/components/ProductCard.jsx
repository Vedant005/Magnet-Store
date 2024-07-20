import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/cartContext";

function ProductCard(product) {
  const { addToCart, cart } = useContext(CartContext);
  const { _id, title, ratings, price, img } = product;
  const [isInCart, setIsInCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsInCart(cart.some((item) => item._id === _id));
  }, [cart, _id]);

  if (!_id || !title || !price || !img) {
    console.error("Missing required product props:", {
      _id,
      title,
      ratings,
      price,
      img,
    });
    return null;
  }

  const handleButtonClick = () => {
    if (isInCart) {
      navigate("/cart");
    } else {
      addToCart(product);
    }
  };

  const toggleWishlist = (e) => {
    e.stopPropagation(); // Prevent image click event from firing
    setIsWishlisted(!isWishlisted);
    // Here you would typically also update your wishlist in a global state or backend
  };

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
            onClick={toggleWishlist}
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
          <span className="text-gray-400 text-xs uppercase">Brand</span>
          <p className="text-lg font-bold text-black truncate capitalize mt-1">
            {title}
          </p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-lg font-semibold text-black">{price}</p>
            <p className="text-sm">{ratings}⭐</p>
          </div>
          <del className="text-xs text-gray-600 mt-1">MRP: {price}</del>
          <button
            onClick={handleButtonClick}
            className={`mt-auto w-full text-white px-3 py-2 rounded-lg transition duration-300 text-sm ${
              isInCart
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isInCart ? "GO TO CART" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
