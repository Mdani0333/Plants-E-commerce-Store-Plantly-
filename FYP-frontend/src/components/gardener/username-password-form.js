import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../login/form.css";
import axios from "axios";
import NotFound from "../Pages/NotFound";

export function ChangePassword({ gardToken, gardener }) {
  //States
  const [data, setData] = useState({
    name: gardener.name,
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  //Handlechange
  function handleChange({ currentTarget: input }) {
    setData({ ...data, [input.name]: input.value });
  }

  //axois request
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/admin/login";
      const { data: res } = await axios.post(url, data);
      console.log(res.message);
      navigate("/admin");
      //   giveAdminToken(res.data);
      //   giveAdmin(res.admin);
    } catch (error) {
      if (
        (error.response && error.response.status >= 400) ||
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div>
      {gardToken ? (
        <form className="form-container">
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
            <label for="exampleInputPassword1">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              required
              name="password"
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
