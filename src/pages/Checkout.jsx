import React, { useContext, useState } from "react";
import { CartContext } from "../contexts/cartContext";
import Header from "../components/Header";
export default function Checkout() {
  const { cart, totalItems, totalPrice } = useContext(CartContext);
  const [addresses, setAddresses] = useState([
    {
      name: "Krushna Kulkarni",
      street: "Ganesh Nagar, Paud Road",
      city: "Pune",
      state: "Maharashtra",
      pin: "411057",
      phone: "1256394870",
    },
    {
      name: "Adarsh Balika",
      street: "Tirupati Colony, Pangri Road",
      city: "Beed",
      state: "Maharashtra",
      pin: "431122",
      phone: "9420101718",
    },
  ]);
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    pin: "",
    phone: "",
  });

  const handleAddNewAddress = () => {
    setAddresses([...addresses, newAddress]);
    setShowNewAddressForm(false);
    setNewAddress({
      name: "",
      street: "",
      city: "",
      state: "",
      pin: "",
      phone: "",
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            {cart.map((item) => (
              <div key={item._id} className="mb-2">
                <p>
                  {item.title} x {item.quantity}
                </p>
              </div>
            ))}
            <div className="mt-4 border-t pt-4">
              <p>Price: (3 items) ₹{totalPrice}</p>
              <p>Discount ₹1800</p>
              <p>Delivery Charges Free</p>
              <p>Coupon Discount ₹0</p>
              <p className="font-bold mt-2">
                Total Amount ₹{totalPrice - 1800}
              </p>
              <p className="text-green-600 mt-2">
                You will save ₹1800 on this order
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Select Address:</h2>
            {addresses.map((address, index) => (
              <div key={index} className="mb-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    className="form-radio"
                    checked={selectedAddress === index}
                    onChange={() => setSelectedAddress(index)}
                  />
                  <span className="text-gray-700">
                    <p className="font-medium">{address.name}</p>
                    <p>{address.street}</p>
                    <p>
                      {address.city}, {address.state}
                    </p>
                    <p>Pin: {address.pin}</p>
                    <p>Phone: {address.phone}</p>
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
            {showNewAddressForm && (
              <div className="mt-4 space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={newAddress.name}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                />
                {/* Add more input fields for other address details */}
                <button
                  onClick={handleAddNewAddress}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Add Address
                </button>
              </div>
            )}
          </div>
        </div>
        <button className="mt-8 bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 mx-auto block">
          Place Order
        </button>
      </div>
    </div>
  );
}
