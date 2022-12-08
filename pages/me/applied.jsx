import axios from "axios";
import Layout from "../../components/layout/Layout";
import JobsApplied from "../../components/job/JobsApplied";
import { isAuthenticatedUser } from "../../utils/isAuthenticated";

const JobsAppliedPage = ({ jobs }) => {
  return (
    <Layout title="Jobs Applied">
      <JobsApplied jobs={jobs} />
    </Layout>
  );
};

export const getServerSideProps = async ({ req }) => {
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

  const res = await axios.get(`${process.env.API_URL}/me/jobs/applied/`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const jobs = res.data;

  return {
    props: {
      jobs,
    },
  };
};

export default JobsAppliedPage;
