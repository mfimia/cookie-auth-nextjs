import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopNav from "../components/TopNav";
import "../public/css/styles.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Fragment>
      <ToastContainer position="top-center" />
      <TopNav />
      <Component {...pageProps} />
    </Fragment>
  );
};

export default MyApp;
