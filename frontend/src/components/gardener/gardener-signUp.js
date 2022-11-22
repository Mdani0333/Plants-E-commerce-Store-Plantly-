import React, { useState } from "react";
import "../../login/form.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function GardenerSignUp() {
  //States
  const [data, setData] = useState({
    name: "",
    email: "",
    phoneNo: null,
    profilePic: "",
    password: "",
    resume: [],
  });
  const [error, setError] = useState();
  const [showPassword, setShowPassword] = useState(false);

  //Handlechange
  function handleChange({ currentTarget: input }) {
    setData({ ...data, [input.name]: input.value });
  }

  //axois request
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/gardener/signUp";
      const { data: res } = await axios.post(url, data);
      console.log(res.message);
      navigate("/gardener-login");
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
        <h3>Gardener--SignUp</h3>
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

        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
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

        <button type="submit" class="btn btn-primary">
          SignUp
        </button>
        <br />

        <p>
          Already have an account <Link to="/gardener-login">Login</Link>
        </p>
        {error && <div className="redSpan">{error}</div>}
      </form>
    </div>
  );
}
