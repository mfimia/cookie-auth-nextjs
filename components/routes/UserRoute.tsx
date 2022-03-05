import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/router";
import { Fragment, ReactNode, useEffect, useState } from "react";
import { URL } from "../../utils/url";

const UserRoute = ({ children }: { children: ReactNode }) => {
  const [ok, setOk] = useState(false);

  const router = useRouter();

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`${URL}/api/auth/current-user`, {
        withCredentials: true,
      });
      if (data.ok) setOk(true);
    } catch (err) {
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
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
