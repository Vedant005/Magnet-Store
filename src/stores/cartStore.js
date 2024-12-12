import { create } from "zustand";

const useCartStore = create((set) => ({
  cartItems: [],
  loading: false,
  error: null,

  fetchCartItems: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/api/v1/cart/get-cart-items");
      if (!response.ok) throw new Error("Failed to fetch cart items");

      const data = await response.json();
      set({ cartItems: data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addToCart: async (productId) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/api/v1/cart/add-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      if (!response.ok) throw new Error("Failed to add to cart");

      const updatedCart = await response.json();
      set((state) => ({ cartItems: updatedCart.data, loading: false }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  removeFromCart: async (productId) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/api/v1/cart/remove-from-cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      if (!response.ok) throw new Error("Failed to remove from cart");

      const updatedCart = await response.json();
      set((state) => ({ cartItems: updatedCart.data, loading: false }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  clearCart: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/api/v1/cart/clear-cart", {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to clear cart");

      set({ cartItems: [], loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useCartStore;
