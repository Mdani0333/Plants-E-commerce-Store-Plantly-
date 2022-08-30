import "./cartView.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiMinus } from "react-icons/fi";
import { BiShoppingBag } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";
import { UserContext } from "../../context-hooks/UserContext";
import { useContext } from "react";

export function CartView({ remove }) {
  const User = useContext(UserContext);
  const [total, setTotal] = useState(0);

  const [quantity, setQuantity] = useState(1);
  function incQuantity() {
    setQuantity(quantity + 1);
  }
  function decQuantity() {
    setQuantity(quantity - 1);
  }

  return (
    <div className="cart-container">
      <h2>
        <BiShoppingBag />
        My Cart
      </h2>
      <br />
      {User.cart.length != 0 ? (
        User.cart.map((item, index) => (
          <div className="cart-item" key={item.id}>
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
            <GiCancel className="remove-btn" onClick={() => remove(item.id)} />
          </div>
        ))
      ) : (
        <div className="empty-page"><h2>Your cart is Empty</h2></div>
      )}
      <br />
      <div className="total-amount-div">
        <h3>Total:</h3>
        <h3>${total}</h3>
      </div>
      <br />
      <div>
        <Link to="/my/checkout">
          <button className="checkout-btn">Proceed To Checkout</button>
        </Link>
      </div>
    </div>
  );
}
