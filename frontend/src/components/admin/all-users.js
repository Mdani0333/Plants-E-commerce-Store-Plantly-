import "../Pages/cartView.css";
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { UserContext } from "../../context-hooks/UserContext";
import axios from "axios";
import NotFound from "../Pages/NotFound";

export function AllUsers({ admin, adminToken }) {
  const [users, setUsers] = useState([]);

  function getAllusers() {
    axios.get("http://localhost:8080/user/all-users").then(function (res) {
      setUsers(res.data);
    });
  }

  useEffect(() => {
    getAllusers();
  }, []);

  function remove(_id) {
    console.log(_id);
    axios
      .delete(`http://localhost:8080/user/delete/${_id}`)
      .then(function (res) {
        console.log(res.data);
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
