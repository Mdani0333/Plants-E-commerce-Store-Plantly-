import "../Pages/cartView.css";
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { UserContext } from "../../context-hooks/UserContext";
import axios from "axios";
import NotFound from "../Pages/NotFound";

export function AllGardeners({ admin, adminToken }) {
  const [gardeners, setGardeners] = useState([]);

  function getAllgardeners() {
    axios
      .get("http://localhost:8080/gardener/all-gardeners")
      .then(function (res) {
        setGardeners(res.data);
      });
  }

  useEffect(() => {
    getAllgardeners();
  }, []);

  function remove(_id) {
    axios
      .delete(`http://localhost:8080/gardener/delete/${_id}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      })
      .then(function (res) {
        getAllgardeners();
      });
  }

  return (
    <div>
      {adminToken ? (
        <div className="cart-container">
          <h2>All Gardeners</h2>
          <br />
          {gardeners.map((item, index) => {
            return (
              <div className="cart-item" key={index}>
                <div className="all-ug">
                  <h4>{item.name}</h4>
                  <p>{item.email}</p>
                </div>
                <MdDeleteForever
                  className="remove-btn"
                  onClick={() => remove(item._id)}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
}
