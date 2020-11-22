import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SigninScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: Sign in action
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>sign In</h1>
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label></label>
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label></label>
          <div>
            New Customer? {/* Way to enter space in text in react */}
            <Link to="/register">Create your account</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
