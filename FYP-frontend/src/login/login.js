import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./form.css";
import axios from "axios";

export function Login({ giveToken, giveUser }) {
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
      const url = "http://localhost:8080/auth";
      const { data: res } = await axios.post(url, data);
      console.log(res.message);
      navigate("/");
      giveToken(res.data);
      giveUser(res.user);
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
      <form className="form-container" onSubmit={handleSubmit}>
        <h3>Login</h3>
        <br />
        <div class="form-group">
          <label for="exampleInputUsername1">Name</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputUsername1"
            placeholder="Enter name"
            value={data.name}
            onChange={handleChange}
            required
            name="name"
          />
        </div>
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
        {error && <div className="redSpan">{error}</div>}
      </form>
    </div>
  );
}
