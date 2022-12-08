import axios from "axios";
import { useEffect } from "react";
import Home from "../components/Home";
import Layout from "../components/layout/Layout";

// import styles from '../styles/Home.module.css'
{
  /* <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1> */
}
export default function Index({ data }) {
  return (
    <Layout>
      <Home data={data} />
    </Layout>
  );
}

export const getServerSideProps = async ({ query }) => {
  const keyword = query.keyword || "";
  const location = query.location || "";
  const page = query.page || "1";
  const jobType = query.jobType || "";
  const education = query.education || "";
  const experience = query.experience || "";

  let min_salary = "";
  let max_salary = "";

  if (query.salary) {
    const [min, max] = query.salary.split("-");
    min_salary = min;
    max_salary = max;
  }

  const queryStr = `keyword=${keyword}&location=${location}&page=${page}&jobType=${jobType}&education=${education}&experience=${experience}&min_salary=${min_salary}&max_salary=${max_salary}`;

  const res = await axios.get(`${process.env.API_URL}/jobs?${queryStr}`);
  const data = res.data;

  return {
    props: {
      data,
    },
  };
};
