import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../login/form.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import NotFound from "../Pages/NotFound";

export function GardenerLogin({ giveGardToken, giveGard, gardener }) {
  //cookie
  const [cookies, setCookie] = useCookies(["GardToken"]);

  //States
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  //Handlechange
  function handleChange({ currentTarget: input }) {
    setData({ ...data, [input.name]: input.value });
  }

  //axois request
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const url = "http://localhost:8080/gardener/login";
      const { data: res } = await axios.post(url, data);

      setCookie("GardToken", res.Token, { path: "/" });
      giveGardToken(res.Token);

      localStorage.setItem("Gardener", JSON.stringify(res.Gardener));
      giveGard(res.Gardener);

      setLoading(false);
      navigate("/profile");
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div>
      {cookies.UserToken || cookies.GardToken || cookies.AdminToken ? (
        <NotFound />
      ) : (
        <form className="form-container" onSubmit={handleSubmit}>
          <h3>Gardener--Login</h3>
          <br />

          <div class="form-group required">
            <label for="exampleInputEmail1" className="control-label">
              Email address
            </label>
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

          <div class="form-group required">
            <label for="exampleInputPassword1" className="control-label">
              Password
            </label>
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

          {!loading && (
            <button type="submit" class="btn btn-success">
              Login
            </button>
          )}
          {loading && (
            <button class="btn btn-success" type="button" disabled>
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </button>
          )}
          <br />

          <p>
            Doesn't have an account Register{" "}
            <Link to="/gardener-signUp">here</Link>
          </p>
          <br />
          {error && <div className="redSpan">{error}</div>}
        </form>
      )}
    </div>
  );
}
