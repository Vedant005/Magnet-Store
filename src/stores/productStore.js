import { create } from "zustand";
import apiClient from "../utils/axiosInterceptor";
import useFilterStore from "./filterStore";

const useProductStore = create((set, get) => ({
  products: [],
  singleProduct: {},
  loading: true,
  error: null,

  fetchFilteredProducts: async () => {
    const { filters } = useFilterStore.getState();
    set((state) => ({
      loading: true,
      error: null,
    }));

    try {
      const response = await apiClient.get("/filter/apply", {
        params: filters,
      });
      set((state) => ({
        products: response.data.data,
        loading: false,
      }));
    } catch (error) {
      set((state) => ({
        error: error.response?.data?.message || error.message,
        // loading: false,
      }));
    }
  },

  fetchAllProducts: async () => {
    set((state) => ({
      loading: true,
      error: null,
    }));

    try {
      const response = await apiClient.get("/products/get");
      set((state) => ({
        products: response.data.data,
        loading: false,
      }));
    } catch (error) {
      console.log(error);

      set((state) => ({
        error: error.response?.data?.message || error.message,
        // loading: false,
      }));
    }
  },

  fetchSingleProduct: async (productId) => {
    set((state) => ({
      loading: true,
      error: null,
    }));

    try {
      const response = await apiClient.get(`/products/${productId}`);
      set((state) => ({
        singleProduct: response.data.data,
        loading: false,
      }));
    } catch (error) {
      set((state) => ({
        error: error.response?.data?.message || error.message,
        // loading: false,
      }));
    }
  },
}));

export default useProductStore;
