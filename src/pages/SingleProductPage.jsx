import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/productContext";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

function SingleProductPage() {
  const { getsingleProduct } = useContext(ProductContext);
  const [getsingle, setsingleProduct] = useState({});
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

  const handleAddToCart = () => {
    // Implement add to cart functionality here
    console.log("Added to cart:", title);
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
                <del>
                  <p className="text-lg text-gray-600 ml-2">
                    MRP: ${(price * 1.2).toFixed(2)}
                  </p>
                </del>
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
                onClick={handleAddToCart}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full transition duration-300 ease-in-out transform hover:scale-105"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProductPage;
