import DataTable from "react-data-table-component";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const JobCandidates = ({ candidatesApplied }) => {
  const columns = [
    { name: "Job Name", sortable: true, selector: (row) => row.title },
    { name: "User ID", sortable: true, selector: (row) => row.id },
    { name: "Candidate Resume", sortable: true, selector: (row) => row.resume },
    { name: "Applied At", sortable: true, selector: (row) => row.appliedAt },
  ];

  const data = [];
  candidatesApplied &&
    candidatesApplied.forEach((item) =>
      data.push({
        title: item.job.title,
        id: item.user,
        appliedAt: item.appliedAt.substring(0, 10),
        resume: (
          <a
            target="_blank"
            className="text-success"
            href={`https://jobsportal.s3.us-west-1.amazonaws.com/${item.resume}`}
          >
            <FontAwesomeIcon icon={faDownload} /> View Resume
          </a>
        ),
      })
    );

  return (
    <Row>
      <Col lg={2}></Col>
      <Col lg={8} className="mt-5">
        <h4 className="my-5">
          {candidatesApplied &&
            `${candidatesApplied.length} Candidates applied to this job`}
        </h4>
        <DataTable columns={columns} data={data} pagination responsive />
      </Col>
    </Row>
  );
};

export default JobCandidates;
