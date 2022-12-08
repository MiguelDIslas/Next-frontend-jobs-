import axios from "axios";
import Layout from "../../../components/layout/Layout";
import UpdateJob from "../../../components/job/UpdateJob";
import { isAuthenticatedUser } from "../../../utils/isAuthenticated";

const NewJobPage = ({ job, access_token }) => {
  return (
    <Layout title="My Jobs">
      <UpdateJob job={job} access_token={access_token} />
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

  const res = await axios.get(`${process.env.API_URL}/jobs/${id}/`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const job = res.data.job;

  return {
    props: {
      job,
      access_token,
    },
  };
};

export default NewJobPage;
