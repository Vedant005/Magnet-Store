import React, { useContext } from "react";
import Header from "../components/Header";
import { CartContext } from "../contexts/cartContext";
import { NavLink, useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import emptyCartAnimation from "../animations/empty-cart.json"; // Import your Lottie JSON file

function Cart() {
  const {
    cart,
    totalItems,
    productQuantityIncrement,
    productQuantityDecrement,
    removeFromCart,
    totalPrice,
  } = useContext(CartContext);
  const navigate = useNavigate();

  // Lottie animation options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: emptyCartAnimation, // Your Lottie JSON file
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-col md:flex-row justify-between px-4 md:px-8 py-6 mt-20">
        {cart.length === 0 ? (
          <div className="w-full text-center">
            <div className="max-w-md mx-auto">
              <div className="w-64 h-64 mx-auto">
                <Lottie options={defaultOptions} height={256} width={256} />
              </div>
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
                        <div className="bg-gray-100 px-4 py-1">{quantity}</div>
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
                <button
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded mt-4"
                  onClick={() => navigate("/checkout")}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
