import axios from "axios";
import { IUser } from "../Types/user.types";

import { API_DNS } from "../lib/constants";

export const setAxiosAuthorizationHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
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
    }>(`${API_DNS}/register`, body);

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
    }>(`${API_DNS}/login`, body);

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
      `${API_DNS}/ticket`,
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
      `${API_DNS}/user`,
    );

    if (!res?.data.success) throw new Error("Error");

    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Sorry there was an error");
  }
};

interface IGetEvent {
  eventId: string;
}
const getEvent = async (params: IGetEvent) => {
  try {
    const res = await axios.get<{
      success: boolean;
      url?: string;
      error?: string;
      live: boolean;
    }>(`${API_DNS}/playlist/${params.eventId}`);

    if (!res?.data.success && res?.data.error)
      throw new Error(res?.data.error || "Error");

    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Sorry there was an error");
  }
};

interface IForgotPasword {
  email: string;
}
const forgotPasword = async (body: IForgotPasword) => {
  try {
    const res = await axios.post<{ success: boolean }>(
      `${API_DNS}/forgot-password`,
      body,
    );

    if (!res?.data.success) throw new Error("Error");

    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Sorry there was an error");
  }
};

interface IResetPasword {
  email: string;
  password: string;
  resetToken: string;
}
const resetPassword = async (body: IResetPasword) => {
  try {
    const res = await axios.post<{ success: boolean }>(
      `${API_DNS}/reset-password`,
      body,
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
  getEvent,
  forgotPasword,
  resetPassword,
};
