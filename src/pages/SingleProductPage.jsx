import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";
import Header from "../components/Header";
import useProductStore from "../stores/productStore";
import useCartStore from "../stores/cartStore";
import useWishlistStore from "../stores/wishlistStore";
import useUserStore from "../stores/userStore";

function SingleProductPage() {
  const { singleProduct, fetchSingleProduct } = useProductStore();

  const navigate = useNavigate();
  const { addToCart, cartItems } = useCartStore();
  const { wishlistItems, toggleWishlist } = useWishlistStore();

  const { user } = useUserStore();

  const { productId } = useParams();

  useEffect(() => {
    fetchSingleProduct(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { _id, title, price, img, ratings, description } = singleProduct;

  const handleButtonClick = () => {
    if (user) {
      if (cartItems?.some((item) => item.product === _id)) {
        navigate("/cart");
      } else {
        addToCart(productId);
      }
    } else {
      navigate("/login");
    }
  };

  const toggleWishlistHandler = (e) => {
    e.stopPropagation();
    if (user) {
      if (wishlistItems?.some((item) => item._id === _id)) {
        navigate("/wishlist");
      } else {
        toggleWishlist(productId);
      }
    } else {
      navigate("/login");
    }
  };
  const isWishlisted = wishlistItems?.some((item) => item._id === _id);

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-4xl bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl p-8">
          <div key={_id} className="flex flex-col md:flex-row">
            <div className="Image-div mb-6 md:w-1/2 md:pr-4">
              <img
                className="h-80 w-full object-cover rounded-xl"
                src={img}
                alt={title}
              />
            </div>
            <div className="px-4 py-3 md:w-1/2">
              <span className="text-gray-400 mr-3 uppercase text-xs">
                Brand
              </span>
              <h1 className="text-3xl font-bold text-black capitalize mb-2">
                {title}
              </h1>
              <div className="flex items-center my-3">
                <p className="text-2xl font-semibold text-black">${price}</p>
              </div>
              <div className="flex items-center mb-4">
                <p className="text-lg mr-2">{ratings}⭐</p>
                <p className="text-sm text-gray-500">
                  (based on {Math.floor(Math.random() * 1000)} reviews)
                </p>
              </div>
              <p className="text-gray-700 mb-4">
                {description || "No description available."}
              </p>
              <button
                onClick={handleButtonClick}
                className={`mt-auto w-full text-white px-3 py-2 rounded-lg transition duration-300 text-sm mb-3 ${
                  cartItems?.some((item) => item.product === _id)
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {cartItems?.some((item) => item.product === _id)
                  ? "GO TO CART"
                  : "ADD TO CART"}
              </button>
              <button
                onClick={toggleWishlistHandler}
                className={`mt-auto w-full text-white px-3 py-2 rounded-lg transition duration-300 text-sm ${
                  isWishlisted
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isWishlisted ? "GO TO WISHLIST" : "ADD TO WISHLIST"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProductPage;
