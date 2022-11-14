import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import { ImLeaf } from "react-icons/im";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";

export default function Footer() {
  return (
    <div class="container my-5" className="footer">
      <footer class="text-center text-lg-start text-white">
        <div class="container p-4 pb-0">
          <section class="">
            <div class="row">
              <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 class="text-uppercase mb-4 font-weight-bold">
                  <span className="about-logo">
                    <ImLeaf color="#00ba69" fontSize="2rem" />
                    <h2 className="white-text">
                      Plantly<span className="logo_dot">.</span>
                    </h2>
                  </span>
                </h6>
                <p className="white-text">
                  ‘Plants Online Store’ is a software of purchasing plants which
                  is intended to benefit customers.
                </p>
              </div>

              <hr class="w-100 clearfix d-md-none" />

              <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6
                  class="text-uppercase mb-4 font-weight-bold"
                  className="white-text"
                >
                  Products
                </h6>
                <p>
                  <Link to="/shop" class="text-white">
                    Shop
                  </Link>
                </p>
                <p>
                  <Link to="/flowers" class="text-white">
                    Flowers
                  </Link>
                </p>
                <p>
                  <Link to="/hire-gardeners" class="text-white">
                    Hire a gardener
                  </Link>
                </p>
              </div>

              <hr class="w-100 clearfix d-md-none" />

              <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6
                  class="text-uppercase mb-4 font-weight-bold"
                  className="white-text"
                >
                  Useful links
                </h6>
                <p>
                  <Link to="/login" class="text-white">
                    Your Account
                  </Link>
                </p>
                <p>
                  <Link to="/signUp" class="text-white">
                    Become a part
                  </Link>
                </p>
                <p>
                  <Link to="/aboutUs" class="text-white">
                    Help
                  </Link>
                </p>
              </div>

              <hr class="w-100 clearfix d-md-none" />

              <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6
                  class="text-uppercase mb-4 font-weight-bold"
                  className="white-text"
                >
                  Contact
                </h6>
                <p className="white-text">
                  <i class="fas fa-home mr-3">
                    <MdLocationPin className="h-green" />
                  </i>{" "}
                  Green town, Lahore.
                </p>
                <p className="white-text">
                  <i class="fas fa-envelope mr-3">
                    <AiOutlineMail className="h-green" />
                  </i>{" "}
                  info@gmail.com
                </p>
                <p className="white-text">
                  <i class="fas fa-phone mr-3">
                    <BsTelephone className="h-green" />
                  </i>{" "}
                  + 01 234 567 88
                </p>
                <p className="white-text">
                  <i class="fas fa-print mr-3">
                    <BsTelephone className="h-green" />
                  </i>{" "}
                  + 01 234 567 89
                </p>
              </div>
            </div>
          </section>

          <hr class="my-3" className="white-text" />

          <section class="p-3 pt-0">
            <div class="row d-flex align-items-center">
              <div class="col-md-7 col-lg-8 text-center text-md-start">
                <div class="p-3" className="white-text">
                  Adnan Manzoor© All rights reserved.
                </div>
              </div>
              <div class="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
                <a
                  class="btn btn-outline-light btn-floating m-1"
                  className="text-white"
                  role="button"
                >
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a
                  class="btn btn-outline-light btn-floating m-1"
                  className="text-white"
                  role="button"
                >
                  <i class="fab fa-twitter"></i>
                </a>
                <a
                  class="btn btn-outline-light btn-floating m-1"
                  className="text-white"
                  role="button"
                >
                  <i class="fab fa-google"></i>
                </a>
                <a
                  class="btn btn-outline-light btn-floating m-1"
                  className="text-white"
                  role="button"
                >
                  <i class="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
