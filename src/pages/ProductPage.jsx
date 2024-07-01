import React, { useContext } from "react";
import Header from "../components/Header";
import Filter from "../components/Filter";
import ProductCard from "../components/ProductCard";
import { FilterContext } from "../contexts/filterContext";

export default function ProductPage() {
  const { sortByPriceFilteredProducts } = useContext(FilterContext);

  return (
    <div className="main">
      <div className="mb-8">
        <Header />
      </div>
      <div className="flex px-4">
        <div className="fixed top-20 left-4 w-1/5 h-[calc(100vh-96px)] overflow-y-auto border-r border-gray-200 pr-4">
          <div className="filter flex justify-center">
            <Filter />
          </div>
        </div>
        <div className="ml-[23%] w-[77%] border-l border-gray-200 pl-5 my-5">
          <div className="product">
            {sortByPriceFilteredProducts.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                {sortByPriceFilteredProducts?.map((product) => (
                  <ProductCard key={product._id} {...product} />
                ))}
              </div>
            ) : (
              <h4>There are no products for selected filters.</h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
