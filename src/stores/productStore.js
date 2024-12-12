import { create } from "zustand";

const useProductStore = create((set) => ({
  products: [],
  singleProduct: null,
  loading: false,
  error: null,

  fetchAllProducts: async () => {
    set({ loading: true, error: null });

    try {
      const response = await fetch("/api/v1/products");
      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();
      set({ products: data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchSingleProduct: async (productId) => {
    set({ loading: true, error: null });

    try {
      const response = await fetch(`/api/v1/products/${productId}`);
      if (!response.ok) throw new Error("Failed to fetch product details");

      const data = await response.json();
      set({ singleProduct: data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createProduct: async (productData) => {
    set({ loading: true, error: null });

    try {
      const formData = new FormData();
      Object.keys(productData).forEach((key) => {
        formData.append(key, productData[key]);
      });

      const response = await fetch("/api/v1/products/create-product", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to create product");

      const newProduct = await response.json();

      set((state) => ({
        products: [...state.products, newProduct.data],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useProductStore;
