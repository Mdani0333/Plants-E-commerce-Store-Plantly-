import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NotSignedIn from "../Pages/NotSignedIn";
import { UserContext } from "../../context-hooks/UserContext";
import { MdEmail } from "react-icons/md";
import "./account.css";
import { useCookies } from "react-cookie";

export function Account({ token, giveUser, giveToken }) {
  const user = useContext(UserContext);

  //cookie
  const [cookies, setCookie] = useCookies(["UserToken"]);

  const navigate = useNavigate();

  function Logout() {
    setCookie("UserToken", "", { path: "/" });
    giveToken("");
    localStorage.removeItem("User");
    giveUser({});
    navigate("/");
  }
  return (
    <div>
      {token ? (
        <div className="profile-container">
          <div className="account-div">
            <h1>{user.name}</h1>
            <p>
              <MdEmail className="p-icons" />
              {user.email}
            </p>
            <br />

            <div>
              <Link to="/my/favourites">
                <button class="btn btn-success">
                  See Saved products {"->"}
                </button>
              </Link>
            </div>
            <br />

            <div>
              <Link to="/my/cart">
                <button class="btn btn-success">See your cart {"->"}</button>
              </Link>
            </div>
            <br />

            <div>
              <Link to="/my/shoppingHistory">
                <button class="btn btn-success">
                  See your recent Orders {"->"}
                </button>
              </Link>
            </div>
            <br />

            <div>
              <Link to="/user/username-password">
                <button class="btn btn-primary">
                  change username or password
                </button>
              </Link>
            </div>
            <br />

            <div>
              <button class="btn btn-danger" onClick={() => Logout()}>
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <NotSignedIn />
      )}
    </div>
  );
}
