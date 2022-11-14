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
import { GardenerLogin } from "./components/gardener/gardener-login";
import { GardenerSignUp } from "./components/gardener/gardener-signUp";
import { ProfileCompletion } from "./components/gardener/profile-completion";
import { Profile } from "./components/gardener/profile";
import { ChangePassword } from "./components/gardener/username-password-form";
import { ChangePasswordUser } from "./components/user/username-password-form";
import { Account } from "./components/user/account";
import { AllGardeners } from "./components/admin/all-gardeners";
import { HireGard } from "./components/hire-gardener/hire-gardeners";
import { VisitProfile } from "./components/hire-gardener/visit-profile";
import { LandingPage } from "./components/landing-page";
import Footer from "./components/footer";
import { useCookies } from "react-cookie";

function App() {
  //cookie
  const [cookies, setCookie] = useCookies();

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(false);

  //products
  const [products, setProducts] = useState([]);

  //user
  const [token, setToken] = useState(cookies.UserToken || "");
  // console.log(token);
  const [user, setUser] = useState(
    localStorage.getItem("User") ? JSON.parse(localStorage.getItem("User")) : {}
  );
  console.log(user);
  function giveToken(data) {
    setToken(data);
  }
  function giveUser(data) {
    setUser(data);
  }
  //refreshing single user
  function refreshUser() {
    axios
      .get("http://localhost:8080/user/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (res) {
        setUser(res.data);
      });
  }

  //gardener
  const [gardToken, setGardToken] = useState(cookies.GardToken || "");
  const [gardener, setGardener] = useState(
    localStorage.getItem("Gardener")
      ? JSON.parse(localStorage.getItem("Gardener"))
      : {}
  );
  function giveGardToken(data) {
    setGardToken(data);
  }
  function giveGard(data) {
    setGardener(data);
  }
  //refreshing single gardener
  function refreshGardener() {
    axios
      .get("http://localhost:8080/gardener/get", {
        headers: {
          Authorization: `Bearer ${gardToken}`,
        },
      })
      .then(function (res) {
        setGardener(res.data);
      });
  }

  //admin
  const [admin, setAdmin] = useState(
    localStorage.getItem("Admin")
      ? JSON.parse(localStorage.getItem("Admin"))
      : {}
  );
  const [adminToken, setAdminToken] = useState(cookies.AdminToken || "");
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
      setLoading(false);
      setPage(true);
    });
  }

  //getting only on start
  useEffect(() => {
    getProducts();
  }, []);

  //Adding to cart
  function addToCart(item) {
    console.log(item);
    axios
      .patch(
        "http://localhost:8080/user/cart",
        {
          method: "PUSH",
          product: item,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (res) {
        console.log(res.data.message);
        refreshUser();
      })
      .catch((e) => console.log(e));
  }

  //Removing from cart
  function removeFromCart(id) {
    axios
      .patch(
        "http://localhost:8080/user/cart",
        {
          method: "PULL",
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (res) {
        console.log(res.data.message);
        refreshUser();
      })
      .catch((e) => console.log(e));
  }

  //Adding to favourites
  function addToFav(item) {
    console.log(item);
    axios
      .patch(
        "http://localhost:8080/user/fav",
        {
          method: "PUSH",
          product: item,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (res) {
        console.log(res.data.message);
        refreshUser();
      })
      .catch((e) => console.log(e));
  }

  //Removing from fav
  function removeFromFav(id) {
    axios
      .patch(
        "http://localhost:8080/user/fav",
        {
          method: "PULL",
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (res) {
        console.log(res.data.message);
        refreshUser();
      })
      .catch((e) => console.log(e));
  }

  const [categories, setCategories] = useState([
    "indoorPlant",
    "mini",
    "flower",
    "pot-standee",
    "agricultural",
  ]);

  return (
    <div className="App-div">
      {loading && <Loading />}
      {page && (
        <BrowserRouter>
          <ProductsContext.Provider value={products}>
            <UserContext.Provider value={user}>
              <Suspense fallback={<Loading />}>
                <Navbar
                  token={token}
                  adminToken={adminToken}
                  gardToken={gardToken}
                  gardener={gardener}
                />
                <Routes>
                  <Route exact path="/" element={<LandingPage />} />
                  <Route
                    exact
                    path="/shop"
                    element={
                      <Product
                        categories={categories}
                        addToCart={addToCart}
                        addToFav={addToFav}
                      />
                    }
                  />
                  <Route
                    exact
                    path="/hire-gardeners"
                    element={
                      <HireGard
                        token={token}
                        adminToken={adminToken}
                        gardToken={gardToken}
                      />
                    }
                  />
                  <Route
                    exact
                    path="/hire-gardener/:id"
                    element={
                      <VisitProfile
                        token={token}
                        adminToken={adminToken}
                        gardToken={gardToken}
                      />
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
                    element={<CartView removeFromCart={removeFromCart} />}
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
                    path="/account"
                    element={
                      <Account
                        token={token}
                        giveToken={giveToken}
                        giveUser={giveUser}
                      />
                    }
                  />
                  <Route
                    exact
                    path="/user/username-password"
                    element={
                      <ChangePasswordUser
                        token={token}
                        refreshUser={refreshUser}
                      />
                    }
                  />
                  <Route
                    exact
                    path="/gardener-login"
                    element={
                      <GardenerLogin
                        giveGardToken={giveGardToken}
                        giveGard={giveGard}
                        gardener={gardener}
                      />
                    }
                  />
                  <Route
                    exact
                    path="/profile-completion"
                    element={
                      <ProfileCompletion
                        gardener={gardener}
                        gardToken={gardToken}
                      />
                    }
                  />
                  <Route
                    exact
                    path="/profile"
                    element={
                      <Profile
                        gardener={gardener}
                        gardToken={gardToken}
                        refreshGardener={refreshGardener}
                        giveGardToken={giveGardToken}
                        giveGard={giveGard}
                      />
                    }
                  />
                  <Route
                    exact
                    path="/gardener/username-password"
                    element={
                      <ChangePassword
                        gardener={gardener}
                        gardToken={gardToken}
                      />
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
                      <AdminMenu
                        admin={admin}
                        adminToken={adminToken}
                        giveAdmin={giveAdmin}
                        giveAdminToken={giveAdminToken}
                      />
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
                  <Route
                    exact
                    path="/admin/all-gardeners"
                    element={
                      <AllGardeners admin={admin} adminToken={adminToken} />
                    }
                  />
                  <Route exact path="/signUp" element={<SignUp />} />
                  <Route
                    exact
                    path="/gardener-signUp"
                    element={<GardenerSignUp />}
                  />
                  <Route exact path="/about" element={<About />} />
                  <Route exact path="/contactUs" element={<Contact />} />
                  <Route exact path="/NotSignedIn" element={<NotSignedIn />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
              </Suspense>
            </UserContext.Provider>
          </ProductsContext.Provider>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
