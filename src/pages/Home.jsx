import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="sticky top-0 z-10">
        <Header />
      </div>
      <div
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1607384070812-0965d8827f6f?q=80&w=2021&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        }}
        className="w-full h-[600px] bg-cover bg-center flex items-center justify-center"
      >
        <div className="text-center bg-black bg-opacity-70 p-8 rounded-lg shadow-xl">
          <h1 className="text-5xl font-bold mb-4 text-white">
            Unveiling the New
          </h1>
          <p className="text-xl mb-6 text-gray-200">
            UP TO 80% OFF on various products
          </p>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-10 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => navigate("/products")}
          >
            Shop Now
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          FEATURED PRODUCTS
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "Bowl",
              image:
                "https://images.unsplash.com/photo-1567763745030-bfe9c51bec27?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              name: "Glassware",
              image:
                "https://images.unsplash.com/photo-1498429152472-9a433d9ddf3b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdsYXNzd2FyZXxlbnwwfHwwfHx8MA%3D%3D",
            },
            {
              name: "Plates",
              image:
                "https://images.unsplash.com/photo-1515017812403-84a3777bcf21?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              name: "Dinner Set",
              image:
                "https://images.unsplash.com/photo-1561058318-2dd1655a97b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
          ].map((product, index) => (
            <div
              key={index}
              style={{
                backgroundImage: `url(${product.image})`,
              }}
              className="h-80 rounded-lg bg-cover bg-center shadow-xl overflow-hidden group relative"
            >
              <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-60" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <p className="text-white text-xl font-semibold tracking-wider transition-transform duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {product.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
