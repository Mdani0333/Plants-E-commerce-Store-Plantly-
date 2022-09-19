import "../Pages/cartView.css";
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { ProductsContext } from "../../context-hooks/ProductsContext";
import axios from "axios";
import NotFound from "../Pages/NotFound";

export function AllProducts({ admin, adminToken, getProducts }) {
  const products = useContext(ProductsContext);
  const navigate = useNavigate();

  function remove(_id) {
    console.log(_id);
    axios
      .delete(`http://localhost:8080/products/delete/${_id}`)
      .then(function (res) {
        console.log(res.data);
        getProducts();
      });
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      {adminToken ? (
        <div className="cart-container">
          <h2>All products</h2>
          <br />
          {products.map((item, index) => {
            return (
              <div className="cart-item" key={index}>
                <img src={item.image} alt="" />
                <span>
                  <p>-{item.specie}</p>
                  <h4>{item.name}</h4>
                </span>
                {item.instock ? (
                  <span className="greenSpan">Instock ({item.instock})</span>
                ) : (
                  <span className="redSpan">OutOfStock</span>
                )}
                <span className="product-price">${item.price}</span>
                <span>
                  <Link to={`/admin/update${item._id}`} className="link">
                    <FiEdit className="edit-btn" />
                  </Link>
                  <MdDeleteForever
                    className="remove-btn"
                    onClick={() => remove(item._id)}
                  />
                </span>
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
