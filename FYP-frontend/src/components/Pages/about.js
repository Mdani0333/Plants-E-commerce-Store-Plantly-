import React from "react";
import { ImLeaf } from "react-icons/im";

export function About() {
  return (
    <div>
      <div className="about-us-div">
        <div className="about-us">
          <h1 className="h-green">About Us</h1>
          <span className="about-logo">
            <ImLeaf color="#00ba69" fontSize="2rem" />
            <h1 className="logo_label">
              Plantly<span className="logo_dot">.</span>
            </h1>
          </span>
          <p className="italic">
            ‘Plants Online Store’ is a software of purchasing plants which is
            intended to benefit customers. This platform aims to help the locals
            in purchasing plants through online and to provide a more convenient
            and more reliable way for users to find, view and buy the desired
            plants that are suitable for their necessity, the customers can also
            get description and details from the product online. This system
            will surely increase sell of plants through easy way of feeling
            plants in the one’s own campus. This system is saving huge load of
            paper work and marketing work of a nursery or farm. So, the purpose
            of this application is to enable the customers to buy the plants,
            facility of gardeners and exhibition service
          </p>
        </div>
      </div>
    </div>
  );
}
