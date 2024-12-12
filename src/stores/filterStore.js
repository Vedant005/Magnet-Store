import { create } from "zustand";

const useFilterStore = create((set) => ({
  filters: {
    search: "",
    priceRange: 5000,
    category: [],
    ratings: 0,
  },

  setFiltes: (filterKey, value) => {
    set((state) => ({
      filters: { ...state.filters, [filterKey]: value },
    }));
  },

  resetFilter: () => {
    set({
      filters: {
        search: "",
        priceRange: 5000,
        category: [],
        ratings: 0,
      },
    });
  },
}));
