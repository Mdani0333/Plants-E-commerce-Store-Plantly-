import React, { useState } from "react";
import "../../login/form.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function GardenerSignUp() {
  const [verified, setVerified] = useState(false);
  const [next, setNext] = useState(false);
  const [code, setCode] = useState(null);
  const [backendCode, setBackendCode] = useState(null);

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
      const url = "http://localhost:8080/gardener/signUp";
      const { data: res } = await axios.post(url, data);

      setLoading(false);
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

  function verificationCodeReqeust() {
    axios
      .post("http://localhost:8080/gardener/email-verification", {
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

  const phoneNumberRegex =
    /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{2})((-?)|( ?))([0-9]{7})$/gm;

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
            Already have an account <Link to="/gardener-login">Login</Link>
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
            <label for="phoneNumber" className="control-label">
              Contact Number
            </label>
            <input
              type="tel"
              class="form-control"
              id="phoneNumber"
              placeholder="03*********"
              value={data.phoneNo}
              onChange={handleChange}
              required
              name="phoneNo"
              maxLength="12"
              pattern="(0)(3)([0-9]{2})([0-9]{7})"
              title="03*********"
            />
          </div>
          <br />

          <div class="form-group">
            <label for="image">Profile Image Link (optional)</label>
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
