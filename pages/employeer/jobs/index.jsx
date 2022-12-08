import axios from "axios";
import Layout from "../../../components/layout/Layout";
import MyJobs from "../../../components/job/MyJobs";
import { isAuthenticatedUser } from "../../../utils/isAuthenticated";

const NewJobPage = ({ jobs, access_token }) => {
  return (
    <Layout title="My Jobs">
      <MyJobs jobs={jobs} access_token={access_token} />
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

  const res = await axios.get(`${process.env.API_URL}/me/jobs/`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const jobs = res.data;

  return {
    props: {
      jobs,
      access_token,
    },
  };
};

export default NewJobPage;
