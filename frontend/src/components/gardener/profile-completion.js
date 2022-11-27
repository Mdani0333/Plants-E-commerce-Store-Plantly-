import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../login/form.css";
import axios from "axios";
import DatePicker from "react-date-picker";
import NotFound from "../Pages/NotFound";

export function ProfileCompletion({ gardener, gardToken }) {
  const [next, setNext] = useState(false);
  //States
  const [fromDate, onFromDate] = useState(new Date());
  const [toDate, onToDate] = useState(new Date());

  const [experience, setExperience] = useState({
    title: "",
    company: "",
    fromDate: fromDate,
    toDate: toDate,
    description: "",
  });

  const [data, setData] = useState({
    status: gardener.resume[0].status || "",
    address: gardener.resume[0].address || "",
    summary: gardener.resume[0].summary || "",
    experience: gardener.resume[0].experience || [],
    education: gardener.resume[0].education || "",
    skills: gardener.resume[0].skills || "",
    hobbies: gardener.resume[0].hobbies || "",
  });

  //error
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(false);

  //Handlechange
  function handleChange({ currentTarget: input }) {
    setData({ ...data, [input.name]: input.value });
  }
  //handleExp
  function handleExp({ currentTarget: input }) {
    setExperience({ ...experience, [input.name]: input.value });
  }
  //add experience\
  function add(e) {
    e.preventDefault();
    setData({ ...data, experience: [...data.experience, experience] });
  }

  //axois request
  const navigate = useNavigate();
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const url = "http://localhost:8080/gardener/update";
      const { data: res } = await axios.patch(url, data, {
        headers: {
          Authorization: `Bearer ${gardToken}`,
        },
      });
      setSuccess(res.message);
      setLoading(false);
      navigate("/profile");
    } catch (error) {
      if (
        (error.response && error.response.status >= 400) ||
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setLoading(false);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  function Remove(index) {
    let array = [];
    for (let i = 0; i < data.experience.length; i++) {
      if (i != index) {
        array.push(data.experience[i]);
      }
    }
    return array;
  }

  return (
    <div>
      {gardToken ? (
        <div>
          {!next && (
            <form className="form-container" onSubmit={() => setNext(true)}>
              <h3>Fill the form below to complete/Update your profile</h3>
              <br />

              {/* <div class="s-input">
                <label class="mr-sm-2" for="inlineFormCustomSelect">
                  Status
                </label>
                <select
                  class="custom-select mr-sm-2"
                  id="inlineFormCustomSelect"
                  onChange={handleChange}
                >
                  <option value="Availabel For Work">Available</option>
                  <option value="Not Available For Work now">
                    Not Available
                  </option>
                </select>
              </div> */}

              <div class="form-group required">
                <label for="address" className="control-label">
                  Address
                </label>
                <input
                  type="address"
                  class="form-control"
                  id="address"
                  placeholder="Enter current address"
                  value={data.address}
                  onChange={handleChange}
                  required
                  name="address"
                />
              </div>
              <br />

              <div class="form-group required">
                <label for="summary" className="control-label">
                  Summary
                </label>
                <textarea
                  class="form-control"
                  id="summary"
                  placeholder="Write summary..."
                  value={data.summary}
                  onChange={handleChange}
                  required
                  name="summary"
                  rows={4}
                />
              </div>
              <br />
              <br />
              <br />

              <div class="form-group required">
                <label for="education" className="control-label">
                  Education
                </label>
                <textarea
                  class="form-control"
                  id="education"
                  placeholder="Write all your education..."
                  value={data.education}
                  onChange={handleChange}
                  required
                  name="education"
                  rows={4}
                />
              </div>
              <br />
              <br />
              <br />

              <div class="form-group required">
                <label for="skills" className="control-label">
                  Skills
                </label>
                <textarea
                  class="form-control"
                  id="skills"
                  placeholder="Write all your skills..."
                  value={data.skills}
                  onChange={handleChange}
                  required
                  name="skills"
                  rows={4}
                />
              </div>
              <br />
              <br />
              <br />

              <div class="form-group required">
                <label for="hobbies" className="control-label">
                  Hobbies
                </label>
                <textarea
                  class="form-control"
                  id="hobbies"
                  placeholder="hobbies..."
                  value={data.hobbies}
                  onChange={handleChange}
                  required
                  name="hobbies"
                  rows={4}
                />
              </div>
              <br />
              <br />
              <br />

              <button type="submit" class="btn btn-primary">
                Next
              </button>
              <br />
              {error && <div className="redSpan">{error}</div>}
            </form>
          )}

          {next && (
            <div className="form-container">
              <div>
                {Object.keys(data.experience).length === 0 ? (
                  <div className="display-none"></div>
                ) : (
                  <div>
                    {data.experience.map((item, index) => {
                      return (
                        <div key={index} className="exp-container">
                          <h3>Experience {index + 1}</h3>
                          <div className="exp-field">
                            <h5>Job Title: </h5>
                            <span className="exp-item">{item.title}</span>
                          </div>
                          <div className="exp-field">
                            <h5>Place: </h5>
                            <span className="exp-item">{item.company}</span>
                          </div>
                          <div className="exp-field">
                            <h5>Work duration: </h5>
                            <span className="exp-item">
                              {formatDate(item.fromDate)} -{" "}
                              {formatDate(item.toDate)}
                            </span>
                          </div>
                          <div className="exp-field">
                            <h5>Description: </h5>
                            <span className="exp-item">
                              "{item.description}"
                            </span>
                          </div>
                          <br />
                          <button
                            className="btn btn-warning"
                            onClick={() =>
                              setData({
                                ...data,
                                experience: Remove(index),
                              })
                            }
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <br />

              <div className="exp-container">
                <form onSubmit={add}>
                  <label>Add Experience</label>
                  <br />
                  <label for="title" className="control-label">
                    Job Title
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="Enter job title"
                    value={experience.title}
                    onChange={handleExp}
                    required
                    name="title"
                  />
                  <br />
                  <label for="company" className="control-label">
                    Place Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="company"
                    placeholder="Enter place name"
                    value={experience.company}
                    onChange={handleExp}
                    required
                    name="company"
                  />
                  <br />
                  <label for="from" className="control-label">
                    From date
                  </label>
                  <br />
                  <DatePicker
                    id="from"
                    onChange={onFromDate}
                    value={fromDate}
                  />
                  <br />
                  <label for="to" className="control-label">
                    To date
                  </label>
                  <br />
                  <DatePicker id="to" onChange={onToDate} value={toDate} />
                  <br />
                  <br />
                  <label for="des" className="control-label">
                    Description
                  </label>
                  <textarea
                    class="form-control"
                    id="des"
                    placeholder="Write description..."
                    value={experience.description}
                    onChange={handleExp}
                    name="description"
                    maxLength={"200"}
                    required
                    rows={4}
                  />
                  <br />
                  <button class="btn btn-secondary" type="submit">
                    add
                  </button>
                </form>
              </div>

              <br />

              {!loading && (
                <button class="btn btn-success" onClick={() => handleSubmit()}>
                  Submit profile
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
              {success && <span className="greenSpan">{success}</span>}
              <br />
              <br />
            </div>
          )}
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
}
