import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopNav from "../components/TopNav";
import { Provider } from "../context/index";
import "../public/css/styles.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider>
      <ToastContainer position="top-center" />
      <TopNav />
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
