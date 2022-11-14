import React from "react";
import "../footer.css";
import { ImLeaf } from "react-icons/im";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";

export function Contact() {
  return (
    <div>
      <div className="about-us-div">
        <div className="about-us">
          <h1 className="h-green">Contact Us</h1>
          <span className="about-logo">
            <ImLeaf color="#00ba69" fontSize="2rem" />
            <h1 className="logo_label">
              Plantly<span className="logo_dot">.</span>
            </h1>
          </span>

          <div>
            <p>
              <i class="fas fa-home mr-3">
                <MdLocationPin className="h-green" />
              </i>{" "}
              Green town, Lahore.
            </p>
            <p>
              <i class="fas fa-envelope mr-3">
                <AiOutlineMail className="h-green" />
              </i>{" "}
              info@gmail.com
            </p>
            <p>
              <i class="fas fa-phone mr-3">
                <BsTelephone className="h-green" />
              </i>{" "}
              + 01 234 567 88
            </p>
            <p>
              <i class="fas fa-print mr-3">
                <BsTelephone className="h-green" />
              </i>{" "}
              + 01 234 567 89
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
