import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NotFound from "../Pages/NotFound";
import { ImLeaf } from "react-icons/im";
import "./menu.css";
import { useCookies } from "react-cookie";

export default function Menu({ admin, adminToken, giveAdmin, giveAdminToken }) {
  //cookie
  const [cookies, setCookie] = useCookies(["GardToken"]);

  const navigate = useNavigate();

  function Logout() {
    setCookie("AdminToken", "", { path: "/" });
    giveAdminToken("");

    localStorage.removeItem("Admin");
    giveAdmin({});

    navigate("/");
  }
  return (
    <div>
      {adminToken ? (
        <div className="menu-container">
          <h2 className="welcome-admin">
            <ImLeaf color="#00ba69" fontSize="2rem" />
            Welcome, {admin.name}
          </h2>
          <br />
          <div className="option-container">
            <h5>Select:</h5>
            <div className="menu-option">
              <Link to="/admin/post-product" className="link">
                <h3>1. Post a new Product</h3>
              </Link>
            </div>
            <div className="menu-option">
              <Link to="/admin/all-products" className="link">
                <h3>2. Edit/Delete a Product</h3>
              </Link>
            </div>
            <div className="menu-option">
              <Link to="/admin/all-users" className="link">
                <h3>3. Manage users</h3>
              </Link>
            </div>
            <div className="menu-option">
              <Link to="/admin/all-gardeners" className="link">
                <h3>4. Manage gardeners</h3>
              </Link>
            </div>

            <button class="btn btn-danger" onClick={() => Logout()}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
}
