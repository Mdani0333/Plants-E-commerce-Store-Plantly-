import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../login/form.css";
import axios from "axios";
import DatePicker from "react-date-picker";
import NotFound from "../Pages/NotFound";

export function ProfileCompletion({ gardener, gardToken }) {
  const [next, setNext] = useState(false);
  //States
  const [exp, setExp] = useState([]);
  console.log(exp);

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
    status: "Un-Employed",
    image: "",
    name: "",
    address: "",
    contactNo: 0,
    summary: "",
    experience: [],
    education: "",
    skills: "",
    hobbies: "",
  });
  console.log(data);

  //error
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

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
    setExp([...exp, experience]);
  }

  //axois request
  const navigate = useNavigate();
  const handleSubmit = async () => {
    setData({ ...data, experience: exp });
    try {
      const url = `http://localhost:8080/gardener/update/${gardener._id}`;
      const { data: res } = await axios.patch(url, data);
      setSuccess(res.message);
      navigate("/profile");
    } catch (error) {
      if (
        (error.response && error.response.status >= 400) ||
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div>
      {gardToken && Object.keys(gardener.resume).length === 0 ? (
        <div>
          {!next && (
            <form className="form-container" onSubmit={() => setNext(true)}>
              <h3>Fill the form below to complete your profile</h3>
              <br />
              <div class="form-group">
                <label for="image">Image Link (optional)</label>
                <input
                  type="url"
                  class="form-control"
                  id="Image"
                  placeholder="paste image link here..."
                  value={data.image}
                  onChange={handleChange}
                  name="image"
                />
              </div>
              <br />

              <div class="form-group">
                <label for="name">FullName</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Enter name"
                  value={data.name}
                  onChange={handleChange}
                  required
                  name="name"
                />
              </div>
              <br />

              <div class="form-group">
                <label for="address">Address</label>
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

              <div class="form-group">
                <label for="contact">Contact NO</label>
                <input
                  type="number"
                  class="form-control"
                  id="contact"
                  placeholder="contact no"
                  value={data.contactNo}
                  onChange={handleChange}
                  required
                  name="contactNo"
                  maxLength="11"
                />
              </div>
              <br />

              <div class="form-group">
                <label for="summary">Summary</label>
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

              <div class="form-group">
                <label for="education">Education</label>
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

              <div class="form-group">
                <label for="skills">Skills</label>
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

              <div class="form-group">
                <label for="hobbies">Hobbies</label>
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
                {exp.length === 0 ? (
                  <div className="display-none"></div>
                ) : (
                  <div>
                    {exp.map((item, index) => {
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
                              {item.fromDate.getUTCMonth()}/
                              {item.fromDate.getUTCFullYear()} -{" "}
                              {item.toDate.getUTCMonth()}/
                              {item.toDate.getUTCFullYear()}
                            </span>
                          </div>
                          <div className="exp-field">
                            <h5>Description: </h5>
                            <span className="exp-item">
                              "{item.description}"
                            </span>
                          </div>
                          <br />
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
                  <label for="title">Job Title</label>
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
                  <label for="company">Place Name</label>
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
                  <label for="from">From date</label>
                  <br />
                  <DatePicker
                    id="from"
                    onChange={onFromDate}
                    value={fromDate}
                  />
                  <br />
                  <label for="to">To date</label>
                  <br />
                  <DatePicker id="to" onChange={onToDate} value={toDate} />
                  <br />
                  <br />
                  <label for="des">Description</label>
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

              <button class="btn btn-success" onClick={() => handleSubmit()}>
                Submit profile
              </button>
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
