import React from "react";

import { BrowserRouter, Route } from "react-router-dom";

import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <a className="brand" href="/">
              flipzon
            </a>
          </div>
          <div>
            <a href="/cart">Cart</a>
            <a href="/signin">Sign in</a>
          </div>
        </header>

        <main>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>

        <footer className="row centre">All Rights Reserved &copy;</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
