import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../login/form.css";
import axios from "axios";
import NotFound from "../Pages/NotFound";
import { UserContext } from "../../context-hooks/UserContext";

export function ChangePasswordUser({ token, refreshUser }) {
  const user = useContext(UserContext);

  //States
  const [data, setData] = useState({
    name: user.name,
    oldPassword: "",
    newPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState();
  const [success, setSuccess] = useState("");

  //Handlechange
  function handleChange({ currentTarget: input }) {
    setData({ ...data, [input.name]: input.value });
  }

  //axois request
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .patch("http://localhost:8080/user/changePassword", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (res) {
        setError(null);
        setSuccess(res.data.message);
        refreshUser();
      })
      .catch((e) => setError(e.response.data.message));
  };

  return (
    <div>
      {token ? (
        <form className="form-container" onSubmit={handleSubmit}>
          <h3>Change Username or password</h3>
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
            <label for="exampleInputPassword2">Old Password</label>
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

          <div class="form-group">
            <label for="exampleInputPassword1">New Password</label>
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
