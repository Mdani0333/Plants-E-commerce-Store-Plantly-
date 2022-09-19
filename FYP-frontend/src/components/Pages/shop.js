import "./shop.css";
import React, { useContext } from "react";
import { BiHeart } from "react-icons/bi";
import { BiShoppingBag } from "react-icons/bi";
import { ProductsContext } from "../../context-hooks/ProductsContext";
import { Link } from "react-router-dom";
import { UserContext } from "../../context-hooks/UserContext";

export function Product({ addToCart, addToFav }) {
  const products = useContext(ProductsContext);
  const user = useContext(UserContext);
  return (
    <div className="product-box">
      {products.map((item) => (
        <div className="product-card" key={item._id}>
          <Link to={`/product${item._id}`} className="product-link">
            <img src={item.image} alt="" className="product-img" />
            <div className="product-text-padding">
              <p>-{item.specie}</p>
              <h2>{item.name}</h2>
              <label className="span-box">
                <span className="product-price">${item.price}</span>
              </label>
              <label className="span-box">
                {item.instock ? (
                  <span className="greenSpan">Instock</span>
                ) : (
                  <span className="redSpan">OutOfStock</span>
                )}
              </label>
              <Link
                to={
                  Object.keys(user).length === 0
                    ? "/NotSignedIn"
                    : "/my/favourites"
                }
              >
                <button
                  className="product-btn"
                  onClick={() => addToFav(item._id, item)}
                >
                  Add to Favourites
                  <BiHeart />
                </button>
              </Link>
              {item.instock ? (
                <Link
                  to={
                    Object.keys(user).length === 0 ? "/NotSignedIn" : "/my/cart"
                  }
                >
                  <button
                    className="product-btn"
                    onClick={() => addToCart(item._id, item)}
                  >
                    Add to Cart
                    <BiShoppingBag />
                  </button>
                </Link>
              ) : (
                "block"
              )}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
