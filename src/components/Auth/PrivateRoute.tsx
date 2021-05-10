import React, {
  useEffect,
  useState,
  isValidElement,
  cloneElement,
  useContext,
} from "react";
import Router from "next/router";
import { LOCAL_STORAGE, ROUTES } from "../../lib/constants";
import { UserContext } from "../../contexts/user/user.context";

interface IChildrenProps {
  token: string;
}
//
const PrivateRoute = ({ children }) => {
  const [token, setToken] = useState("");

  const { user, isLoggedIn } = useContext(UserContext);

  const childrenProps: IChildrenProps = { token };

  // * Redirect to home if not logged in
  useEffect(() => {
    const cachedToken = localStorage.getItem(LOCAL_STORAGE.USER_TOKEN);
    if ((!cachedToken || !isLoggedIn) && Router.pathname !== "/") {
      Router.push(ROUTES.PUBLIC_ROUTES.login);
    } else {
      setToken(cachedToken);
    }
  }, [user, isLoggedIn]);

  if (!token) return null;

  return React.Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, { ...childrenProps });
    }

    return child;
  });
};

export default React.memo(PrivateRoute);
