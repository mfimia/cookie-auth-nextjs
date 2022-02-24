import { createContext, ReactNode, useEffect, useReducer } from "react";
import { UserState, UserActions } from "./types";

const initialState = {
  user: null,
} as any;

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

  useEffect(() => {
    dispatch({
      type: "LOGIN" as UserActions["type"],
      payload: JSON.parse(window.localStorage.getItem("user") as string),
    });
  }, []);

  return (
    <Context.Provider value={{ state, dispatch } as any}>
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };
