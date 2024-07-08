import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/cartContext";

function ProductCard(product) {
  const { addToCart } = useContext(CartContext);
  const { _id, title, ratings, price, img } = product;

  const navigate = useNavigate();

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

  return (
    <div className="bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <div key={_id} className="flex flex-col h-full">
        <div className="h-48 overflow-hidden">
          <img
            className="w-full h-full object-cover rounded-t-xl cursor-pointer"
            src={img}
            alt={title}
            onClick={() => navigate(`/products/${_id}`)}
          />
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
            onClick={() => addToCart(product)}
            className="mt-auto w-full bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-lg transition duration-300 text-sm"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
