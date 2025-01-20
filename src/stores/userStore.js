import { create } from "zustand";
import { persist } from "zustand/middleware";
import apiClient from "../utils/axiosInterceptor";
import { toast } from "react-toastify";
import useCartStore from "./cartStore";
import useWishlistStore from "./wishlistStore";

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,

      // Login user
      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const response = await apiClient.post("/users/login", credentials);
          set({
            user: response.data.data.user,
            loading: false,
          });
          toast.success("Login successful!");
        } catch (error) {
          set({
            error: error.response?.data?.message || error.message,
            loading: false,
          });
          toast.error(error.response?.data?.message || "Login failed");
          throw error;
        }
      },

      // Logout user
      logout: async () => {
        set({ loading: true, error: null });

        try {
          await apiClient.post("/users/logout", {});
          useCartStore.getState().reset();
          useWishlistStore.getState().reset();

          toast.success("Logged out successfully");
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          set({ user: null, loading: false, error: null });
          localStorage.removeItem("user-store");
        }
      },

      // Refresh access token
      refreshAccessToken: async () => {
        try {
          await apiClient.post(
            "/users/refresh-token",
            {},
            { withCredentials: true }
          );
          console.log("Access token refreshed successfully");
          return true;
        } catch (error) {
          console.error("Refresh token error:", error);

          set({
            user: null,
            error: "Session expired. Please login again.",
          });
          // toast.error("Session expired. Please login again.");
          return false;
        }
      },

      // Fetch current logged-in user
      fetchCurrentUser: async () => {
        const currentUser = get().user;
        if (!currentUser) return;

        set({ loading: true, error: null });
        try {
          const response = await apiClient.get("/users/current-user");
          set({ user: response.data.data, loading: false });
        } catch (error) {
          console.error("Fetch current user error:", error);
          if (error.response?.status === 401) {
            const refreshSuccessful = await get().refreshAccessToken();
            if (refreshSuccessful) {
              return get().fetchCurrentUser();
            }
          }
          set({
            error: error.response?.data?.message || error.message,
            loading: false,
          });
        }
      },

      // Helper method to check if user is authenticated
      isAuthenticated: () => {
        const state = get();
        return !!state.user;
      },
    }),
    {
      name: "user-store",
      partialize: (state) => ({ user: state.user }),
    }
  )
);

export default useUserStore;
