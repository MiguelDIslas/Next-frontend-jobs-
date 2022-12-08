import React, { useContext, useEffect } from "react";
import moment from "moment";
import JobContext from "../../context/JobContext.js";
import { toast } from "react-toastify";
//Bootstrap
import { Row, Col, Table, Button } from "react-bootstrap";
//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faBuilding,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const JobDetails = ({ job, candidates, access_token }) => {
  const { applyToJob, applied, clearErrors, error, loading, checkJobApplied } =
    useContext(JobContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }

    checkJobApplied(job.id, access_token);
  }, [error]);

  const applyToJobHandler = async () => await applyToJob(job.id, access_token);

  const d1 = moment(job.lastDate);
  const d2 = moment(Date.now());
  const isLastDatePassed = d1.diff(d2, "days") < 0 ? true : false;

  return (
    <div className="job-details-wrapper">
      <div className="container container-fluid">
        <Row>
          <Col xl={9} lg={8}>
            <div className="job-details p-3">
              <div className="job-header p-4">
                <h2>{job.title}</h2>
                <span>
                  <FontAwesomeIcon icon={faBuilding} />
                  <span> {job.company}</span>
                </span>
                <span className="ml-4">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  <span> {job.address}</span>
                </span>

                <div className="mt-3">
                  <span>
                    {loading ? (
                      "Loading..."
                    ) : applied ? (
                      <Button
                        variant="success"
                        disabled
                        className="px-4 py-2 apply-btn cursor-default"
                      >
                        <FontAwesomeIcon icon={faCheck} />
                        {loading ? "Apply Now" : "Applied"}
                      </Button>
                    ) : isLastDatePassed ? (
                      <Button
                        variant="danger"
                        className="px-4 py-2 apply-btn"
                        disabled={true}
                      >
                        This job is expired
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        className="px-4 py-2 apply-btn"
                        onClick={applyToJobHandler}
                        disabled={isLastDatePassed}
                      >
                        {loading ? "Loading..." : "Apply Now"}
                      </Button>
                    )}

                    <span className="ml-4 text-success">
                      <b>{candidates}</b> candidates has applied to this job.
                    </span>
                  </span>
                </div>
              </div>

              <div className="job-description mt-5">
                <h4>Description</h4>
                <p>{job.description}</p>
              </div>

              <div className="job-summary">
                <h4 className="mt-5 mb-4">Job Summary</h4>
                <Table striped>
                  <tbody>
                    <tr>
                      <td>Job Type</td>
                      <td>:</td>
                      <td>{job.jobType}</td>
                    </tr>

                    <tr>
                      <td>Job Industry</td>
                      <td>:</td>
                      <td>{job.industry}</td>
                    </tr>

                    <tr>
                      <td>Expected Salary</td>
                      <td>:</td>
                      <td>${job.salary}</td>
                    </tr>

                    <tr>
                      <td>Education</td>
                      <td>:</td>
                      <td>{job.education}</td>
                    </tr>

                    <tr>
                      <td>Experience</td>
                      <td>:</td>
                      <td>{job.experience}</td>
                    </tr>

                    <tr>
                      <td>Company</td>
                      <td>:</td>
                      <td>{job.company}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </Col>

          <Col xl={3} lg={4}>
            <div className="job-contact-details p-3">
              <h4 className="my-4">More Details</h4>
              <hr />
              <h5>Email Address:</h5>
              <p>{job.email}</p>

              <h5>Job Posted:</h5>
              <p>
                {moment.utc(job.createdAt).local().startOf("seconds").fromNow()}
              </p>

              <h5>Last Date:</h5>
              <p>{job.lastDate.substring(0, 10)}</p>
            </div>

            {isLastDatePassed && (
              <div className="mt-5 p-0">
                <div className="alert alert-danger">
                  <h5>Note:</h5>
                  You can no longer apply to this job. This job is expired. Last
                  date to apply for this job was:{" "}
                  <b>{job.lastDate.substring(0, 10)}</b>
                  <br /> Checkout others job on Jobbee.
                </div>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default JobDetails;
