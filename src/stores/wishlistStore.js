import { create } from "zustand";
import apiClient from "../utils/axiosInterceptor";
import { persist } from "zustand/middleware";
import { toast } from "react-toastify";

const useWishlistStore = create(
  persist((set, get) => ({
    wishlistItems: [],
    fetchingWishlist: false,
    loading: false,
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

    setFetchingWishlist: (fetching) => {
      set({ fetchingWishlist: fetching });
    },

    fetchWishlistItems: async () => {
      set({ fetchingWishlist: true, error: null });

      try {
        const response = await apiClient.get("/wishlist/get");
        const wishListData = Array.isArray(response.data.data)
          ? response.data.data[0]
          : response.data.data;
        const normalizedItems = get().normalizeCartData(wishListData);

        set({ wishlistItems: normalizedItems, loading: false });
      } catch (error) {
        set({
          error: error.response?.data?.message || error.message,
          fetchingWishlist: false,
        });
      }
    },

    clearWishlist: async () => {
      set({ loading: true, error: null });

      try {
        const response = await apiClient.delete("/wishlist/clear");
        const wishListData = Array.isArray(response.data.data)
          ? response.data.data[0]
          : response.data.data;
        const normalizedItems = get().normalizeCartData(wishListData);

        set({ wishlistItems: normalizedItems, loading: false });
      } catch (error) {
        set({
          error: error.response?.data?.message || error.message,
          loading: false,
        });
      }
    },

    toggleWishlist: async (productId) => {
      set({ loading: true, error: null });
      try {
        const response = await apiClient.post(`/wishlist/toggle/${productId}`);
        const wishListData = Array.isArray(response.data.data)
          ? response.data.data[0]
          : response.data.data;
        const normalizedItems = get().normalizeCartData(wishListData);
        set({ wishlistItems: normalizedItems });
        toast.success("Wiishlist toggled!");
      } catch (error) {
        set({
          error: error.response?.data?.message || error.message,
          loading: false,
        });
      }
    },

    reset: () =>
      set({ wishlistItems: [], fetchingWishlist: false, error: null }),
  }))
);

export default useWishlistStore;
