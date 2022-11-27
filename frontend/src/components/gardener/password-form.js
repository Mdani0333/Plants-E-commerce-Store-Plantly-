import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../login/form.css";
import axios from "axios";
import NotFound from "../Pages/NotFound";

export function ChangePassword({ gardToken, gardener, refreshGardener }) {
  //States
  const [data, setData] = useState({
    type: "PASSWORD",
    oldPassword: "",
    newPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  //Handlechange
  function handleChange({ currentTarget: input }) {
    setData({ ...data, [input.name]: input.value });
  }

  //axois request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    axios
      .patch("http://localhost:8080/gardener/changeUsernamePassword", data, {
        headers: {
          Authorization: `Bearer ${gardToken}`,
        },
      })
      .then(function (res) {
        setError(null);
        setSuccess(res.data.message);
        setLoading(false);
        refreshGardener();
      })
      .catch((e) => {
        setError(e.response.data.message);
        setLoading(false);
      });
  };

  return (
    <div>
      {gardToken ? (
        <form className="form-container" onSubmit={handleSubmit}>
          <h3>change Password</h3>
          <br />

          <div class="form-group required">
            <label for="exampleInputPassword2" className="control-label">
              Old Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              class="form-control"
              id="exampleInputPassword2"
              placeholder="Old Password"
              value={data.oldPassword}
              onChange={handleChange}
              required
              name="oldPassword"
            />
          </div>
          <br />

          <div class="form-group required">
            <label for="exampleInputPassword1" className="control-label">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              class="form-control"
              id="exampleInputPassword1"
              placeholder="New Password"
              value={data.newPassword}
              onChange={handleChange}
              required
              name="newPassword"
            />
          </div>
          <br />

          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              name="showPassword"
              id="yes"
              defaultChecked={showPassword}
              onChange={() => {
                setShowPassword(!showPassword);
              }}
            />
            <label class="form-check-label" for="yes">
              Show Password
            </label>
          </div>
          <br />

          {!loading && (
            <button type="submit" class="btn btn-primary">
              change
            </button>
          )}
          {loading && (
            <button class="btn btn-primary" type="button" disabled>
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </button>
          )}
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
