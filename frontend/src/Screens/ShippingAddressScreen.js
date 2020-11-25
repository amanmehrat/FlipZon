import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import OrderSteps from "../components/OrderSteps";

export default function ShippingAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin); // To make sure only loggedin user can access this page
  const { userInfo } = userSignin;
  if (!userInfo) {
    props.history.push("/signin");
  }
  const cart = useSelector((state) => state.cart); // To get the addess filled by user if user comes back or refreshes page
  const { shippingAddress } = cart;
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAdress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalcode, setPostalcode] = useState(shippingAddress.postalcode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalcode, country })
    );
    props.history.push("/payment");
  };
  return (
    <div>
      <OrderSteps step1 step2></OrderSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Adress</label>
          <input
            type="text"
            id="address"
            placeholder="Enter your Address"
            value={address}
            onChange={(e) => setAdress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Your City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="postalcode">Postal Code</label>
          <input
            type="text"
            id="postalcode"
            placeholder="postalcode"
            value={postalcode}
            onChange={(e) => setPostalcode(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="country">Your Country</label>
          <input
            type="text"
            id="country"
            placeholder="Enter your country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor=""></label>
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
