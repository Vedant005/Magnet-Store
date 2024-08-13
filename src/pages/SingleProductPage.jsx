import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/productContext";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../contexts/cartContext";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

function SingleProductPage() {
  const { getsingleProduct } = useContext(ProductContext);
  const { addToCart, cart } = useContext(CartContext);
  const navigate = useNavigate();

  const [getsingle, setsingleProduct] = useState({});
  const [isInCart, setIsInCart] = useState(false);

  const { productId } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const product = await getsingleProduct(productId);
        setsingleProduct(product?.product);
      } catch (e) {
        console.log(e);
      }
    };

    getProduct();
  }, [getsingleProduct, productId]);

  const { _id, title, price, img, ratings, description } = getsingle;

  useEffect(() => {
    setIsInCart(cart.some((item) => item._id === _id));
  }, [cart, _id]);

  const handleButtonClick = () => {
    if (isInCart) {
      navigate("/cart");
    } else {
      addToCart(getsingle);
    }
  };

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
                {/* <del>
                  <p className="text-lg text-gray-600 ml-2">
                    MRP: ${(price * 1.2).toFixed(2)}
                  </p>
                </del> */}
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
      </div>
    </div>
  );
}

export default SingleProductPage;
