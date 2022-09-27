import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context-hooks/UserContext";
import { useContext } from "react";
import { BiHeart } from "react-icons/bi";
import "./favourites.css";
import NotSignedIn from "./NotSignedIn";
import axios from "axios";

export function Favourites({ refreshUser }) {
  const user = useContext(UserContext);
  console.log(user);

  const [fav, setFav] = useState([]);

  const remove = async (id) => {
    setFav(user.favourites);
    fav.splice(
      fav.findIndex((x) => x._id === id),
      1
    );
    const url = `http://localhost:8080/user/fav/${user._id}`;
    const { data: res } = await axios.patch(url, fav);
    console.log(res.message);
    refreshUser();
  };

  return (
    <div>
      {Object.keys(user).length === 0 ? (
        <NotSignedIn />
      ) : (
        <div className="fav-container">
          <h2>
            <BiHeart />
            Favourites
          </h2>
          <br />
          {user.favourites.length != 0 ? (
            <div className="fav-box">
              {user.favourites.map((item, index) => (
                <div className="product-card" key={index}>
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
                      onClick={() => remove(item.id)}
                    >
                      Remove from Favourites
                    </button>
                    <Link to={`/product${item.id}`} className="product-link">
                      <button className="product-btn">
                        See Product details
                      </button>
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
      )}
    </div>
  );
}
