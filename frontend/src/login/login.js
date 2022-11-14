import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./form.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import NotFound from "../components/Pages/NotFound";

export function Login({ giveToken, giveUser }) {
  //cookie
  const [cookies, setCookie] = useCookies(["UserToken"]);

  //States
  const [data, setData] = useState({
    name: "",
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
      const url = "http://localhost:8080/user/login";
      const { data: res } = await axios.post(url, data);
      // console.log(res.message);
      setCookie("UserToken", res.Token, { path: "/" });
      giveToken(res.Token);

      localStorage.setItem("User", JSON.stringify(res.User));
      giveUser(res.User);

      navigate("/");
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
          <h3>Login</h3>
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

          <p>
            Doesn't have an account <Link to="/signUp">Register</Link>
          </p>
          <p>
            If you're a gardener than login{" "}
            <Link to="/gardener-login">here</Link>
          </p>
          <p>
            Login for Admin only <Link to="/admin/login">here</Link>
          </p>
          <br />
          {error && <div className="redSpan">{error}</div>}
        </form>
      )}
    </div>
  );
}
