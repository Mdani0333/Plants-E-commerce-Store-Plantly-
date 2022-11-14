import "./cartView.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiMinus } from "react-icons/fi";
import { GiCancel } from "react-icons/gi";

export function CartItem({ removeFromCart, item }) {
  const [quantity, setQuantity] = useState(1);

  function incQuantity() {
    setQuantity(quantity + 1);
  }
  function decQuantity() {
    setQuantity(quantity - 1);
  }

  return (
    <div className="cart-item">
      <img src={item.image} alt="" />
      <span>
        <p>-{item.specie}</p>
        <h4>{item.name}</h4>
      </span>
      <span className="greenSpan">instock ({item.instock})</span>
      <span className="product-price">${item.price}</span>
      <span className="qty-div">
        <input
          type="number"
          value={quantity}
          onChange={(e) => e.target.quantity}
          className="quantity-input-field"
        />
        <span>
          <button
            onClick={
              quantity > 1
                ? () => decQuantity()
                : console.log("instock outreached")
            }
            className="qty-btn"
          >
            <FiMinus />
          </button>
          <button
            onClick={
              quantity < item.instock
                ? () => incQuantity()
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
