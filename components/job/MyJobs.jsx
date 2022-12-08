import { useEffect, useContext } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import DataTable from "react-data-table-component";
import { Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faUsers,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
//Sweet Alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import JobContext from "../../context/JobContext";

const MyJobs = ({ jobs, access_token }) => {
  const MySwal = withReactContent(Swal);
  const { deleteJob, deleted, setDeleted, error, clearErrors } =
    useContext(JobContext);

  const router = useRouter();
  const columns = [
    { name: "Job ID", sortable: true, selector: (row) => row.id },
    { name: "Job Name", sortable: true, selector: (row) => row.title },
    { name: "Salary", sortable: true, selector: (row) => row.salary },
    { name: "Action", sortable: true, selector: (row) => row.action },
  ];

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
    if (deleted) {
      setDeleted(false);
      router.reload(router.asPath);
      toast.success("Job deleted successfully");
    }
  }, [error, deleted]);

  const handleDelete = async (id) => {
    const result = await MySwal.fire({
      title: "¿Are you sure?",
      text: `This job will be deleted permanently`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete!",
    });

    if (result.isConfirmed) {
      await deleteJob(id, access_token);
    }
  };

  const data = [];
  jobs &&
    jobs.forEach((job) =>
      data.push({
        id: job.id,
        title: job.title,
        salary: job.salary,
        action: (
          <div className="d-flex justify-content-between w-100">
            <Link href={`/job/${job.id}`}>
              <a className="btn btn-primary">
                <FontAwesomeIcon icon={faEye} />
              </a>
            </Link>

            <Link href={`/employeer/jobs/candidates/${job.id}`}>
              <a className="btn btn-success ml-1">
                <FontAwesomeIcon icon={faUsers} />
              </a>
            </Link>

            <Link href={`/employeer/jobs/${job.id}`}>
              <a className="btn btn-warning mx-1">
                <FontAwesomeIcon icon={faPencil} />
              </a>
            </Link>

            <Button variant="danger" onClick={() => handleDelete(job.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        ),
      })
    );

  return (
    <Row>
      <Col lg={2}></Col>
      <Col lg={8} className="mt-5">
        <h4 className="my-5">My Jobs</h4>
        <DataTable columns={columns} data={data} pagination responsive />
      </Col>
    </Row>
  );
};

export default MyJobs;
