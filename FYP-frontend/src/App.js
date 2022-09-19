import "./App.css";
import React, { lazy, Suspense } from "react";
import { useState, useEffect } from "react";
import Navbar from "./components/navbar.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Product } from "./components/Pages/shop.js";
import { About } from "./components//Pages/about.js";
import { Contact } from "./components/Pages/contact.js";
import { ProductsContext } from "./context-hooks/ProductsContext.js";
import { UserContext } from "./context-hooks/UserContext";
import { View } from "./components/Pages/productView.js";
import NotFound from "./components/Pages/NotFound.js";
import { Loading } from "./loading-animation/loading.js";
import { CartView } from "./components/Pages/cartView.js";
import { Favourites } from "./components/Pages/Favourites";
import { Login } from "./login/login";
import { SignUp } from "./login/signUp";
import axios from "axios";
import NotSignedIn from "./components/Pages/NotSignedIn";
import { AdminLogin } from "./components/admin/admin-login";
import AdminMenu from "./components/admin/menu";
import { Addproduct } from "./components/admin/product-form";
import { AllProducts } from "./components/admin/all-products";
import { UpdateForm } from "./components/admin/update-form";
import { AllUsers } from "./components/admin/all-users";

function App() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(true);

  //products
  const [products, setProducts] = useState([]);

  //user
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  //admin
  const [admin, setAdmin] = useState({});
  const [adminToken, setAdminToken] = useState("");

  function giveToken(data) {
    setToken(data);
  }
  function giveUser(data) {
    setUser(data);
    // console.log(user);
  }
  function giveAdminToken(data) {
    setAdminToken(data);
  }
  function giveAdmin(data) {
    setAdmin(data);
  }

  function pageload() {
    setInterval(() => {
      setLoading(false);
      setPage(true);
    }, 5000);
  }
  // pageload();

  //getting all products
  function getProducts() {
    axios.get("http://localhost:8080/products").then(function (res) {
      setProducts(res.data);
    });
  }

  //getting only on start
  useEffect(() => {
    getProducts();
    console.log(products);
  }, []);

  function addToCart(id, item) {
    if (user.cart.some((x) => x._id === id)) {
      alert("This product is already in cart");
    } else {
      alert("work in progress");
    }
  }

  function remove(id) {
    user.cart.splice(
      user.cart.findIndex((x) => x._id === id),
      1
    );
  }

  function addToFav(id, item) {
    if (user.favourites.some((x) => x._id === id)) {
      alert("This product is already in Favourites");
    } else {
      alert("work in progress");
    }
  }

  function removeFromFav(id) {
    user.favourites.splice(
      user.favourites.findIndex((x) => x._id === id),
      1
    );
  }

  return (
    <div className="App-div">
      {loading && <Loading />}
      {page && (
        <BrowserRouter>
          <ProductsContext.Provider value={products}>
            <UserContext.Provider value={user}>
              <Suspense fallback={<Loading />}>
                <Navbar token={token} adminToken={adminToken} />
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
                    element={
                      <Login giveToken={giveToken} giveUser={giveUser} />
                    }
                  />
                  <Route
                    exact
                    path="/admin/login"
                    element={
                      <AdminLogin
                        giveAdmin={giveAdmin}
                        giveAdminToken={giveAdminToken}
                      />
                    }
                  />
                  <Route
                    exact
                    path="/admin"
                    element={
                      <AdminMenu admin={admin} adminToken={adminToken} />
                    }
                  />
                  <Route
                    exact
                    path="/admin/post-product"
                    element={
                      <Addproduct admin={admin} adminToken={adminToken} />
                    }
                  />
                  <Route
                    exact
                    path="/admin/all-products"
                    element={
                      <AllProducts
                        admin={admin}
                        adminToken={adminToken}
                        getProducts={getProducts}
                      />
                    }
                  />
                  <Route
                    exact
                    path="/admin/update:id"
                    element={
                      <UpdateForm admin={admin} adminToken={adminToken} />
                    }
                  />
                  <Route
                    exact
                    path="/admin/all-users"
                    element={<AllUsers admin={admin} adminToken={adminToken} />}
                  />
                  <Route exact path="/signUp" element={<SignUp />} />
                  <Route exact path="/about" element={<About />} />
                  <Route exact path="/contactUs" element={<Contact />} />
                  <Route exact path="/NotSignedIn" element={<NotSignedIn />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </UserContext.Provider>
          </ProductsContext.Provider>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
