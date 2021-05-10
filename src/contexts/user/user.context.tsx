import { createContext } from "react";
import { IUser } from "../../Types/user.types";

export interface ILogin {
  user: IUser;
  accesstoken: string;
}
interface IUserMethods {
  user: IUser;
  setUser: (params: IUser) => void;
  login: (params: ILogin) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

const methods = {
  user: null,
  setUser: () => {},
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
};
export const UserContext = createContext<IUserMethods>(methods);
