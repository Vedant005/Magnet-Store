import React, { useContext } from "react";
import {
  SORT_BY_PRICE,
  SORT_BY_RANGE,
  FILTER_BY_CATEGORY,
  SORT_BY_RATING,
  CLEAR_ALL_FILTERS,
} from "../variables/variables.js";

import { FilterContext } from "../contexts/filterContext";
import { ProductContext } from "../contexts/productContext";

function Filter({ isOpen, toggleFilter }) {
  const { productState } = useContext(ProductContext);
  const { filterState, filterDispatch } = useContext(FilterContext);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-bold">FILTERS</h1>
        <div className="flex items-center">
          <button
            onClick={() =>
              filterDispatch({ type: CLEAR_ALL_FILTERS, payload: "" })
            }
            className="text-sm text-blue-600 hover:text-blue-800 font-semibold mr-4"
          >
            CLEAR
          </button>
          <button
            onClick={toggleFilter}
            className="lg:hidden text-sm text-gray-600 hover:text-gray-800"
          >
            Close
          </button>
        </div>
      </div>

      <section className="mb-6">
        <h2 className="text-md font-semibold mb-3">SORT</h2>
        <div className="space-y-2">
          {["LTH", "HTL"].map((value) => (
            <label key={value} className="flex items-center space-x-2">
              <input
                type="radio"
                value={value}
                checked={filterState.sortBy === value}
                onChange={(e) =>
                  filterDispatch({
                    type: SORT_BY_PRICE,
                    payload: e.target.value,
                  })
                }
                className="form-radio text-blue-600"
              />
              <span>
                {value === "LTH"
                  ? "Price - Low To High"
                  : "Price - High To Low"}
              </span>
            </label>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-md font-semibold mb-3">PRICE RANGE</h2>
        <div className="flex justify-between mb-2">
          {["1K", "2K", "3K", "4K", "5K"].map((value) => (
            <span key={value} className="text-sm">
              {value}
            </span>
          ))}
        </div>
        <input
          type="range"
          min="1000"
          max="5000"
          step="1000"
          value={filterState?.priceRange || 5000}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          onChange={(e) =>
            filterDispatch({ type: SORT_BY_RANGE, payload: e.target.value })
          }
        />
      </section>

      <section className="mb-6">
        <h2 className="text-md font-semibold mb-3">CATEGORIES</h2>
        <div className="space-y-2">
          {productState?.categories?.map(({ _id, categoryName }) => (
            <label key={_id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filterState?.categoryFilter?.includes(categoryName)}
                onChange={() =>
                  filterDispatch({
                    type: FILTER_BY_CATEGORY,
                    payload: categoryName,
                  })
                }
                className="form-checkbox text-blue-600"
              />
              <span>{categoryName}</span>
            </label>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-md font-semibold mb-3">RATINGS</h2>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center space-x-2">
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={Number(filterState?.ratings) === rating}
                onChange={(e) =>
                  filterDispatch({
                    type: SORT_BY_RATING,
                    payload: e.target.value,
                  })
                }
                className="form-radio text-blue-600"
              />
              <span>{rating}⭐ and above</span>
            </label>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Filter;
