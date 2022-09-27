import "./shop.css";
import React, { useContext, useState } from "react";
import { BiHeart } from "react-icons/bi";
import { BiShoppingBag } from "react-icons/bi";
import { ProductsContext } from "../../context-hooks/ProductsContext";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context-hooks/UserContext";
import axios from "axios";

export function Product({ refreshUser, categories }) {
  const products = useContext(ProductsContext);
  const user = useContext(UserContext);

  const [cart, setCart] = useState([]);

  const navigate = useNavigate();
  const addToCart = async (id, item) => {
    if (user.cart.some((x) => x._id === id)) {
      alert("This product is already in cart");
    } else {
      const url = `http://localhost:8080/user/cart/${user._id}`;
      const { data: res } = await axios.patch(url, cart);
      console.log(res.message);
      refreshUser();
      navigate("/my/cart");
    }
  };

  const [fav, setFav] = useState([]);

  const addToFav = async (id, item) => {
    if (user.favourites.some((x) => x._id === id)) {
      alert("This product is already in Favourites");
    } else {
      setFav(user.favourites);
      console.log(fav);
      fav.push(item);
      console.log(fav);
      const url = `http://localhost:8080/user/fav/${user._id}`;
      const { data: res } = await axios.patch(url, fav);
      console.log(res.message);
      refreshUser();
      navigate("/my/favourites");
    }
  };

  return (
    <div>
      {categories.map((value, index) => {
        return (
          <div>
            <h1 className="category">{value}</h1>
            <div className="product-box" key={index}>
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
                          to={Object.keys(user).length === 0 && "/NotSignedIn"}
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
                              Object.keys(user).length === 0 && "/NotSignedIn"
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
          </div>
        );
      })}
    </div>
  );
}
