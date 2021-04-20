import React, {
  useEffect,
  useState,
  isValidElement,
  cloneElement,
} from "react";
import Router from "next/router";
import { LOCAL_STORAGE } from "../../lib/constants";

interface IChildrenProps {
  token: string;
}
//
const PrivateRoute = ({ children }) => {
  const [token, setToken] = useState("");

  const childrenProps: IChildrenProps = { token };

  // * Redirect to home if not logged in
  useEffect(() => {
    const cachedToken = localStorage.getItem(LOCAL_STORAGE.USER_TOKEN);
    if (!cachedToken && Router.pathname !== "/") {
      Router.push("/home");
    } else {
      setToken(cachedToken);
    }
  }, []);

  if (!token) return null;

  return React.Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, { ...childrenProps });
    }

    return child;
  });
};

export default React.memo(PrivateRoute);
