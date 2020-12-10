import Order from "../models/orderModel.js";

export const cancelOrder = async (req, res) => {
  //console.log("heere");
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isCancelled = true;
    order.cancelledOn = Date.now();
    const updatedOrder = await order.save();
    res.send({ message: "order cancelled", updatedOrder });
  } else {
    res.status(404).send({ message: "order not found" });
  }
};

export const cancelOrderBot = async (id) => {
  try {
    const oldOrder = await Order.findById(id);
    //console.log("oldddd" + oldOrder.createdAt);
    if (oldOrder) {
      if (oldOrder.isCancelled) {
        return (
          "your order was already cancelled on " +
          String(oldOrder.cancelledOn).substring(0, 10)
        );
      }
      oldOrder.isCancelled = true;
      oldOrder.cancelledOn = Date.now();
      const order = await oldOrder.save();
      let responseText = "Cancellation Successful! ";
      if (order.isDelivered) {
        responseText = `Your order was delivered on ${String(
          order.deliveredOn
        ).substring(0, 10)}`;
        responseText += ". Expect pickup within 5 days ";
      } else {
        //console.log("in last else" + String(order.createdAt).substring(0, 10));
        if (order.isPaid) {
          responseText += ` .Refund of ${order.totalPrice} is initiated.`;
        } else {
          responseText += " . No Dues";
        }
      }
      return responseText;
    } else {
      return "Please check the OrderId and try again.";
    }
  } catch {
    return "Please check the OrderId and try again.";
  }
};

export const getOrder = async (id) => {
  try {
    const order = await Order.findById(id);
    // console.log(id + order.createdAt);
    if (order) {
      let responseText = "";
      if (order.isDelivered) {
        // console.log("orderCreated" + order.createdAt);
        responseText = `Your order was delivered on ${String(
          order.deliveredOn
        ).substring(0, 10)}`;
      } else if (order.isCancelled) {
        // console.log("cancelled" + order.createdAt);
        responseText += `You Cancelled the order on ${String(
          order.cancelledOn
        ).substring(0, 10)}`;
        if (order.isPaid) {
          responseText += ` .Refund of ${order.totalPrice} is initialized`;
        } else {
          responseText += " No Amounts Due";
        }
      } else {
        //console.log("in last else" + String(order.createdAt).substring(0, 10));
        responseText += `Your Order was created on ${String(
          order.createdAt
        ).substring(0, 10)}`;
        if (order.isPaid) {
          responseText += ` .Amount of ${order.totalPrice} was paid on ${String(
            order.paidOn
          ).substring(0, 10)}`;
        } else {
          responseText +=
            " .Please complete payment to avoid last minute hassles";
        }
      }
      // console.log(responseText);
      return responseText;
    } else {
      return "Please check the OrderId and try again.";
    }
  } catch {
    return "Please check the OrderId and try again.";
  }
};

export const changeColor = async (id, colour) => {
  try {
    const oldOrder = await Order.findById(id);
    //console.log(oldOrder.createdAt);
    // console.log(oldOrder.orderItems[0].color);
    if (oldOrder) {
      if (oldOrder.orderItems[0].color === colour) {
        return "Your first order item is already of " + colour + "colour";
      }
      const oldcol = oldOrder.orderItems[0].color;
      oldOrder.orderItems[0].color = colour;
      const order = await oldOrder.save();
      return `order colour changed from ${oldcol} to ${order.orderItems[0].color} successfully`;
    } else {
      return "Please check the OrderId and try again.";
    }
  } catch {
    return "Please check the OrderId and try again.";
  }
};
