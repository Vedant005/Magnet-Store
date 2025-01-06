import { create } from "zustand";
import apiClient from "../utils/axiosInterceptor";
import { toast } from "react-toastify";

const useAddressStore = create((set, get) => ({
  addresses: [],
  loading: false,
  error: null,

  fetchAddresses: async () => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.get("/address/get");
      set({ addresses: response.data.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch addresses",
        loading: false,
      });
    }
  },

  createAddress: async (addressData) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.post("/address/create", addressData);
      set((state) => ({
        addresses: [...state.addresses, response.data.data],
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to create address",
        loading: false,
      });
      toast.error(error.message);
    }
  },

  updateAddress: async (addressId, updatedData) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.put(
        `/address/${addressId}`,
        updatedData
      );
      set((state) => ({
        addresses: state.addresses.map((address) =>
          address._id === addressId ? response.data.data : address
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to update address",
        loading: false,
      });
    }
  },

  deleteAddress: async (addressId) => {
    set({ loading: true, error: null });
    try {
      await apiClient.delete(`/address/${addressId}`);
      set((state) => ({
        addresses: state.addresses.filter(
          (address) => address._id !== addressId
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete address",
        loading: false,
      });
    }
  },
}));

export default useAddressStore;
