import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NotSignedIn from "../Pages/NotSignedIn";
import { MdEmail } from "react-icons/md";
import { MdPhone } from "react-icons/md";

export function VisitProfile({ token, adminToken, gardToken, gardeners }) {
  const { id } = useParams();

  const [gardener, setGardener] = useState(gardeners.find((x) => x._id == id));

  return (
    <div>
      {token || adminToken || gardToken ? (
        <div>
          <div className="profile-container">
            <div className="profile-div">
              <div className="row-flex">
                <img src={gardener.profilePic} className="p-img" />
                <div className="col-flex">
                  <div className="status-row">
                    <h1>{gardener.name}</h1>
                    {Object.keys(gardener.resume).length === 0 ? (
                      <></>
                    ) : (
                      <span
                        className={
                          gardener.resume[0].status == "Un-Employed" ||
                          gardener.resume[0].status == "Not-available"
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
                  <p>
                    <MdPhone className="p-icons" />
                    {gardener.phoneNo}
                  </p>
                </div>
              </div>

              {Object.keys(gardener.resume).length === 0 ? (
                <div>Resume not found</div>
              ) : (
                <div>
                  <h4 className="resume-h">Resume</h4>
                  <div className="resume">
                    <span className="points">{gardener.name}</span>
                    <br />
                    <span className="points">{gardener.resume[0].address}</span>
                    <br />
                    <span className="points">
                      E: {gardener.email} T: {gardener.phoneNo}
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

                    <p className="points">Skills</p>
                    <p>{gardener.resume[0].skills}</p>

                    <br />
                    <p className="points">hobbies and Interests</p>
                    <p>{gardener.resume[0].hobbies}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <NotSignedIn />
      )}
    </div>
  );
}
