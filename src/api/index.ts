import axios from "axios";
import { IUser } from "../Types/user.types";

const DNS = "https://burst-staging.rocks/api";

export const setAxiosAuthorizationHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = token;
};

interface IAuth {
  email: string;
  password: string;
}
const register = async (body: IAuth) => {
  try {
    const res = await axios.post<{
      accessToken: string;
      success: boolean;
      user: IUser;
    }>(`${DNS}/register`, body);

    if (!res?.data.success) throw new Error("Error");

    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Sorry there was an error");
  }
};

const login = async (body: IAuth) => {
  try {
    const res = await axios.post<{
      accessToken: string;
      success: boolean;
      user: IUser;
    }>(`${DNS}/login`, body);

    if (!res?.data.success) throw new Error("Error");

    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Sorry there was an error");
  }
};

interface IRedeemTicket {
  code: string;
}
const redeemTicket = async (body: IRedeemTicket) => {
  try {
    const res = await axios.post<{ success: boolean; user: IUser }>(
      `${DNS}/ticket`,
      body,
    );

    if (!res?.data.success) throw new Error("Error");

    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Sorry there was an error");
  }
};

const getUser = async () => {
  try {
    const res = await axios.get<{ success: boolean; user: IUser }>(
      `${DNS}/user`,
    );

    if (!res?.data.success) throw new Error("Error");

    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Sorry there was an error");
  }
};

export default {
  register,
  login,
  redeemTicket,
  getUser,
};
