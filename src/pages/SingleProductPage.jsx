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

  const { _id, title, price, img, ratings } = getsingle;

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-3xl bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl p-8">
          <div key={_id}>
            <div className="Image-div mb-6">
              <img
                className="h-80 w-full object-cover rounded-t-xl"
                src={img}
                alt={title}
              />
            </div>
            <div className="px-4 py-3">
              <span className="text-gray-400 mr-3 uppercase text-xs">
                Brand
              </span>
              <p className="text-2xl font-bold text-black truncate block capitalize">
                {title}
              </p>
              <div className="flex items-center my-3">
                <p className="text-2xl font-semibold text-black">{price}</p>
                <div className="ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-bag-plus"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                    />
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center">
                <del>
                  <p className="text-lg text-gray-600 ml-2">MRP: {price}</p>
                </del>
                <div className="ml-auto">
                  <p className="text-lg">{ratings}⭐</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProductPage;
