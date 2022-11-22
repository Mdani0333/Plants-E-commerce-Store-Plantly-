import "../Pages/cartView.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import NotFound from "../Pages/NotFound";

export function AllUsers({ admin, adminToken, users, getAllusers }) {
  const navigate = useNavigate();

  useEffect(() => {
    getAllusers();
  }, []);

  function remove(_id) {
    axios
      .delete(`http://localhost:8080/user/delete/${_id}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      })
      .then(function (res) {
        getAllusers();
      });
  }

  return (
    <div>
      {adminToken ? (
        <div className="cart-container">
          <h2>All Users</h2>
          <br />
          {users.map((item, index) => {
            return (
              <div className="cart-item" key={index}>
                <div className="all-ug">
                  <h4>{item.name}</h4>
                  <p>{item.email}</p>
                </div>
                <button
                  className="btn btn-success"
                  onClick={() => navigate(`/manage-orders/${item._id}`)}
                >
                  Manage Orders
                </button>
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
