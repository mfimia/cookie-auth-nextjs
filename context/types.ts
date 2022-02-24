export enum UserActionTypes {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export interface UserData {
  createdAt: string;
  email: string;
  name: string;
  picture: string;
  role: string[];
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface UserState {
  user: UserData | null;
}

export interface UserActions {
  type: UserActionTypes;
  payload: UserData;
}
