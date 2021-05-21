import axios from "axios";

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
    const res = await axios.post<{ accessToken: string }>(
      `${DNS}/register`,
      body,
    );

    return res;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Sorry there was an error");
  }
};

const login = async (body: IAuth) => {
  try {
    const res = await axios.post<{ accessToken: string }>(`${DNS}/login`, body);
    return res;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Sorry there was an error");
  }
};

interface IRedeemTicket {
  code: string;
}
const redeemTicket = async (body: IRedeemTicket) => {
  try {
    const res = await axios.post<{ accessToken: string }>(
      `${DNS}/ticket`,
      body,
    );
    return res;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Sorry there was an error");
  }
};

export default {
  register,
  login,
  redeemTicket,
};
