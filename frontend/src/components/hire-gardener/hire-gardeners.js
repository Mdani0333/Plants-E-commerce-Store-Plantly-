import "./hire.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import NotSignedIn from "../Pages/NotSignedIn";
import { FaRegUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdPhone } from "react-icons/md";
import { Link } from "react-router-dom";

export function HireGard({ token, adminToken, gardToken, gardeners }) {
  return (
    <div>
      {token || adminToken || gardToken ? (
        <div className="product-box">
          {gardeners.map((value, index) => {
            return (
              <div key={index} className="profile-card">
                <div className="profile-info">
                  <img src={value.profilePic} className="hire-img" />
                  <div className="col-flex">
                    <div className="status-name-row">
                      <h1>{value.name}</h1>
                    </div>
                    <p>
                      <MdEmail className="p-icons" />
                      {value.email}
                    </p>
                    <p>
                      <MdPhone className="p-icons" />
                      {value.phoneNo}
                    </p>
                    {Object.keys(value.resume).length === 0 ? (
                      <></>
                    ) : (
                      <span
                        className={
                          value.resume[0].status == "Un-Employed"
                            ? "redSpan"
                            : "greenSpan"
                        }
                      >
                        {value.resume[0].status}
                      </span>
                    )}
                  </div>
                </div>
                <div className="visit-profile-btn">
                  <Link to={`/hire-gardener/${value._id}`}>
                    <button className="product-btn">visit profile</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <NotSignedIn />
      )}
    </div>
  );
}
