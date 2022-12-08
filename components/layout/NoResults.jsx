import React from "react";
import Link from "next/link";
import Image from "next/image";

const NoResults = () => (
  <div className="d-flex justify-content-center align-items-center">
    <a href="https://storyset.com/web">
      <Image src="/images/no-data.svg" height="550" width="550" alt="no_data" />
    </a>

    <div className="d-flex justify-content-center align-items-center flex-wrap text-center">
      <h5>
        No Results Found. Go to <Link href="/">Homepage</Link>
      </h5>
      <p className="w-100">Web illustrations by Storyset</p>
    </div>
  </div>
);

export default NoResults;
