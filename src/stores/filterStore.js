import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFilterStore = create(
  persist((set) => ({
    filters: {
      search: "",
      sortBy: "",
      priceRange: "",
      categoryFilter: [],
      ratings: "",
    },

    setFilter: (key, value) => {
      set((state) => ({
        filters: {
          ...state.filters,
          [key]: key === "ratings" ? +value : value,
        },
      }));
    },

    resetFilters: () => {
      set({
        filters: {
          search: "",
          sortBy: "",
          priceRange: "",
          categoryFilter: [],
          ratings: "",
        },
      });
    },
  }))
);

export default useFilterStore;
