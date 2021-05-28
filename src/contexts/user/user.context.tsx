import { createContext } from "react";
import { IUser } from "../../Types/user.types";

export interface ILogin {
  user?: IUser;
  accessToken: string;
}
interface IUserMethods {
  user: IUser;
  setUser: (params: IUser) => void;
  ticketCode: string | undefined;
  setTicketCode: (ticketCode: string) => void;
  login: (params: ILogin) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean | undefined;
}

const methods = {
  user: null,
  ticketCode: undefined,
  setUser: () => {},
  setTicketCode: () => {},
  login: async () => {},
  logout: () => {},
  isLoggedIn: undefined,
};
export const UserContext = createContext<IUserMethods>(methods);
