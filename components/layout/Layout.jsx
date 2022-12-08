import Head from "next/head";
import Script from "next/script";
import Header from "./Header";
import Footer from "./Footer";
import Loader from "./Loader";

import { ToastContainer } from "react-toastify";

const Layout = ({ children, title = "Jobbee - Find you Job Now" }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ToastContainer position="bottom-right" />
      <Script
        strategy="beforeInteractive"
        src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
      ></Script>
      <Script
        strategy="beforeInteractive"
        src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
      ></Script>
      <Script
        strategy="beforeInteractive"
        src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js"
      ></Script>
      <Header />
      <div style={{ minHeight: "100vh", paddingTop: "60px" }}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
