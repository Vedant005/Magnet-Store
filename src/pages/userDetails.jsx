import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/userStore";
import useAddressStore from "../stores/addressStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UserDetails = () => {
  const { fetchCurrentUser, user, logout } = useUserStore();
  const {
    fetchAddresses,
    addresses,
    createAddress,
    deleteAddress,
    loading: addressLoading,
    error: addressError,
  } = useAddressStore();

  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: "",
    district: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchCurrentUser();
    fetchAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    logout(user?._id);
    navigate("/login");
  };

  const validateAddressForm = () => {
    const { street, district, city, state, pinCode, country } = newAddress;
    if (!street || !district || !city || !state || !pinCode || !country) {
      toast.error("All fields are required!");
      return false;
    }
    return true;
  };

  const handleAddNewAddress = async () => {
    if (!validateAddressForm()) return;

    await createAddress(newAddress);
    toast.success("Address added successfully!");
    setShowNewAddressForm(false);
    setNewAddress({
      street: "",
      district: "",
      city: "",
      state: "",
      pinCode: "",
      country: "",
    });
  };

  const handleDeleteAddress = (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      deleteAddress(addressId);
      toast.success("Address deleted successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6 mt-10">
            <h1 className="text-xl font-bold mb-4">{user?.fullName}</h1>
            <p className="text-gray-700 mb-2">Email: {user?.email}</p>
            <p className="text-gray-700 mb-4">Phone: {user?.phoneNumber}</p>
            <button
              onClick={handleLogout}
              className="w-full md:w-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Addresses</h2>
            {addressLoading ? (
              <p>Loading addresses...</p>
            ) : addressError ? (
              <p className="text-red-500">{addressError}</p>
            ) : (
              <ul className="space-y-4">
                {addresses.map((address) => (
                  <li
                    key={address._id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <p className="font-medium">
                      {address.street}, {address.district}
                    </p>
                    <p>
                      {address.city}, {address.state}, {address.pinCode}
                    </p>
                    <p>{address.country}</p>
                    <div className="flex justify-end space-x-4 mt-4">
                      <button
                        onClick={() => handleDeleteAddress(address._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => setShowNewAddressForm(true)}
              className="mt-4 w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              + Add New Address
            </button>

            {showNewAddressForm && (
              <div className="mt-4 space-y-4">
                {[
                  "street",
                  "district",
                  "city",
                  "state",
                  "pinCode",
                  "country",
                ].map((field) => (
                  <input
                    key={field}
                    type="text"
                    placeholder={field[0].toUpperCase() + field.slice(1)}
                    value={newAddress[field]}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, [field]: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ))}
                <div className="flex justify-between gap-4">
                  <button
                    onClick={handleAddNewAddress}
                    className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Add Address
                  </button>
                  <button
                    onClick={() => setShowNewAddressForm(false)}
                    className="w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
