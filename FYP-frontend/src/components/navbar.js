import React, { useContext } from "react";
import "./navbar.css";
import { BiShoppingBag } from "react-icons/bi";
import { BiHeart } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { ImLeaf } from "react-icons/im";
import { Link } from "react-router-dom";
import { UserContext } from "../context-hooks/UserContext";

export default function Navbar({ token, adminToken }) {
  const user = useContext(UserContext);

  function hm_nav() {
    var hm_nav = document.getElementById("hm-nav");
    hm_nav.classList.toggle("hm-nav");
    hm_nav.classList.toggle("displayNone");
  }
  function hm_btn() {
    var btn = document.getElementById("nav-icon");
    btn.classList.toggle("open");
  }

  return (
    <div>
      <nav className="nav">
        <div id="flx">
          <ImLeaf color="#00ba69" fontSize="2rem" />
          <h1 className="logo_label">
            Plantly<span className="logo_dot">.</span>
          </h1>
        </div>
        <div id="flx">
          <Link to="/" className="links">
            Home
          </Link>
          <Link to="/about" className="links">
            About
          </Link>
          <Link to="/contactUs" className="links">
            Contact
          </Link>
        </div>
        <div id="flx">
          <Link to="/my/favourites">
            <BiHeart className="icons" />
          </Link>
          <Link to="/my/cart">
            <BiShoppingBag className="icons" />
          </Link>
          <Link to="/account">
            <BiUser className="icons" />
          </Link>
          {token ? (
            <span className="greenSpan">{user.name}</span>
          ) : adminToken ? (
            <span className="greenSpan">Admin Mode On</span>
          ) : (
            <span className="redSpan">
              Login <Link to="/login">here</Link>
            </span>
          )}
        </div>
      </nav>
      <nav className="navbar">
        <div className="flex">
          <div className="flex2">
            <ImLeaf color="#00ba69" className="icons" />
            <h1 className="logo_label">
              Plantly<span>.</span>
            </h1>
          </div>
          <div
            id="nav-icon"
            onClick={() => {
              hm_nav();
              hm_btn();
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
      <nav className="displayNone" id="hm-nav">
        <div className="hm-row">
          <Link to="/my/favourites">
            <BiHeart className="icons" />
          </Link>
          <Link to="/my/cart">
            <BiShoppingBag className="icons" />
          </Link>
          <Link to="/account">
            <BiUser className="icons" />
          </Link>
        </div>
        <div className="hm-col">
          <Link to="/" className="links">
            Home
          </Link>
          <Link to="/about" className="links">
            About
          </Link>
          <Link to="/contactUs" className="links">
            Contact
          </Link>
        </div>
        <div className="hm-row">
          <button type="button" className="btn btn-outline-success">
            Login
          </button>
          <button type="button" className="btn btn-primary">
            Sign Up
          </button>
        </div>
      </nav>
    </div>
  );
}
