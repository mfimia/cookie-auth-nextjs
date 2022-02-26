import { useRouter } from "next/router";
import { useContext } from "react";
import UserRoute from "../../components/routes/UserRoute";
import { Context } from "../../context";

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context) as any;

  const router = useRouter();

  if (!user && typeof window !== "undefined") router.push("/login");

  return (
    <UserRoute>
      <h1 className="jumbotron text-center square">
        <pre>{JSON.stringify(user, null, 4)}</pre>
      </h1>
    </UserRoute>
  );
};

export default UserIndex;
