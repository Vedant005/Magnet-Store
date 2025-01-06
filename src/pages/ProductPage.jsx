import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Filter from "../components/Filter";
import ProductCard from "../components/ProductCard";
import useProductStore from "../stores/productStore.js";

export default function ProductPage() {
  const { products } = useProductStore();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    useProductStore.getState().fetchAllProducts();
  }, []);
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header className="fixed top-0 w-full z-50 bg-white shadow" />
      <div className="flex-grow pt-16 px-4 lg:flex">
        <aside className="hidden lg:block sticky top-16 w-1/4 h-[calc(100vh-64px)] overflow-y-auto border-r border-gray-200 pr-4">
          <Filter />
        </aside>
        <main className="w-full lg:w-3/4 lg:ml-4 my-5">
          {products.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product._id} {...product} />
              ))}
            </div>
          ) : (
            <h4 className="text-center text-xl font-semibold">
              There are no products for selected filters.
            </h4>
          )}
        </main>
      </div>
      <button
        onClick={toggleFilter}
        className="fixed bottom-4 right-4 lg:hidden bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg"
      >
        Filters
      </button>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden ${
          isFilterOpen ? "block" : "hidden"
        }`}
        onClick={toggleFilter}
      ></div>
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white z-50 transition-transform duration-300 ease-in-out transform lg:hidden ${
          isFilterOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <Filter isOpen={isFilterOpen} toggleFilter={toggleFilter} />
      </div>
    </div>
  );
}
