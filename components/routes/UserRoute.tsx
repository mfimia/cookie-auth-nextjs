import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/router";
import { Fragment, ReactNode, useEffect, useState } from "react";

const UserRoute = ({ children }: { children: ReactNode }) => {
  const [ok, setOk] = useState(false);

  const router = useRouter();

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/auth/current-user");
      if (data.ok) setOk(true);
    } catch (err) {
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Fragment>
      {!ok ? (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-primary p-5"
        />
      ) : (
        <Fragment>{children}</Fragment>
      )}
    </Fragment>
  );
};

export default UserRoute;