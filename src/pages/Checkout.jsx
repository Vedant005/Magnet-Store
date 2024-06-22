import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/cartContext";
import Header from "../components/Header";
export default function Checkout() {
  const { cart, totalItems, totalPrice } = useContext(CartContext);
  const dummyAddress = [
    {
      id: 1,
      userName: "Vedant Kanekar",
      houseNumber: "53,Stark Heights, Andromeda Galaxy , Binary system",
      city: " Mumbai",
      state: "Maharashtra",
      country: "India",
      pincode: 4000292,
      mobileNumber: 243490110,
    },
  ];
  const [getAddress, setAddress] = useState(dummyAddress);
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <h1> CHECKOUT </h1>
      <div className="checkout-container">
        <div className="checkout-box">
          <h2> Order details</h2>
          <div className="order-details">
            <hr />
            <div className="items-qty">
              <div className="item-key-name">
                <p>Items</p>
                <p>Qty</p>
              </div>
            </div>
            <div className="cart-value">
              {cart?.map(({ _id, title, quantity }) => (
                <div key={_id} className="item-key-value">
                  <p>{title}</p>
                  <p>{quantity}</p>
                </div>
              ))}
            </div>
          </div>

          <hr />

          <h2>Price details</h2>
          <hr />

          <div className="price-details">
            <div className="price-key">
              <p>Price ({totalItems} items) </p>
              <p>Delivery charges </p>
              <p> Shipping charges</p>
            </div>
            <div className="price-values">
              <p> {totalPrice}</p>
              <p> Free </p>
              <p> Free </p>
            </div>
          </div>

          <hr />
          <div className="total-price">
            <div className="total">
              <h3> Total Price</h3>
            </div>
            <div className="total-value">
              <p>{totalPrice}</p>
            </div>
          </div>
          <hr />

          <h3> Deliver to</h3>
          <div className="delivery-details">
            {getAddress.map(
              ({
                id,
                userName,
                houseNumber,
                city,
                state,
                country,
                pincode,
                mobileNumber,
              }) => {
                return (
                  <div className="delivery-address">
                    <strong>{userName}</strong>
                    <p>
                      {houseNumber}, {city}, {state}
                    </p>
                    <p>
                      Pincode: {pincode}, {country}
                    </p>
                    <p>Phone Number: {mobileNumber}</p>
                  </div>
                );
              }
            )}
          </div>

          <div className="checkout-btn">
            <button
              className="checkout-btn"
              onClick={() => {
                return (
                  <div>
                    <dialog open>
                      <p>Order received!!</p>
                      <form method="dialog">
                        <button onClick={() => navigate("/")}>Exit</button>
                      </form>
                    </dialog>
                  </div>
                );
              }}
            >
              CHECKOUT
            </button>
          </div>
        </div>

        <div className="address-box">
          <h1> Select address</h1>
          <div className="addres-details">
            {dummyAddress.map(
              ({
                id: addresId,
                userName,
                houseNumber,
                city,
                state,
                country,
                pincode,
                mobileNumber,
              }) => {
                return (
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="address-radio"
                        checked={getAddress.id === addresId}
                        onChange={(e) => {
                          setAddress(
                            dummyAddress.find(({ id }) => id === addresId)
                          );
                        }}
                      />
                      <strong>{userName}</strong>
                      <p>
                        {houseNumber}, {city}, {state}
                      </p>
                      <p>
                        Pincode: {pincode}, {country}
                      </p>
                      <p>Phone Number: {mobileNumber}</p>
                    </label>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
