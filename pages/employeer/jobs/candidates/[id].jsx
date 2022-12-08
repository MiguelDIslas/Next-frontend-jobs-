import axios from "axios";
import Layout from "../../../../components/layout/Layout";
import JobCandidates from "../../../../components/job/JobCandidates";
import NotFound from "../../../../components/layout/NotFound";
import { isAuthenticatedUser } from "../../../../utils/isAuthenticated";
const JobCandidatesPage = ({ candidatesApplied, error }) => {
  if (error === "Not found.") return <NotFound />;

  return (
    <Layout title={`Job Candidates`}>
      <JobCandidates candidatesApplied={candidatesApplied} />
    </Layout>
  );
};

export const getServerSideProps = async ({ req, params }) => {
  const { id } = params;

  const access_token = req.cookies.access;

  const user = await isAuthenticatedUser(access_token);

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const res = await axios.get(`${process.env.API_URL}/jobs/${id}/candidates`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const candidatesApplied = res.data;

    return {
      props: {
        candidatesApplied,
      },
    };
  } catch (err) {
    return {
      props: {
        error: err.response.data.detail,
      },
    };
  }
};

export default JobCandidatesPage;
