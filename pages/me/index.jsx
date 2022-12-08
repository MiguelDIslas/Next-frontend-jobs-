import Layout from "../../components/layout/Layout";
import UpdateProfile from "../../components/user/UpdateProfile";
import { isAuthenticatedUser } from "../../utils/isAuthenticated";

const MePage = () => {
  return (
    <Layout title="Jobbee - Me">
      <UpdateProfile />
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

export default MePage;
