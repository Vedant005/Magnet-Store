import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (credentials) => {
    set({ loading: true, error: null });

    try {
      const response = await fetch("/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error("Failed to login");

      const user = await response.json();
      set({ user: user.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  register: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/api/v1/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) throw new Error("Failed to register");
      const registeredUser = await response.json();
      set({ user: registeredUser.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchCurrentUser: async () => {
    set({ loading: true, error: null });

    try {
      const response = await fetch("/api/v1/users/current-user");
      if (!response.ok) throw new Error("Failed to fetch current user");

      const user = await response.json();
      set({ user: user.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  logout: async () => {
    set({ loading: true, error: null });
    try {
      await fetch("/api/v1/users/logout", { method: "POST" });
      set({ user: null, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useUserStore;
