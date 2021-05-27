import { createContext } from "react";
import { IUser } from "../../Types/user.types";

export interface ILogin {
  user?: IUser;
  accessToken: string;
}
interface IUserMethods {
  user: IUser;
  setUser: (params: IUser) => void;
  ticketCode: string | null;
  setTicketCode: (ticketCode: string) => void;
  login: (params: ILogin) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
}

const methods = {
  user: null,
  ticketCode: null,
  setUser: () => {},
  setTicketCode: () => {},
  login: async () => {},
  logout: () => {},
  isLoggedIn: false,
};
export const UserContext = createContext<IUserMethods>(methods);
