import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../login/form.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import NotFound from "../Pages/NotFound";

export function AdminLogin({ giveAdminToken, giveAdmin }) {
  //cookie
  const [cookies, setCookie] = useCookies(["AdminToken"]);

  //States
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState();

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
      setCookie("AdminToken", res.Token, { path: "/" });
      giveAdminToken(res.Token);

      localStorage.setItem("Admin", JSON.stringify(res.Admin));
      giveAdmin(res.Admin);

      navigate("/admin");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      {cookies.UserToken || cookies.GardToken || cookies.AdminToken ? (
        <NotFound />
      ) : (
        <form className="form-container" onSubmit={handleSubmit}>
          <h3>Admin -- Login</h3>
          <br />

          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={data.email}
              onChange={handleChange}
              required
              name="email"
            />
          </div>
          <br />

          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              required
              name="password"
            />
          </div>
          <br />

          <button type="submit" class="btn btn-primary">
            Login
          </button>
          <br />
          {error && <div className="redSpan">{error}</div>}
        </form>
      )}
    </div>
  );
}
