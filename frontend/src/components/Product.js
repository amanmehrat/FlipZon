import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";

export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
        {" "}
        {/* If we used <a> tag page refreshes. not ideal in a SPA   */}
        <img className="medium" src={product.image} alt={product.name} />
      </Link>

      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <div className="price">&#8377;{product.price}</div>
        <div>{product.color ? product.color : "red"}</div>
      </div>
    </div>
  );
}
