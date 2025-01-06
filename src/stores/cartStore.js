import { create } from "zustand";
import apiClient from "../utils/axiosInterceptor";
import { persist } from "zustand/middleware";
import { toast } from "react-toastify";

const useCartStore = create(
  persist((set, get) => ({
    cartItems: [],
    fetchingCart: false,
    error: null,

    normalizeCartData: (data) => {
      if (!data?.items || !Array.isArray(data.items)) {
        return [];
      }
      return data.items.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      }));
    },

    setFetchingCart: (fetching) => {
      set({ fetchingCart: fetching });
    },

    fetchCartItems: async () => {
      set({ fetchingCart: true, error: null });
      try {
        const response = await apiClient.get("/cart/get");
        const cartData = Array.isArray(response.data.data)
          ? response.data.data[0]
          : response.data.data;
        const normalizedItems = get().normalizeCartData(cartData);

        set({ cartItems: normalizedItems, fetchingCart: false });
      } catch (error) {
        set({
          error: error.response?.data?.message || error.message,
          fetchingCart: false,
        });
      }
    },

    addToCart: async (productId) => {
      try {
        const response = await apiClient.post(`/cart/add/${productId}`);
        const cartData = Array.isArray(response.data.data)
          ? response.data.data[0]
          : response.data.data;
        const normalizedItems = get().normalizeCartData(cartData);
        set({ cartItems: normalizedItems });
      } catch (error) {
        toast(error.message);
        set({
          error: error.response?.data?.message || error.message,
        });
      }
    },

    removeFromCart: async (productId) => {
      try {
        const response = await apiClient.delete(`/cart/remove/${productId}`);
        const cartData = Array.isArray(response.data.data)
          ? response.data.data[0]
          : response.data.data;
        const normalizedItems = get().normalizeCartData(cartData);
        set({ cartItems: normalizedItems });
        toast.success("Item removed from cart!");
      } catch (error) {
        set({
          error: error.response?.data?.message || error.message,
        });
      }
    },

    clearCart: async () => {
      try {
        await apiClient.delete("/cart/clear");
        set({ cartItems: [] });
      } catch (error) {
        set({
          error: error.response?.data?.message || error.message,
        });
      }
    },

    increaseQuantity: async (productId) => {
      try {
        const response = await apiClient.post(`/cart/increase/${productId}`);
        const cartData = Array.isArray(response.data.data)
          ? response.data.data[0]
          : response.data.data;
        const normalizedItems = get().normalizeCartData(cartData);
        console.log(normalizedItems);
        set({ cartItems: normalizedItems });
      } catch (error) {
        set({
          error: error.response?.data?.message || error.message,
        });
      }
    },

    decreaseQuantity: async (productId) => {
      try {
        const response = await apiClient.post(`/cart/decrease/${productId}`);
        const cartData = Array.isArray(response.data.data)
          ? response.data.data[0]
          : response.data.data;
        const normalizedItems = get().normalizeCartData(cartData);
        set({ cartItems: normalizedItems });
      } catch (error) {
        set({
          error: error.response?.data?.message || error.message,
        });
      }
    },
    reset: () => set({ cartItems: [], fetchingCart: false, error: null }),
  }))
);

export default useCartStore;
