import axios from "axios";

export const setAxiosAuthorizationHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = token;
};

const validateEmail = async (email: string) => {
  try {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/todos/${email}`,
    );

    return res;
  } catch (error) {
    console.error("validateEmail - error: ", error);
    return error;
  }
};

export default {
  validateEmail,
};
