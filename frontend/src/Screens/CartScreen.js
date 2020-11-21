import React from "react";

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const Qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1; // This gets us the value right after question mark in URL
  return (
    <div>
      <h1>Cart Screen</h1>
      <p>
        ADD TO CART : ProductID : {productId} Qty : {Qty}
      </p>
    </div>
  );
}
