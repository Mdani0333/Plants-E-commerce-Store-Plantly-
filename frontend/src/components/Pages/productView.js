import "./productView.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ProductsContext } from "../../context-hooks/ProductsContext";
import { UserContext } from "../../context-hooks/UserContext";
import { BiShoppingBag } from "react-icons/bi";
import { Link } from "react-router-dom";
import { MdOutlineWaterDrop } from "react-icons/md";
import { FaTemperatureHigh } from "react-icons/fa";
import { MdOutlineLightMode } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import { RiLineHeight } from "react-icons/ri";
import { BiHeart } from "react-icons/bi";
import { RiAlarmWarningLine } from "react-icons/ri";

export function View({ addToCart, addToFav }) {
  const { id } = useParams();
  const products = useContext(ProductsContext);
  const user = useContext(UserContext);

  const [view, setView] = useState(products.find((x) => x._id == id));

  useEffect(() => {
    setView(products.find((x) => x._id == id));
  }, []);
  return (
    <section className="flex-container" key={view._id}>
      <div className="flex-item1">
        <div className="description">
          <p>--{view.specie}</p>
          <h1>{view.name}</h1>
          <p className="product-description">{view.description}</p>
          <label className="span-box">
            <span className="product-price">Rs{view.price}</span>
          </label>
          <label className="span-box">
            {view.instock ? (
              <span className="greenSpan">Instock ({view.instock})</span>
            ) : (
              <span className="redSpan">OutOfStock</span>
            )}
          </label>
          {view.instock ? (
            <Link
              to={Object.keys(user).length === 0 ? "/NotSignedIn" : "/my/cart"}
            >
              <button className="product-btn" onClick={() => addToCart(view)}>
                Add to Cart
                <BiShoppingBag />
              </button>
            </Link>
          ) : (
            <></>
          )}
          <Link
            to={
              Object.keys(user).length === 0 ? "/NotSignedIn" : "/my/favourites"
            }
          >
            <button className="product-btn" onClick={() => addToFav(view)}>
              Add to Favourites
              <BiHeart />
            </button>
          </Link>
        </div>
        <img src={view.image} alt="" className="viewImg" />
      </div>
      <div>
        <h2 className="facts-heading">Treatment and Facts</h2>
        <div className="flex-item2">
          <div className="facts-div1">
            <MdOutlineWaterDrop className="water-icon" />
            <div className="facts-div2">
              <h4>Water</h4>
              <p>{view.water}ML</p>
            </div>
          </div>
          <div className="facts-div1">
            <FaTemperatureHigh className="temp-icon" />
            <div className="facts-div2">
              <h4>Temprature</h4>
              <p>{view.temprature}C</p>
            </div>
          </div>
          <div className="facts-div1">
            <MdOutlineLightMode className="light-icon" />
            <div className="facts-div2">
              <h4>Light</h4>
              <p>{view.light}</p>
            </div>
          </div>
          <div className="facts-div1">
            <WiHumidity className="humidity-icon" />
            <div className="facts-div2">
              <h4>Humidity</h4>
              <p>{view.humidity}%</p>
            </div>
          </div>
          <div className="facts-div1">
            <RiLineHeight className="height-icon" />
            <div className="facts-div2">
              <h4>Height</h4>
              <p>{view.height}cm</p>
            </div>
          </div>
          <div className="facts-div1">
            <BiHeart className="heart-icon" />
            <div className="facts-div2">
              <h4>Benefits</h4>
              <label className="span-box">
                {view.benefits.airFreshner ? (
                  <span className="greenSpan">AirRefreshner</span>
                ) : (
                  <span className="redSpan">Not AirRefreshner</span>
                )}
              </label>
              <p>{view.benefits.otherBenefits}</p>
            </div>
          </div>
          <div className="facts-div1">
            <RiAlarmWarningLine className="alarm-icon" />
            <div className="facts-div2">
              <h4>Cautions</h4>
              <label className="span-box">
                {view.cautions.animalFriendly ? (
                  <span className="greenSpan">animalFriendly</span>
                ) : (
                  <span className="redSpan">Not AnimalFriendly</span>
                )}
              </label>
              <label className="span-box">
                {view.cautions.poisonous ? (
                  <span className="redSpan">Poisonous</span>
                ) : (
                  <span className="greenSpan">Not Poisonous</span>
                )}
              </label>
              <label className="span-box">
                {view.cautions.deathOnConsumption ? (
                  <span className="redSpan">Death On Consumption</span>
                ) : (
                  <span className="greenSpan">Friendly with Consumption</span>
                )}
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
