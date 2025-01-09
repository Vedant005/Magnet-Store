import React, { useEffect } from "react";
import useFilterStore from "../stores/filterStore.js";
import useProductStore from "../stores/productStore.js";

function Filter({ toggleFilter }) {
  const { filters, setFilter, resetFilters } = useFilterStore();
  const { fetchFilteredProducts } = useProductStore();

  const handleApplyFilters = () => {
    fetchFilteredProducts();
  };

  const handleFilterChange = (key, value) => {
    if (key === "ratings") {
      value = parseInt(value, 10);
    }
    setFilter(key, value);

    handleApplyFilters();
  };

  const reset = () => {
    resetFilters();
    fetchFilteredProducts();
  };

  useEffect(() => {
    fetchFilteredProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-bold">FILTERS</h1>
        <div className="flex items-center">
          <button
            onClick={reset}
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
                checked={filters.sortBy === value}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
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
          value={filters.priceRange || 5000}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          onChange={(e) => handleFilterChange("priceRange", e.target.value)}
        />
      </section>

      <section className="mb-6">
        <h2 className="text-md font-semibold mb-3">CATEGORIES</h2>
        <div className="space-y-2">
          {["Bowls", "Glassware", "Plates", "Dinner Set"].map((category) => (
            <label key={category} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.categoryFilter.includes(category)}
                onChange={() => {
                  const newCategories = filters.categoryFilter.includes(
                    category
                  )
                    ? filters.categoryFilter.filter((cat) => cat !== category)
                    : [...filters.categoryFilter, category];
                  handleFilterChange("categoryFilter", newCategories);
                }}
                className="form-checkbox text-blue-600"
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </section>

      <form>
        <h2 className="text-md font-semibold mb-3">RATINGS</h2>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center space-x-2">
              <input
                type="radio"
                name="ratings"
                value={rating}
                checked={filters.ratings === rating}
                onChange={(e) => {
                  handleFilterChange("ratings", parseInt(e.target.value, 10));
                }}
                className="form-radio text-blue-600"
              />

              <span>{rating}⭐ and above</span>
            </label>
          ))}
        </div>
      </form>
    </div>
  );
}

export default Filter;
