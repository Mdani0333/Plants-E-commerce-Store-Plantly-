import React, { useState } from "react";
import "./form.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function SignUp() {
  const [verified, setVerified] = useState(false);
  const [next, setNext] = useState(false);
  const [code, setCode] = useState(null);
  const [backendCode, setBackendCode] = useState(null);
  const [loading, setLoading] = useState(false);

  //States
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    paymentDetails: [],
    cart: [],
    favourites: [],
    shoppingHistory: [],
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
    setError("");
    setLoading(true);
    try {
      const url = "http://localhost:8080/user/signUp";
      await axios.post(url, data);

      setLoading(false);
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  function verificationCodeReqeust() {
    axios
      .post("http://localhost:8080/user/email-verification", {
        name: data.name,
        email: data.email,
      })
      .then((res) => {
        console.log(res);
        setBackendCode(res.data.verificationCode);
        setNext(true);
        setError("");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }

  const handleVerification = async (e) => {
    e.preventDefault();
    setError("");
    verificationCodeReqeust();
  };

  function VerifyCode() {
    setError("");
    if (code == backendCode) {
      setError("");
      setVerified(true);
    } else if (code != backendCode) {
      setError("Invalid code!");
    }
  }

  return (
    <div>
      {!next && (
        <form className="form-container" onSubmit={handleVerification}>
          <h3>SignUp</h3>
          <br />
          <div class="form-group required">
            <label for="exampleInputUsername1" className="control-label">
              Username
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputUsername1"
              placeholder="Enter a username"
              value={data.name}
              onChange={handleChange}
              required
              name="name"
            />
          </div>
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

          <button class="btn btn-primary" type="submit">
            next
          </button>
          <br />
          <p>
            Already have an account <Link to="/login">Login</Link>
          </p>
          <br />

          {error && <span className="redSpan">{error}</span>}
        </form>
      )}

      {next && !verified ? (
        <div className="form-container">
          <p>
            <i>Check your gmail we have sent a verification code!</i>
          </p>
          <div class="form-group required">
            <label for="vericationCode" className="control-label">
              Enter 4 digit code
            </label>
            <input
              type="text"
              class="form-control"
              id="verificationCode"
              placeholder="Enter 4 digit code"
              value={code}
              onChange={(e) => setCode(e.target.value.toLocaleUpperCase())}
              required
              name="code"
              maxLength="4"
            />
          </div>
          <br />

          <button class="btn btn-primary" onClick={() => VerifyCode()}>
            Verify
          </button>
          <br />

          <button
            class="btn btn-secondary"
            onClick={() => verificationCodeReqeust()}
          >
            Resend Email
          </button>
          <br />

          {error && <span className="redSpan">{error}</span>}
        </div>
      ) : (
        <></>
      )}

      {verified && (
        <form className="form-container" onSubmit={handleSubmit}>
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
              Register
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

          {error && <span className="redSpan">{error}</span>}
        </form>
      )}
    </div>
  );
}
