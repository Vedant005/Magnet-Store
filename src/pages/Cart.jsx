import React, { useEffect } from "react";
import Header from "../components/Header";
import { NavLink, useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import emptyCartAnimation from "../animations/empty-cart.json";
import useCartStore from "../stores/cartStore";
import useUserStore from "../stores/userStore";
import { toast } from "react-toastify";

function Cart() {
  const {
    cartItems,
    fetchCartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    fetchingCart,
  } = useCartStore();

  const { fetchCurrentUser } = useUserStore();
  const navigate = useNavigate();

  // Lottie animation options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: emptyCartAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    fetchCartItems();
    fetchCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearAll = () => {
    clearCart();
    toast.success("Cart cleared!");
  };

  const handleAction = async (action) => {
    await action();
    fetchCartItems();
  };

  const totalQuantity = cartItems?.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  if (fetchingCart) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-2xl text-gray-700">Loading your cart...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-col md:flex-row justify-between px-4 md:px-8 py-6 mt-20">
        {cartItems?.length === 0 ? (
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
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                Start Shopping
              </NavLink>
            </div>
          </div>
        ) : (
          <>
            <div className="w-full md:w-2/3 mb-6 md:mb-0">
              {cartItems?.map((item) => {
                const {
                  product,
                  title,
                  price,
                  ratings,
                  img,
                  quantity,
                  discount,
                  finalPrice,
                } = item;

                return (
                  <div
                    key={product}
                    className="flex flex-col sm:flex-row bg-white p-6 rounded-lg shadow-lg mb-6 hover:shadow-xl transition duration-300 ease-in-out"
                  >
                    <div className="aspect-w-1 aspect-h-1 w-full sm:w-1/3 rounded-lg overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={img}
                        alt={title}
                        onClick={() => navigate(`/products/${product}`)}
                      />
                    </div>

                    <div className="w-full sm:w-2/3 sm:pl-6 mt-4 sm:mt-0">
                      <h1 className="text-2xl font-semibold text-gray-800 hover:text-blue-500 cursor-pointer transition duration-200 ease-in-out">
                        {title}
                      </h1>
                      <p className="text-gray-500 mt-2">Rating: {ratings}</p>
                      <p className="text-lg font-semibold text-gray-800 mt-2">
                        Price: ₹{price}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Discount: {discount}%
                      </p>
                      <p className="text-xl font-semibold text-green-600 mt-2">
                        Final Price: ₹{finalPrice}
                      </p>

                      <div className="flex items-center mt-4">
                        <button
                          className="bg-gray-200 text-gray-700 px-3 py-1 rounded-l-md hover:bg-gray-300 transition duration-200 ease-in-out"
                          onClick={() => decreaseQuantity(product)}
                          disabled={quantity === 1}
                        >
                          -
                        </button>
                        <div className="bg-gray-100 px-4 py-1 text-gray-800">
                          {quantity}
                        </div>
                        <button
                          className="bg-gray-200 text-gray-700 px-3 py-1 rounded-r-md hover:bg-gray-300 transition duration-200 ease-in-out"
                          onClick={() => increaseQuantity(product)}
                        >
                          +
                        </button>
                      </div>

                      <div className="mt-4">
                        <button
                          onClick={() =>
                            handleAction(() => removeFromCart(product))
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out"
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
              <div className="bg-white p-6 rounded-lg shadow-lg md:sticky md:top-4">
                <h2 className="text-2xl font-semibold mb-6">Cart Summary</h2>
                <div className="flex justify-between mb-4">
                  <p className="text-lg">Delivery Charges</p>
                  <p className="text-lg text-green-500">Free</p>
                </div>
                <div className="flex justify-between font-semibold text-lg mb-6">
                  <p>Total Amount (Items: {totalQuantity})</p>
                  <p>
                    ₹
                    {cartItems.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )}
                  </p>
                </div>
                <button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out"
                  onClick={() => navigate("/checkout")}
                >
                  Checkout
                </button>

                <div className="mt-6">
                  <button
                    onClick={clearAll}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
