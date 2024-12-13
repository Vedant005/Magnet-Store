import { create } from "zustand";

const useWishlistStore = create((set) => ({
  wishlistItems: [],
  loading: false,
  error: null,

  fetchWishlistItems: async () => {
    set({ loading: true, error: null });

    try {
      const response = await fetch("/api/v1/wishlist/get-wishlist-items");
      if (!response.ok) {
        throw new Error("Failed to fetch wishlist items");
      }

      const data = await response.json();
      set({ wishlistItems: data.data, loading: false });
    } catch (error) {
      set({ error: error.message, leading: false });
    }
  },

  addToWishlist: async (productId) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/api/v1/wishlist/add-wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      if (!response.ok) throw new Error("Failed to add to wishlist");

      const updatedWishlist = await response.json;
      set({ wishlistItems: updatedWishlist.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  removeFromWishlist: async (productId) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/api/v1/wishlist/remove-from-wishlist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      if (!response.ok) throw new Error("Failed to remove from wishlist");

      const updatedWishlist = await response.json();
      set({ wishlistItems: updatedWishlist.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  clearWishlist: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/api/v1/wishlist/clear-wishlist", {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to clear wishlist");

      set({ wishlistItems: [], loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useWishlistStore;
