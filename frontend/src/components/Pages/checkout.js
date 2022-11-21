import React, { useContext, useState } from "react";
import { UserContext } from "../../context-hooks/UserContext";
import "./checkout.css";
import { BsFillCheckCircleFill } from "react-icons/bs";
import NotSignedIn from "./NotSignedIn";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Checkout({ cartTotal, token, getProducts, giveUser }) {
  const user = useContext(UserContext);

  const [proceed, setProceed] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    status: "Delivering...",
    products: user.cart,
    total: cartTotal,
    address: "",
    zipCode: null,
    phoneNo: null,
    note: "",
    paymentType: "onDelivery",
  });

  //Handlechange
  function handleChange({ currentTarget: input }) {
    setData({ ...data, [input.name]: input.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setProceed(true);
  };

  const navigate = useNavigate();
  async function handleConfirmation() {
    setLoading(true);
    axios
      .patch("http://localhost:8080/user/order-placement", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        giveUser(res.data.user);
        // giveSuccess(res.data.message);
        getProducts();
        setLoading(false);
        navigate("/account");
      });
  }

  return (
    <div>
      {token && Object.keys(user.cart).length != 0 ? (
        <div>
          {proceed ? (
            <div className="payment-method">
              <div>
                <h3>Select Payment Method</h3>
                <div
                  className="payment-type"
                  style={{ border: "1px solid #00ba69" }}
                  onClick={() =>
                    setData({ ...data, paymentType: "onDelivery" })
                  }
                >
                  {data.paymentType === "onDelivery" && (
                    <BsFillCheckCircleFill className="selected" />
                  )}
                  <h4>On Delivery</h4>
                </div>
                <div className="space-between">
                  <button
                    class="btn btn-secondary"
                    onClick={() => setProceed(false)}
                  >
                    Back
                  </button>
                  {loading && (
                    <button class="btn btn-success" type="button" disabled>
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    </button>
                  )}
                  {!loading && (
                    <button
                      class="btn btn-success"
                      onClick={() => handleConfirmation()}
                    >
                      Confirm
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="checkout-container">
                {user.cart.map((value, index) => {
                  return (
                    <div key={index} className="flex-row">
                      <p>{value.specie}</p>
                      <h4>{value.name}</h4>
                      <span>
                        {value.price} * {value.quantity}
                      </span>
                      <span>Sub-Total: {value.price * value.quantity}</span>
                    </div>
                  );
                })}
                <div className="flex-end">
                  <h3 style={{ marginRight: "10px" }}>Total:</h3>
                  <h3 className="greenSpan">${cartTotal}</h3>
                </div>
              </div>

              <form className="form-container" onSubmit={handleSubmit}>
                <h3>Enter Delivery Information</h3>
                <br />
                <div class="form-group">
                  <label for="address">Address</label>
                  <input
                    type="address"
                    class="form-control"
                    id="address"
                    placeholder="Enter address"
                    value={data.address}
                    onChange={handleChange}
                    required
                    name="address"
                  />
                </div>
                <br />

                <div class="form-group">
                  <label for="zipCode">Zip Code</label>
                  <input
                    type="number"
                    class="form-control"
                    id="zipcode"
                    placeholder="Enter 4 digit zip code"
                    value={data.zipCode}
                    onChange={handleChange}
                    required
                    name="zipCode"
                    maxLength={4}
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
                  <label for="note">Any Notes</label>
                  <textarea
                    class="form-control"
                    id="note"
                    placeholder="Write your note here..."
                    value={data.note}
                    onChange={handleChange}
                    name="note"
                  />
                </div>
                <br />

                <button type="submit" class="btn btn-success">
                  Proceed
                </button>
                <br />
              </form>
            </div>
          )}
        </div>
      ) : (
        <NotSignedIn />
      )}
    </div>
  );
}
