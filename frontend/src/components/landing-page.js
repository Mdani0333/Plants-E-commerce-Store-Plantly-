import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./landing-page.css";
import { TbTruckDelivery } from "react-icons/tb";
import { BsTelephone } from "react-icons/bs";
import { BsShield } from "react-icons/bs";
import { ImLeaf } from "react-icons/im";

export function LandingPage() {
  return (
    <div>
      {/* //header */}
      <div className="header">
        <div className="des-col">
          <h1>
            Delivering <span className="h-green">Plants,</span>
          </h1>
          <h1>
            Delivering ,<span className="h-green">Happiness!</span>
          </h1>
          <p>Shop your favourite plants now!</p>
          <div className="flx">
            <Link to="/shop">
              <button className="btn btn-success w-100%">Shop Now!</button>
            </Link>
          </div>
        </div>
        <img
          src={
            "https://www.dropbox.com/s/zpfi6q79k26eho3/feey-jImW-gRjhqs-unsplash-removebg-preview.png?raw=1"
          }
          className="header-image"
        />
      </div>
      {/* sections */}
      <div className="sections">
        <div className="section">
          <TbTruckDelivery className="section-icon" />
          <div className="col">
            <h4>Fast Delivery</h4>
            <p>Orders over RM100</p>
          </div>
        </div>
        <div className="section">
          <BsTelephone className="section-icon" />
          <div className="col">
            <h4>24/7 Support</h4>
            <p>Quick Support</p>
          </div>
        </div>
        <div className="section">
          <BsShield className="section-icon" />
          <div className="col">
            <h4>Quick Payemnt</h4>
            <p>100% secure payment</p>
          </div>
        </div>
      </div>

      <div className="types-div">
        <h2 className="plant-types">Different types of Plants:</h2>
        <div className="types-row">
          <div className="types-box">
            <h3 className="types-h">Indoor Plants</h3>
            <img
              src={
                "https://www.dropbox.com/s/8e13hu01y9qir2m/feey-ZQbpzgoWYrA-unsplash-removebg-preview.png?raw=1"
              }
              className="types-images"
            />
          </div>
          <div className="types-box">
            <h3 className="types-h">Mini Plants</h3>
            <img
              src={
                "https://www.dropbox.com/s/2wqm9mca9y80l6u/angga-indratama-RGP7KmgvGRI-unsplash-removebg-preview.png?raw=1"
              }
              className="types-images"
            />
          </div>
          <div className="types-box">
            <h3 className="types-h">Flowers</h3>
            <img
              src={
                "https://www.dropbox.com/s/ber63dc7o0bsfx2/1653590696-the-sill-pink-anthurium-1653590676-removebg-preview.png?raw=1"
              }
              className="types-images"
            />
          </div>
        </div>

        <div className="types-row">
          <div className="types-box">
            <h3 className="types-h">Pot standee</h3>
            <img
              src={
                "https://www.dropbox.com/s/wbxx663wfvqplax/feey-Ug5roZHlC78-unsplash-removebg-preview.png?raw=1"
              }
              className="types-images"
            />
          </div>
          <div className="types-box">
            <h3 className="types-h">Agricultural</h3>
            <img
              src={
                "https://www.dropbox.com/s/aclgzvf3zvadk0i/sanni-sahil-LEaK1Lmd1a8-unsplash-removebg-preview.png?raw=1"
              }
              className="types-images"
            />
          </div>
        </div>
      </div>

      <div className="gift-boxes">
        <div className="gift-col">
          <h1>GIFT BOXES!</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            gravida interdum tincidunt.
          </p>
          <div className="flx">
            <Link to="/shop">
              <button className="btn btn-success w-100%">Shop Now!</button>
            </Link>
          </div>
        </div>
        <img
          className="gift-img"
          src="https://www.dropbox.com/s/juwugqpq1krhn2x/scott-webb-hDyO6rr3kqk-unsplash-removebg-preview.png?raw=1"
        />
      </div>

      {/* about us */}
      <div className="about-us-div">
        <div className="about-us">
          <h1 className="h-green">About Us</h1>
          <span className="about-logo">
            <ImLeaf color="#00ba69" fontSize="2rem" />
            <h1 className="logo_label">
              Plantly<span className="logo_dot">.</span>
            </h1>
          </span>
          <p className="italic">
            This platform aims to help the locals in purchasing plants through
            online and to provide a more convenient and more reliable way for
            users to find, view and buy the desired plants that are suitable for
            their necessity, the customers can also get description and details
            from the product online.
          </p>
        </div>
      </div>
    </div>
  );
}
