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
  const [token, setToken] = useState<string>("");
  const [initialized, setInitialized] = useState<boolean>(false);

  const { user, isLoggedIn } = useContext(UserContext);

  const childrenProps: IChildrenProps = { token };

  // * Redirect to home if not logged in
  useEffect(() => {
    // * wait for the context values to set on the 2nd render
    if (!initialized) {
      setInitialized(true);
      return;
    }

    const cachedToken = localStorage.getItem(LOCAL_STORAGE.USER_TOKEN);
    if (!isLoggedIn && Router.pathname !== "/") {
      Router.push({
        pathname: ROUTES.PUBLIC_ROUTES.login,
        query: { redirectTo: Router.pathname },
      });
    } else {
      setToken(cachedToken);
    }
  }, [user, isLoggedIn, initialized]);

  if (!token || !initialized) return null;

  return React.Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, { ...childrenProps });
    }

    return child;
  });
};

export default React.memo(PrivateRoute);
