import React, { useContext } from "react";
import "./navbar.css";
import { BiShoppingBag } from "react-icons/bi";
import { BiHeart } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { ImLeaf } from "react-icons/im";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { UserContext } from "../context-hooks/UserContext";

export default function Navbar({ token, adminToken, gardToken, gardener }) {
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
          {/* {token || gardToken || adminToken ? (
            <div className="display-none"></div>
          ) : (
            <form className="flex">
              <input
                class="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <AiOutlineSearch className="icons" />
            </form>
          )} */}
        </div>
        <div id="flx">
          {Object.keys(gardener).length === 0 ? (
            <div>
              <Link to="/" className="links">
                Home
              </Link>
              <Link to="/shop" className="links">
                Shop
              </Link>
            </div>
          ) : (
            <div className="display-none"></div>
          )}
          {token || adminToken || gardToken ? (
            <div>
              <Link to="/hire-gardeners" className="links">
                Hire Gardeners
              </Link>
            </div>
          ) : (
            <div className="display-none"></div>
          )}

          {Object.keys(gardener).length === 0 ? (
            <>
              <Link to="/about" className="links">
                About
              </Link>
              <Link to="/contactUs" className="links">
                Contact
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>
        <div id="flx">
          {adminToken ? (
            <Link to="/admin" className="links">
              Menu
            </Link>
          ) : (
            <div id="flx">
              {Object.keys(gardener).length === 0 ? (
                <div>
                  <Link to="/my/favourites">
                    <BiHeart className="icons" />
                  </Link>
                  <Link to="/my/cart">
                    <BiShoppingBag className="icons" />
                  </Link>
                </div>
              ) : (
                <div className="display-none"></div>
              )}
              <Link
                to={
                  token ? "/account" : gardToken ? "/profile" : "/NotSignedIn"
                }
              >
                <BiUser className="icons" />
              </Link>
            </div>
          )}
          {token ? (
            <span className="greenSpan">{user.name}</span>
          ) : adminToken ? (
            <span className="greenSpan">Admin Mode On</span>
          ) : gardToken ? (
            <span className="greenSpan">{gardener.name}</span>
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
