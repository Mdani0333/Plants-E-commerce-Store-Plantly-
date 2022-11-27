import "./cartView.css";
import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { GiCancel } from "react-icons/gi";
import axios from "axios";

export function CartItem({ removeFromCart, item, token, giveUser }) {
  //quantity increment
  function incQuantity(id) {
    axios
      .patch(
        "http://localhost:8080/user/cart/quantity",
        {
          method: "INC",
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        giveUser(res.data);
        localStorage.setItem("User", JSON.stringify(res.data));
      });
  }

  function decQuantity(id) {
    axios
      .patch(
        "http://localhost:8080/user/cart/quantity",
        {
          method: "DEC",
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        giveUser(res.data);
        localStorage.setItem("User", JSON.stringify(res.data));
      });
  }

  return (
    <div className="cart-item">
      <img src={item.image} alt="" />
      <span>
        <p>-{item.specie}</p>
        <h4>{item.name}</h4>
      </span>
      <span className="greenSpan">instock ({item.instock})</span>
      <span className="product-price">Rs{item.price}</span>
      <span className="qty-div">
        <input
          type="number"
          value={item.quantity}
          className="quantity-input-field"
        />
        <span>
          <button
            onClick={
              item.quantity > 1
                ? () => decQuantity(item._id)
                : console.log("instock outreached")
            }
            className="qty-btn"
          >
            <FiMinus />
          </button>
          <button
            onClick={
              item.quantity < item.instock
                ? () => incQuantity(item._id)
                : console.log("instock reached")
            }
            className="qty-btn"
          >
            <FiPlus />
          </button>
        </span>
      </span>
      <GiCancel
        className="remove-btn"
        onClick={() => removeFromCart(item._id)}
      />
    </div>
  );
}
