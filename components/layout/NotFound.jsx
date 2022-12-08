import React from "react";
import Link from "next/link";
import Layout from "./Layout";
import Image from 'next/image'
const NotFound = () => (
  <Layout title="Jobbee - Not Found">
    <div className="page-not-found-wrapper my-auto">
      <a href="https://storyset.com/web">
        <Image
          src="/404_error_amico.svg"
          height="550"
          width="550"
          alt="404_not_found"
        />
        <p>Web illustrations by Storyset</p>
      </a>

      <h5>
        Page Not Found. Go to <Link href="/">Homepage</Link>{" "}
      </h5>
    </div>
  </Layout>
);

export default NotFound;
