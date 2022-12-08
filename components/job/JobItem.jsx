import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIndustry,
  faBriefcase,
  faMoneyCheckAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

import moment from "moment";

const JobItem = ({ job }) => {
  return (
    <Link href={`/job/${job.id}`}>
      <a className="job-listing">
        <div className="job-listing-details">
          <div className="job-listing-description">
            <h4 className="job-listing-company">{job.company}</h4>
            <h3 className="job-listing-title">{job.title}</h3>
            <p className="job-listing-text">
              {job.description.substring(0, 200)}...
            </p>
          </div>

          <span className="bookmark-icon"></span>
        </div>

        <div className="job-listing-footer">
          <ul>
            <li>
              <FontAwesomeIcon icon={faIndustry} />
              {""} {job.industry}
            </li>

            <li>
              <FontAwesomeIcon icon={faBriefcase} />
              {""} {job.jobType}
            </li>
            <li>
              <FontAwesomeIcon icon={faMoneyCheckAlt} />
              {""} ${job.salary}
            </li>
            <li>
              <FontAwesomeIcon icon={faClock} />
              {""} Published {moment.utc(job.createdAt).local().startOf('seconds').fromNow()}
            </li>
          </ul>
        </div>
      </a>
    </Link>
  );
};

export default JobItem;
