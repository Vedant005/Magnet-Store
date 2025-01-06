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
      accessToken: null,
      loading: false,
      error: null,

      register: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const response = await apiClient.post("/users/register", credentials);
          set({ loading: false });
          toast.success("Registration successful! Please login to continue.");
          return response.data.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || error.message,
            loading: false,
          });
          toast.error(error.response?.data?.message || "Registration failed");
          throw error;
        }
      },

      // Login user
      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const response = await apiClient.post("/users/login", credentials);
          const { user, accessToken } = response.data.data;
          set({
            user,
            accessToken,
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

      logout: async () => {
        set({ loading: true, error: null });

        try {
          const state = get();

          const config = {
            headers: state.accessToken
              ? {
                  Authorization: `Bearer ${state.accessToken}`,
                }
              : {},
          };

          await apiClient.post("/users/logout", {}, config);
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          set({
            user: null,
            accessToken: null,
            loading: false,
            error: null,
          });

          localStorage.removeItem("user-store");
          toast.success("Logged out successfully");
          useCartStore.getState().reset();
          useWishlistStore.getState().reset();

          if (window?.clearOtherStores) {
            window.clearOtherStores();
          }
        }
      },

      clearAuth: () => {
        set({
          user: null,
          accessToken: null,
          loading: false,
          error: null,
        });
        localStorage.removeItem("user-store");
      },
      // Fetch the current logged-in user
      fetchCurrentUser: async () => {
        const currentUser = get().user;
        if (!currentUser) return;

        set({ loading: true, error: null });
        try {
          const response = await apiClient.get("/users/current-user");
          set({
            user: response.data.data,
            loading: false,
          });
        } catch (error) {
          console.error("Fetch current user error:", error);
          if (error.response?.status === 401) {
            // If unauthorized, try to refresh token
            const refreshSuccessful = await get().refreshAccessToken();
            if (refreshSuccessful) {
              // Retry fetching user data
              return get().fetchCurrentUser();
            }
          }
          set({
            error: error.response?.data?.message || error.message,
            loading: false,
          });
        }
      },

      // Refresh access token
      refreshAccessToken: async () => {
        try {
          const response = await apiClient.post("/users/refresh-token");
          const { accessToken } = response.data.data;

          set({ accessToken });
          console.log("Access token refreshed successfully");
          return true;
        } catch (error) {
          console.error("Refresh token error:", error);
          // Clear user data on refresh token failure
          set({
            user: null,
            accessToken: null,
            error: "Session expired. Please login again.",
          });
          toast.error("Session expired. Please login again.");
          return false;
        }
      },

      // Helper method to check if user is authenticated
      isAuthenticated: () => {
        const state = get();
        return !!(state.user && state.accessToken);
      },
    }),
    {
      name: "user-store",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
    }
  )
);

export default useUserStore;
