import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdEmail } from "react-icons/md";
import { MdPhone } from "react-icons/md";
import "./profile.css";
import NotSignedIn from "../Pages/NotSignedIn";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { FaDownload } from "react-icons/fa";
import { useCookies } from "react-cookie";

export function Profile({
  gardToken,
  gardener,
  refreshGardener,
  giveGard,
  giveGardToken,
}) {
  useEffect(() => {
    refreshGardener();
  }, []);

  //cookie
  const [cookies, setCookie] = useCookies(["GardToken"]);

  const navigate = useNavigate();

  //states
  const [status, setStatus] = useState("");
  console.log(status);

  function Logout() {
    setCookie("GardToken", "", { path: "/" });
    giveGardToken("");
    localStorage.removeItem("Gardener");
    giveGard({});
    navigate("/");
  }

  return (
    <div>
      {gardToken ? (
        <div className="profile-container">
          <div className="profile-div">
            <div className="row-flex">
              {gardener.resume[0].image && (
                <img src={gardener.resume[0].image} className="p-img" />
              )}
              <div className="col-flex">
                <div className="status-row">
                  <h1>{gardener.name}</h1>
                  {gardener.resume[0].status && (
                    <span
                      className={
                        gardener.resume[0].status == "Un-Employed"
                          ? "redSpan"
                          : "greenSpan"
                      }
                    >
                      {gardener.resume[0].status}
                    </span>
                  )}
                </div>
                <p>
                  <MdEmail className="p-icons" />
                  {gardener.email}
                </p>
                {gardener.resume[0].contactNo && (
                  <p>
                    <MdPhone className="p-icons" />
                    {gardener.resume[0].contactNo}
                  </p>
                )}
              </div>
            </div>

            {Object.keys(gardener.resume).length === 0 ? (
              <div>
                You haven't completed your profile. Complete it{" "}
                <Link to="/profile-completion">here</Link>
              </div>
            ) : (
              <div>
                <h4 className="resume-h">Resume</h4>
                <div className="resume">
                  <span className="edit-delete-option">
                    <FaDownload className="download-icon" />
                    <Link
                      to={`/gardener/edit-resume/${gardener._id}`}
                      className="link"
                    >
                      <FiEdit className="edit-btn" />
                    </Link>
                    <MdDeleteForever className="remove-btn" />
                  </span>
                  <span className="points">{gardener.resume[0].name}</span>
                  <br />
                  <span className="points">{gardener.resume[0].address}</span>
                  <br />
                  <span className="points">
                    E: {gardener.email} T: {gardener.resume[0].contactNo}
                  </span>
                  <br />
                  <br />
                  <p className="points">Professional Summary :</p>
                  <p>{gardener.resume[0].summary}</p>
                  <br />
                  <p className="points">Work Experience :</p>
                  {Object.keys(gardener.resume[0].experience).length === 0 ? (
                    <div className="display-none"></div>
                  ) : (
                    <div>
                      {gardener.resume[0].experience.map((item, index) => {
                        return (
                          <div key={index}>
                            <h5>{index + 1}</h5>
                            <span>{item.title}</span>
                            <br />
                            <span>{item.company}</span>
                            <br />
                            <span>
                              <span>{item.fromDate.substring(0, 10)}</span> /{" "}
                              <span>{item.toDate.substring(0, 10)}</span>
                              <br />
                            </span>
                            <br />
                            <div>
                              {item.description
                                .split(".")
                                .map((points, index) => (
                                  <span key={index}>
                                    . {points}
                                    <br />
                                  </span>
                                ))}
                            </div>
                            <br />
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <p className="points">Education and Training</p>
                  <p>{gardener.resume[0].education}</p>

                  <br />
                  <p className="points">hobbies and Interests</p>
                  <p>{gardener.resume[0].hobbies}</p>
                </div>
              </div>
            )}

            <div className="change-status">
              <form>
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
                      <option value="hired">Hired</option>
                      <option value="Un-Employed">Un-Employed</option>
                      <option value="not-available">Not available now</option>
                    </select>
                  </div>
                  <div class="col-auto my-1">
                    <button type="submit" class="btn btn-primary">
                      change status
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div class="change-username-password">
              Or
              <Link to="/gardener/username-password">
                <button class="btn btn-primary">
                  change username or password
                </button>
              </Link>
            </div>

            <div class="logout">
              <button class="btn btn-danger" onClick={() => Logout()}>
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <NotSignedIn />
      )}
    </div>
  );
}
