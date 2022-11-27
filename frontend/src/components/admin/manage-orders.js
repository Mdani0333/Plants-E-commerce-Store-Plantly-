import axios from "axios";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

export function ManageOrders({ users, adminToken }) {
  const { id } = useParams();

  const [user, setUser] = useState(users.find((f) => f._id == id));

  const [status, setStatus] = useState("Delivering...");
  console.log(status);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      hour12: true,
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  async function ChangeStatus(userId, orderId) {
    axios
      .patch(
        "http://localhost:8080/user/manage-orders",
        { orderId: orderId, userId: userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setUser(res.data.user);
      });
  }

  return (
    <div className="orders-align-center">
      <div className="orders-flex-start">
        <h1>Manage Orders</h1>
        {Object.keys(user.shoppingHistory).length === 0 ? (
          <h4>There no recent Orders!</h4>
        ) : (
          <>
            {" "}
            {user.shoppingHistory.map((item, index) => {
              return (
                <div key={index} className="order-item">
                  <div className="flex-full-space-between">
                    <h3>Order# {item.orderNo}</h3>{" "}
                    <span
                      className={
                        item.status === "Cancelled" ? "redSpan" : "greenSpan"
                      }
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="products-list">
                    {item.products.map((value, index) => {
                      return (
                        <div
                          key={index}
                          className="flex-row"
                          style={{ marginTop: "10px" }}
                        >
                          <p style={{ justifyContent: "center" }}>
                            {value.specie}
                          </p>
                          <h4>{value.name}</h4>
                          <span>
                            {value.price} * {value.quantity}
                          </span>
                          <span>
                            Sub-Total: Rs{value.price * value.quantity}
                          </span>
                        </div>
                      );
                    })}
                    <div className="flex-end">
                      <h5 style={{ marginRight: "10px" }}>Sum:</h5>
                      <span className="greenSpan">Rs{item.total}</span>
                    </div>
                    <div className="flex-end">
                      <h5 style={{ marginRight: "10px" }}>Shipping Cost:</h5>
                      <span className="greenSpan">Rs{item.shippingCost}</span>
                    </div>
                    <div className="flex-end">
                      <h3 style={{ marginRight: "10px" }}>Total:</h3>
                      <h3 className="greenSpan">
                        Rs{item.total + item.shippingCost}
                      </h3>
                    </div>
                  </div>

                  <h3>Shipping Details:</h3>
                  <p>
                    <strong>Address:</strong> {item.address}
                  </p>
                  <p>
                    <strong>Zip-Code:</strong> {item.zipCode}
                  </p>
                  <p>
                    <strong>Contact Number:</strong> {item.phoneNo}
                  </p>
                  <p>
                    <strong>Note:</strong> {item.note}
                  </p>

                  <h3>Payment Method:</h3>
                  <span className="greenSpan">{item.paymentType}</span>
                  <br />
                  <i>Order was placed on "{formatDate(item.date)}"</i>

                  {item.status === "Delivering..." ? (
                    <div className="change-status">
                      <div class="form-row">
                        <div class="s-input">
                          <label class="mr-sm-2" for="inlineFormCustomSelect">
                            Status
                          </label>
                          <select
                            class="custom-select mr-sm-2"
                            id="inlineFormCustomSelect"
                            onChange={(e) => setStatus(e.target.value)}
                          >
                            <option>Choose status</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </div>
                        <div class="col-auto my-1">
                          <button
                            class="btn btn-primary"
                            onClick={() => ChangeStatus(user._id, item._id)}
                          >
                            change status
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
