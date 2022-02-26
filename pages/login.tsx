import { SyncOutlined } from "@ant-design/icons";
import axios, { AxiosError } from "axios";
import { NextPage } from "next";
import Error, { ErrorProps } from "next/error";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, Fragment, useContext, useEffect, useState } from "react";
import { toast, ToastContent } from "react-toastify";
import { Context } from "../context/index";
import { UserData } from "../context/types";
import { URL } from "../utils/url";

const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { state, dispatch }: any = useContext(Context);
  const { user } = state;

  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      //   http://localhost:8000 -> included in proxy (custom server)
      const { data }: { data: UserData } = await axios.post(
        `${URL}/api/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch({
        type: "LOGIN",
        payload: data,
      });

      window.localStorage.setItem("user", JSON.stringify(data));

      router.push("/");

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
          Don&apos;t have an account?{" "}
          <Link href={"/register"}>
            <a>Create account</a>
          </Link>
        </p>
      </div>
    </Fragment>
  );
};

export default Login;
