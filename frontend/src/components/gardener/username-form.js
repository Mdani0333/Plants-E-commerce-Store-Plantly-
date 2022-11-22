import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../login/form.css";
import axios from "axios";
import NotFound from "../Pages/NotFound";

export function ChangeUsername({ gardToken, gardener, refreshGardener }) {
  //States
  const [data, setData] = useState({
    type: "USERNAME",
    name: gardener.name,
    phoneNo: gardener.phoneNo,
    profilePic: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //Handlechange
  function handleChange({ currentTarget: input }) {
    setData({ ...data, [input.name]: input.value });
  }

  //axois request
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .patch("http://localhost:8080/gardener/changeUsernamePassword", data, {
        headers: {
          Authorization: `Bearer ${gardToken}`,
        },
      })
      .then(function (res) {
        setError(null);
        setSuccess(res.data.message);
        refreshGardener();
      })
      .catch((e) => setError(e.response.data.message));
  };

  return (
    <div>
      {gardToken ? (
        <form className="form-container" onSubmit={handleSubmit}>
          <h3>Change Username</h3>
          <br />
          <div class="form-group">
            <label for="exampleInputUsername1">Username</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputUsername1"
              placeholder="Enter Username"
              value={data.name}
              onChange={handleChange}
              required
              name="name"
            />
          </div>
          <br />

          <div class="form-group">
            <label for="image">Image Link (optional)</label>
            <input
              type="url"
              class="form-control"
              id="Image"
              placeholder="paste image link here..."
              value={data.profilePic}
              onChange={handleChange}
              name="profilePic"
            />
          </div>
          <br />

          <div class="form-group">
            <label for="phoneNumber">Contact Number</label>
            <input
              type="number"
              class="form-control"
              id="phoneNumber"
              placeholder="03**-*******"
              value={data.phoneNo}
              onChange={handleChange}
              required
              name="phoneNo"
              maxLength={11}
            />
          </div>
          <br />

          <button type="submit" class="btn btn-primary">
            Change
          </button>
          <br />
          {error && <div className="redSpan">{error}</div>}
          {success && <div className="greenSpan">{success}</div>}
        </form>
      ) : (
        <NotFound />
      )}
    </div>
  );
}
