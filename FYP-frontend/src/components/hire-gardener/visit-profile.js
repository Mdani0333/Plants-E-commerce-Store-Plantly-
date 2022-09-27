import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NotSignedIn from "../Pages/NotSignedIn";
import { MdEmail } from "react-icons/md";
import { MdPhone } from "react-icons/md";

export function VisitProfile({ token, adminToken, gardToken }) {
  const { id } = useParams();

  const [gardener, setGardener] = useState([]);

  function getInfo() {
    axios.get(`http://localhost:8080/gardener/get/${id}`).then(function (res) {
      setGardener(res.data);
    });
  }
  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div>
      {token || adminToken || gardToken ? (
        <div>
          {Object.keys(gardener).length === 0 ? (
            <div>its empty</div>
          ) : (
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
                  <div>Resume not found</div>
                ) : (
                  <div>
                    <h4 className="resume-h">Resume</h4>
                    <div className="resume">
                      <span className="points">{gardener.resume[0].name}</span>
                      <br />
                      <span className="points">
                        {gardener.resume[0].address}
                      </span>
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
                      {Object.keys(gardener.resume[0].experience).length ===
                      0 ? (
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
                                  <span>{item.fromDate.substring(0, 10)}</span>{" "}
                                  / <span>{item.toDate.substring(0, 10)}</span>
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
              </div>
            </div>
          )}
        </div>
      ) : (
        <NotSignedIn />
      )}
    </div>
  );
}
