import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import useCartStore from "../stores/cartStore";
import useAddressStore from "../stores/addressStore";
import useWishlistStore from "../stores/wishlistStore";

export default function Checkout() {
  const { cartItems } = useCartStore();
  const {
    addresses,
    fetchAddresses,
    createAddress,
    loading: addressLoading,
    error: addressError,
  } = useAddressStore();

  const [selectedAddress, setSelectedAddress] = useState(null);
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

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const handleAddNewAddress = async () => {
    if (
      !newAddress.street ||
      !newAddress.district ||
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.pinCode ||
      !newAddress.country
    ) {
      setErrorMessage("All fields are required to add a new address.");
      return;
    }

    // Clear any previous error messages
    setErrorMessage("");
    await createAddress(newAddress);
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

  const orderPlaced = () => {
    if (!selectedAddress) {
      alert("Please select an address.");
      return;
    }
    alert("Order Placed!!");
    useCartStore.getState().clearCart();
    useWishlistStore.getState().clearWishlist();

    navigate("/");
  };

  const amount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.finalPrice * item.quantity,
    0
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 mt-10">
        <h1 className="text-3xl font-bold mb-5 mt-4 text-center text-red-500 ">
          Checkout
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 md:h-2/4 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            {cartItems?.map((item) => (
              <div key={item.product} className="mb-2">
                <p>
                  {item.title} x {item.quantity}
                </p>
              </div>
            ))}
            <div className="mt-4 border-t pt-4">
              <p> Amount before discount : ₹{amount}</p>
              <p>Delivery Charges Free</p>
              <p className="font-bold mt-2">
                Total Amount after discounts: ₹{totalAmount}
              </p>
              <p className="text-green-600 mt-2">
                You will save ₹ {amount - totalAmount} on this order
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Select Address:</h2>
            {addressLoading ? (
              <p>Loading addresses...</p>
            ) : addressError ? (
              <p className="text-red-500">{addressError}</p>
            ) : (
              <>
                {addresses.map((address) => (
                  <div key={address._id} className="mb-4">
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        className="form-radio"
                        checked={selectedAddress === address._id}
                        onChange={() => setSelectedAddress(address._id)}
                      />
                      <span className="text-gray-700">
                        <p className="font-medium">
                          {address.street}, {address.district}
                        </p>
                        <p>
                          {address.city}, {address.state}, {address.pinCode}
                        </p>
                        <p>{address.country}</p>
                      </span>
                    </label>
                  </div>
                ))}

                <button
                  onClick={() => setShowNewAddressForm(true)}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  + Add New Address
                </button>
              </>
            )}

            {showNewAddressForm && (
              <div className="mt-4 space-y-4">
                <input
                  type="text"
                  placeholder="Street"
                  value={newAddress.street}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, street: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="District"
                  value={newAddress.district}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, district: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={newAddress.city}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, city: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={newAddress.state}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, state: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Pin Code"
                  value={newAddress.pinCode}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, pinCode: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={newAddress.country}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, country: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                />
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
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

        <button
          className="mt-8 bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 mx-auto block"
          onClick={orderPlaced}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
