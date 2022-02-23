import type { AppProps } from "next/app";
import TopNav from "../components/TopNav";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../public/css/styles.css";
import { Fragment } from "react";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Fragment>
      <TopNav />
      <Component {...pageProps} />
    </Fragment>
  );
};

export default MyApp;
