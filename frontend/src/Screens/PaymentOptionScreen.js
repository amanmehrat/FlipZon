import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import OrderSteps from "../components/OrderSteps";

export default function PaymentOptionScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    // To redirect to address page if user has not entered address
    props.history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };
  return (
    <div>
      <OrderSteps step1 step2 step3></OrderSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Options</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="paypal">PayPal</label>
          </div>
          <div>
            <input
              type="radio"
              id="UPI"
              value="UPI"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="UPI">UPI</label>
          </div>
          <div>
            <button className="primary" type="submit">
              Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
