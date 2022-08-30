import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context-hooks/UserContext";
import { useContext } from "react";
import { BiHeart } from "react-icons/bi";
import "./favourites.css";

export function Favourites({ removeFromFav }) {
  const User = useContext(UserContext);

  return (
    <div className="fav-container">
      <h2>
        <BiHeart />
        Favourites
      </h2>
      <br />
      {User.favourites.length != 0 ? (
        <div className="fav-box">
          {User.favourites.map((item) => (
            <div className="product-card" key={item.id}>
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
                <button
                  className="product-btn"
                  onClick={() => removeFromFav(item.id)}
                >
                  Remove from Favourites
                </button>
                <Link to={`/product${item.id}`} className="product-link">
                  <button className="product-btn">See Product details</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-page">
          <h2>Add something to your Favourites!</h2>
        </div>
      )}
    </div>
  );
}
