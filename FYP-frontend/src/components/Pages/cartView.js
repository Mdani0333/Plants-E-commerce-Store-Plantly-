import "./cartView.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiShoppingBag } from "react-icons/bi";
import { UserContext } from "../../context-hooks/UserContext";
import { useContext } from "react";
import { CartItem } from "./cartItem";
import NotSignedIn from "./NotSignedIn";

export function CartView({ remove }) {
  const user = useContext(UserContext);
  const [total, setTotal] = useState(0);

  console.log(user);
  return (
    <div>
      {Object.keys(user).length === 0 ? (
        <NotSignedIn />
      ) : (
        <div className="cart-container">
          <h2>
            <BiShoppingBag />
            My Cart
          </h2>
          <br />
          {user.cart.length != 0 ? (
            user.cart.map((item, index) => (
              <CartItem remove={remove} item={item} index={index} />
            ))
          ) : (
            <div className="empty-page">
              <h2>Your cart is Empty</h2>
            </div>
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
      )}
    </div>
  );
}
