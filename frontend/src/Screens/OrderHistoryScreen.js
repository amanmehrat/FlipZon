import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderHistory } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function OrderHistoryScreen(props) {
  const orderList = useSelector((state) => state.orderHistory);
  const { loading, error, orders } = orderList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderHistory());
  }, [dispatch]);
  return (
    <div>
      <h1>Order History</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidOn.substring(0, 10) : "NO"}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredOn.substring(0, 10)
                    : "NO"}
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  >
                    {" "}
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
