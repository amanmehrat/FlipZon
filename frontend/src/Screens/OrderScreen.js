import React, { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { cancelOrder, payOrder, viewOrder } from "../actions/orderActions";
import Axios from "axios";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useeffectcalled");
    const addPayPalScript = async () => {
      const { data } = await Axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}&currency=INR`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || !order._id || successPay || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET }); // Payment was refreshing if this was not added. Debug properly once paypal sandbox working. Reason is as successpay is true,we always come in to call dispatch vieworder hence rerender infinite. by resetting order pay we set succespay back to false and sice we have order from previous render we go to else and no state change is seen hence no rerender
      console.log(sdkReady, successPay, orderId);
      dispatch(viewOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          console.log("papalscript added");
          addPayPalScript();
        } else {
          console.log("sdk set added" + sdkReady);
          setSdkReady(true);
        }
      }
    }
    console.log("useeffecr close");
  }, [dispatch, order, orderId, sdkReady, successPay]); // order._id not used as order may be null and dont want errors

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  const successPaymentReplicate = () => {
    const paymentResult = {
      id: Date.now().toString(),
      status: "Success",
      update_time: new Date().toString(),
      email_address: "RandomTestMail",
    };
    dispatch(payOrder(order, paymentResult));
  };

  const cancelBooking = () => {
    dispatch(cancelOrder(order));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Order {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong> {order.shippingAddress.fullName}{" "}
                  <br />
                  <strong>Address: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredOn}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
                {order.isCancelled && (
                  <MessageBox variant="success">
                    Cancelled on {order.cancelledOn}
                  </MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method: </strong> {order.paymentMethod} <br />
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid on {order.paidOn}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">
                    Please complete payment to avoid last minute hassle
                  </MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Cart Items</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          />
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div>{item.color}</div>
                        <div>
                          {item.qty} x &#8377;{item.price} = &#8377;
                          {item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>&#8377;{order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>&#8377;{order.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>&#8377;{order.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>
                    <strong>&#8377;{order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              {!order.isPaid && (
                <li>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox />}
                      <PayPalButton
                        amount={order.totalPrice}
                        currency="INR"
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    </>
                  )}
                </li>
              )}
              {!order.isPaid && (
                <li>
                  {" "}
                  <button
                    className="primary block"
                    onClick={successPaymentReplicate}
                  >
                    Force Success
                  </button>{" "}
                  {/* Only for testing */}
                </li>
              )}
              {!order.isCancelled && (
                <li>
                  {" "}
                  <button className="primary block" onClick={cancelBooking}>
                    Cancel Order
                  </button>{" "}
                  {/* Only for testing */}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
