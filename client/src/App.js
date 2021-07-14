import "./App.css";
import React from "react";
import NavbarComponent from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Cart from "./components/pages/Cart";
import SearchedProductPage from "./components/pages/SearchedProductPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { keys } from "./keys";
import ProductPage from "./components/pages/ProductPage";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

const stripePromise = loadStripe(keys[0].PUBLISHABLE_KEY);

const App = () => {
  return (
    <>
      <Router>
        <NavbarComponent />
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/product/:category/:id" component={ProductPage} />
          <Route path="/search/:product" component={SearchedProductPage} />
          <Route exact path="/" component={Home} />
          <Elements stripe={stripePromise}>
            <Route exact path="/cart" component={Cart} />
          </Elements>
        </Switch>
      </Router>
    </>
  );
};

export default App;
