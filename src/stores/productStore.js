import { create } from "zustand";
import apiClient from "../utils/axiosInterceptor";
import useFilterStore from "./filterStore";

const useProductStore = create((set) => ({
  products: [],
  singleProduct: {},
  loading: false,
  error: null,

  fetchFilteredProducts: async () => {
    const { filters } = useFilterStore.getState();

    set({ loading: true, error: null });

    try {
      const response = await apiClient.get("/filter/apply", {
        params: filters,
      });
      set({ products: response.data.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
    }
  },

  fetchAllProducts: async () => {
    set({ loading: true, error: null });

    try {
      const response = await apiClient.get("/products/get");
      set({ products: response.data.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
    }
  },

  fetchSingleProduct: async (productId) => {
    set({ loading: true, error: null });

    try {
      const response = await apiClient.get(`/products/${productId}`);
      set({ singleProduct: response.data.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
    }
  },
}));

export default useProductStore;
