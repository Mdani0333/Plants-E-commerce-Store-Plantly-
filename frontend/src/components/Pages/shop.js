import "./shop.css";
import React, { useContext, useState } from "react";
import { BiHeart } from "react-icons/bi";
import { BiShoppingBag } from "react-icons/bi";
import { ProductsContext } from "../../context-hooks/ProductsContext";
import { Link } from "react-router-dom";
import { UserContext } from "../../context-hooks/UserContext";
import axios from "axios";

export function Product({ categories, addToCart, addToFav }) {
  const products = useContext(ProductsContext);
  const user = useContext(UserContext);

  return (
    <div>
      {categories.map((value, index) => {
        return (
          <div key={index}>
            <h1 className="category">{value}</h1>
            <div className="product-box">
              {products
                .filter((x) => x.category == value)
                .map((item, index) => (
                  <div className="product-card" key={index}>
                    <Link to={`/product${item._id}`} className="product-link">
                      <img src={item.image} alt="" className="product-img" />
                      <div className="product-text-padding">
                        <p>-{item.specie}</p>
                        <h2>{item.name}</h2>
                        <label className="span-box">
                          <span className="product-price">Rs{item.price}</span>
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
                            onClick={() => addToFav(item)}
                          >
                            Add to Favourites
                            <BiHeart />
                          </button>
                        </Link>
                        {item.instock ? (
                          <Link
                            to={
                              Object.keys(user).length === 0
                                ? "/NotSignedIn"
                                : "/my/cart"
                            }
                          >
                            <button
                              className="product-btn"
                              onClick={() => {
                                addToCart(item);
                              }}
                            >
                              Add to Cart
                              <BiShoppingBag />
                            </button>
                          </Link>
                        ) : (
                          <></>
                        )}
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
