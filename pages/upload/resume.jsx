import Layout from "../../components/layout/Layout";
import UploadResume from "../../components/user/UploadResume";
import { isAuthenticatedUser } from "../../utils/isAuthenticated";

const UploadResumePage = ({ access_token }) => {
  return (
    <Layout title="Jobbee - Upload Resume">
      <UploadResume access_token={access_token} />
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

  return {
    props: {
      access_token,
    },
  };
};

export default UploadResumePage;
