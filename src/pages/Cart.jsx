import React, { useContext } from "react";
import Header from "../components/Header";
import { CartContext } from "../contexts/cartContext";
import { NavLink } from "react-router-dom";

function Cart() {
  const {
    cart,
    totalItems,
    productQuantityIncrement,
    productQuantityDecrement,
    removeFromCart,
    totalPrice,
  } = useContext(CartContext);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-col md:flex-row justify-between px-4 md:px-8 py-6 mt-20">
        {
          cart.length === 0 ? (
            <div className="w-full text-center">
              <div className="max-w-md mx-auto">
                <svg
                  className="w-64 h-64 mx-auto mb-8 animate-bounce"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
                    stroke="#4B5563"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-2xl font-semibold text-gray-700 mb-4 animate-pulse">
                  Your cart is empty
                </p>
                <p className="text-gray-500 mb-8">
                  Looks like you haven't added anything to your cart yet.
                </p>
                <NavLink
                  to="/products"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Start Shopping
                </NavLink>
              </div>
            </div>
          ) : (
            <>
              <div className="w-full md:w-2/3 mb-6 md:mb-0">
                {cart.map((item) => {
                  const { _id, title, price, ratings, img, quantity } = item;

                  return (
                    <div
                      key={_id}
                      className="flex flex-col sm:flex-row bg-white p-4 shadow-md rounded-lg mb-4"
                    >
                      <NavLink
                        to={`/product/${_id}`}
                        className="w-full sm:w-1/4 mb-4 sm:mb-0"
                      >
                        <div className="aspect-w-1 aspect-h-1">
                          <img
                            className="w-full h-full object-cover rounded"
                            src={img}
                            alt={title}
                          />
                        </div>
                      </NavLink>

                      <div className="w-full sm:w-3/4 sm:pl-4">
                        <h1 className="text-xl font-semibold">{title}</h1>
                        <p>Rating: {ratings}</p>
                        <p>Price: ₹{price}</p>
                        <div className="flex items-center mt-2">
                          <button
                            className="bg-gray-200 px-2 py-1 rounded-l"
                            onClick={() => productQuantityDecrement(item)}
                            disabled={quantity === 1}
                          >
                            -
                          </button>
                          <div className="bg-gray-100 px-4 py-1">
                            {quantity}
                          </div>
                          <button
                            className="bg-gray-200 px-2 py-1 rounded-r"
                            onClick={() => productQuantityIncrement(item)}
                          >
                            +
                          </button>
                        </div>
                        <div className="mt-2">
                          <button
                            onClick={() => removeFromCart(item)}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="w-full md:w-1/3 md:pl-4">
                <div className="bg-white p-4 shadow-md rounded-lg md:sticky md:top-4">
                  <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
                  <div className="flex justify-between mb-2">
                    <p>Price ({totalItems} items)</p>
                    <p>₹{totalPrice}</p>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p>Delivery Charges</p>
                    <p>Free</p>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <p>Total Amount</p>
                    <p>₹{totalPrice}</p>
                  </div>
                  <button className="w-full bg-blue-500 text-white px-4 py-2 rounded mt-4">
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )
          // ... (rest of the existing code for non-empty cart)
        }
      </div>
    </div>
  );
}

export default Cart;
