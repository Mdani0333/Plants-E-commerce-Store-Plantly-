import "./shop.css";
import React from "react";
import { BiHeart } from "react-icons/bi";
import { BiShoppingBag } from "react-icons/bi";
import { useContext } from "react";
import { ProductsContext } from "../../context-hooks/ProductsContext";
import { Link } from "react-router-dom";

export function Product({ addToCart, addToFav }) {
  const products = useContext(ProductsContext);
  return (
    <div className="product-box">
      {products.map((item) => (
        <div className="product-card" key={item.id}>
          <Link to={`/product${item.id}`} className="product-link">
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
              <Link to="/my/favourites">
                <button
                  className="product-btn"
                  onClick={() => addToFav(item.id, item)}
                >
                  Add to Favourites
                  <BiHeart />
                </button>
              </Link>
              {item.instock ? (
                <Link to="/my/cart">
                  <button
                    className="product-btn"
                    onClick={() => addToCart(item.id, item)}
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
