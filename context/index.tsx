import axios, { HeadersDefaults } from "axios";
import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useReducer } from "react";
import { UserActions, UserState } from "./types";
import { URL } from "../utils/url";

const initialState: UserState = {
  user: null,
};

interface CSRFHeader extends HeadersDefaults {
  "X-CSRF-Token": string;
}

const Context = createContext(initialState);

const rootReducer = (state: UserState, action: UserActions) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

const Provider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  const router = useRouter();

  useEffect(() => {
    dispatch({
      type: "LOGIN" as UserActions["type"],
      payload: JSON.parse(window.localStorage.getItem("user") as string),
    });
  }, []);

  //   if there is 401 response from server. execute below code
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((_, reject) => {
          axios
            .get(`${URL}/api/auth/logout`)
            .then(() => {
              dispatch({ type: "LOGOUT" } as UserActions);
              window.localStorage.removeItem("user");
              router.push("/login");
            })
            .catch(() => {
              reject(error);
            });
        });
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get(`${URL}/api/csrf-token`);
      axios.defaults.headers = {
        "X-CSRF-Token": data.csrfToken,
      } as CSRFHeader;
    };
    getCsrfToken();
  }, []);

  return (
    <Context.Provider value={{ state, dispatch } as any}>
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };
