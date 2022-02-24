import { NextPage } from "next";
import { FormEvent, Fragment, useState } from "react";
import axios, { AxiosError } from "axios";
import { toast, ToastContent } from "react-toastify";
import Error, { ErrorProps } from "next/error";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";

const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // console.table({ name, email, password });
    try {
      setLoading(true);
      //   http://localhost:8000 -> included in proxy (custom server)
      const { data } = await axios.post(`/api/auth/login`, {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", data);
      setLoading(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError;
        toast.error(error.response?.data.payload as ToastContent);
        setLoading(false);
      } else {
        throw new Error("Server Error" as "Server Error" & ErrorProps);
      }
    }
  };

  return (
    <Fragment>
      <h1 className="jumbotron text-center bg-primary square">Login</h1>
      <div className="container col-md-4 offset-md-4 pb-5">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-4 p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
          <input
            type="password"
            className="form-control mb-4 p-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
          <br />
          <button
            type="submit"
            disabled={!email || !password || loading}
            className="btn btn-block btn-primary p-2"
          >
            {loading ? <SyncOutlined spin /> : "Log in"}
          </button>
        </form>
        <p className="text-center p-3">
          Don't have an account?
          <Link href={"/register"}>
            <a> Create account</a>
          </Link>
        </p>
      </div>
    </Fragment>
  );
};

export default Login;
