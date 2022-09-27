import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../login/form.css";
import axios from "axios";

export function GardenerLogin({ giveGardToken, giveGard, gardener }) {
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
      const url = "http://localhost:8080/gardener/login";
      const { data: res } = await axios.post(url, data);
      console.log(res.message);
      giveGardToken(res.data);
      giveGard(res.gardener);
      console.log(res.gardener);

      Object.keys(res.gardener.resume).length === 0
        ? navigate("/profile-completion")
        : navigate("/profile");
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
        <h3>Gardener--Login</h3>
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
          Doesn't have an account Register{" "}
          <Link to="/gardener-signUp">here</Link>
        </p>
        <br />
        {error && <div className="redSpan">{error}</div>}
      </form>
    </div>
  );
}
