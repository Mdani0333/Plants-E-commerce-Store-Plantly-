import "./App.css";
import React from "react";
import { useState } from "react";
import { Navbar } from "./components/navbar.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Product } from "./components/Pages/shop.js";
import { About } from "./components//Pages/about.js";
import { Contact } from "./components/Pages/contact.js";
import products from "./Json-Data/products.json";
import User from "./Json-Data/user.json";
import { ProductsContext } from "./context-hooks/ProductsContext.js";
import { UserContext } from "./context-hooks/UserContext";
import { View } from "./components/Pages/productView.js";
import NotFound from "./components/Pages/NotFound.js";
import { Loading } from "./loading-animation/loading.js";
import { CartView } from "./components/Pages/cartView.js";
import { Favourites } from "./components/Pages/Favourites";
import { Login } from "./login/login";
import { SignUp } from "./login/signUp";

function App() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(false);
  const [token, setToken] = useState("");

  function giveToken(data) {
    setToken(data);
  }

  function pageload() {
    setInterval(() => {
      setLoading(false);
      setPage(true);
    }, 5000);
  }
  pageload();

  function addToCart(id, item) {
    if (User.cart.some((x) => x.id === id)) {
      alert("This product is already in cart");
    } else {
      User.cart.push(item);
    }
  }

  function remove(id) {
    User.cart.splice(
      User.cart.findIndex((x) => x.id === id),
      1
    );
  }

  function addToFav(id, item) {
    if (User.favourites.some((x) => x.id === id)) {
      alert("This product is already in Favourites");
    } else {
      User.favourites.push(item);
    }
  }

  function removeFromFav(id) {
    User.favourites.splice(
      User.favourites.findIndex((x) => x.id === id),
      1
    );
  }

  return (
    <div className="App-div">
      {loading && <Loading />}
      {page && (
        <BrowserRouter>
          <ProductsContext.Provider value={products}>
            <UserContext.Provider value={User}>
              <Navbar token={token} />
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    <Product addToCart={addToCart} addToFav={addToFav} />
                  }
                />
                <Route
                  exact
                  path="/product:id"
                  element={<View addToCart={addToCart} addToFav={addToFav} />}
                />
                <Route
                  exact
                  path="/my/cart"
                  element={<CartView remove={remove} />}
                />
                <Route
                  exact
                  path="/my/favourites"
                  element={<Favourites removeFromFav={removeFromFav} />}
                />
                <Route
                  exact
                  path="/login"
                  element={<Login giveToken={giveToken} />}
                />
                <Route exact path="/signUp" element={<SignUp />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/contactUs" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </UserContext.Provider>
          </ProductsContext.Provider>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
