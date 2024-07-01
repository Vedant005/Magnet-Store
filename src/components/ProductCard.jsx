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
    <div className="w-[24rem] bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl my-8">
      <div key={_id} className="flex flex-col h-full">
        <div className="h-56 overflow-hidden">
          <img
            className="w-full h-full object-cover rounded-t-xl cursor-pointer"
            src={img}
            alt={title}
            onClick={() => navigate(`/products/${_id}`)}
          />
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <span className="text-gray-400 text-sm uppercase">Brand</span>
          <p className="text-xl font-bold text-black truncate capitalize mt-1">
            {title}
          </p>
          <div className="flex items-center justify-between mt-3">
            <p className="text-xl font-semibold text-black">{price}</p>
            <p className="text-sm">{ratings}⭐</p>
          </div>
          <del className="text-sm text-gray-600 mt-2">MRP: {price}</del>
          <button
            onClick={() => addToCart(product)}
            className="mt-auto w-full bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-300"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

//  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
// <path fillRule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
// <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
// </svg>
