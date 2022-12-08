import axios from "axios";
import Layout from "../../components/layout/Layout";
import JobDetails from "../../components/job/JobDetails";
import NotFound from "../../components/layout/NotFound";

const JobDetailsPage = ({ job, candidates, access_token, error }) => {
  if (error === "Not found.") return <NotFound />;

  return (
    <Layout title={`Jobbee - ${job.title}`}>
      <JobDetails
        job={job}
        candidates={candidates}
        access_token={access_token}
      />
    </Layout>
  );
};

export const getServerSideProps = async ({ req, params }) => {
  const { id } = params;

  try {
    const res = await axios.get(`${process.env.API_URL}/jobs/${id}`);
    const job = res.data.job;
    const candidates = res.data.candidates;

    const access_token = req.cookies.access || "";

    return {
      props: {
        job,
        candidates,
        access_token,
      },
    };
  } catch (e) {
    return {
      props: {
        error: e.response.data.detail,
      },
    };
  }
};

export default JobDetailsPage;
