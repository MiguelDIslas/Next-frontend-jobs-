import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { Row, Col, Form } from "react-bootstrap";
import {
  faBuilding,
  faDollarSign,
  faFileMedicalAlt,
  faMapMarkerAlt,
  faUsers,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
//Data
import {
  jobTypeOptions,
  educationOptions,
  industryOptions,
  experienceOptions,
} from "../../data/job.js";
import JobContext from "../../context/JobContext";
const NewJob = ({ access_token }) => {
  const initialState = {
    title: "",
    description: "",
    email: "",
    address: "",
    jobType: "Permanent",
    education: "Bachelors",
    industry: "Business",
    experience: "No Experience",
    salary: "",
    positions: "",
    company: "",
  };

  const { clearErrors, error, loading, newJob, created, setCreated } =
    useContext(JobContext);

  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }

    if (created) {
      setCreated(false);
      toast.success("Job posted successfully");
      setState(initialState);
    }
  }, [error, created]);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    newJob(state, access_token);
  };

  return (
    <div className="newJobcontainer">
      <div className="formWrapper">
        <div className="headerWrapper">
          <div className="headerLogoWrapper"></div>
          <h1>
            <FontAwesomeIcon icon={faPlusSquare} className="mr-2" /> POST A JOB
          </h1>
        </div>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col lg={6} md={6}>
              <div className="inputWrapper">
                <div className="inputBox">
                  <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                  <input
                    id="title"
                    name="title"
                    value={state.title}
                    type="text"
                    className="new-job-input description"
                    placeholder="Enter Job Title"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="inputBox">
                  <FontAwesomeIcon icon={faFileMedicalAlt} className="mr-2" />
                  <textarea
                    id="description"
                    name="description"
                    value={state.description}
                    style={{ resize: "none" }}
                    className="description"
                    type="text"
                    placeholder="Enter Job Description"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="inputBox">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                  <input
                    id="email"
                    name="email"
                    value={state.email}
                    type="email"
                    className="new-job-input"
                    placeholder="Enter Your Email"
                    title="Your email is invalid"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="inputBox">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                  <input
                    id="address"
                    name="address"
                    value={state.address}
                    type="text"
                    className="new-job-input"
                    placeholder="Enter Address"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="inputBox">
                  <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
                  <input
                    id="salary"
                    name="salary"
                    value={state.salary}
                    type="number"
                    className="new-job-input"
                    placeholder="Enter Salary Range"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="inputBox">
                  <FontAwesomeIcon icon={faUsers} className="mr-2" />
                  <input
                    id="positions"
                    name="positions"
                    value={state.positions}
                    type="number"
                    className="new-job-input"
                    placeholder="Enter No. of Positions"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="inputBox">
                  <FontAwesomeIcon icon={faBuilding} className="mr-2" />
                  <input
                    id="company"
                    name="company"
                    value={state.company}
                    type="text"
                    className="new-job-input"
                    placeholder="Enter Company Name"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </Col>
            <Col lg={6} md={6}>
              <div className="boxWrapper">
                <h4>Job Types:</h4>
                <div className="selectWrapper">
                  <select
                    id="jobType"
                    name="jobType"
                    value={state.jobType}
                    className="classic"
                    onChange={handleChange}
                  >
                    {jobTypeOptions.map((jobType) => (
                      <option key={jobType} value={jobType}>
                        {jobType}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="boxWrapper">
                <h4>Education:</h4>
                <div className="selectWrapper">
                  <select
                    id="education"
                    name="education"
                    value={state.education}
                    className="classic"
                    onChange={handleChange}
                  >
                    {educationOptions.map((education) => (
                      <option key={education} value={education}>
                        {education}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="boxWrapper">
                <h4>Industry:</h4>
                <div className="selectWrapper">
                  <select
                    id="industry"
                    name="industry"
                    value={state.industry}
                    className="classic"
                    onChange={handleChange}
                  >
                    {industryOptions.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="boxWrapper">
                <h4>Experience:</h4>
                <div className="selectWrapper">
                  <select
                    id="experience"
                    name="experience"
                    value={state.experience}
                    className="classic"
                    onChange={handleChange}
                  >
                    {experienceOptions.map((experience) => (
                      <option key={experience} value={experience}>
                        {experience}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Col>

            <Col className="text-center mt-3">
              <button className="createButton">
                {loading ? "Posting..." : "Post Job"}
              </button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default NewJob;
