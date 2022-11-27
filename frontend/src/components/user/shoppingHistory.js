import React, { useContext } from "react";
import { UserContext } from "../../context-hooks/UserContext";

export function ShoppingHistory() {
  const user = useContext(UserContext);

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

  return (
    <div className="orders-align-center">
      <div className="orders-flex-start">
        <h1>Recent Orders</h1>
        {Object.keys(user.shoppingHistory).length === 0 ? (
          <h4>There are no recent orders!</h4>
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
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
